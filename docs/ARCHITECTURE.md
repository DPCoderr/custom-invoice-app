# Architecture and flows

## Purpose

This document separates the repository's current implementation from the intended learning MVP.
Anything labelled **target** still requires one or more tickets from [TASKS.md](TASKS.md).

The guiding constraints are:

- keep one deployable API and one browser application;
- organize backend behavior as vertical slices;
- use PostgreSQL as the source of truth for invoice metadata;
- store generated PDFs in a private object bucket;
- keep historical invoice values as snapshots;
- avoid abstractions that do not yet solve a concrete problem.

## Current architecture

```mermaid
flowchart LR
    Browser[React/Vite browser app]
    API[MyApp.Api<br/>.NET 10 Minimal API]
    DB[(PostgreSQL appdb)]
    PG[pgAdmin]
    Storage[(Supabase Storage<br/>not currently wired)]

    AppHost[Aspire AppHost] --> API
    AppHost --> DB
    AppHost --> PG
    API --> DB
    Browser -. hardcoded localhost:5050 .-> API
    API -. commented prototype .-> Storage
```

Aspire currently owns PostgreSQL, pgAdmin, and the API. The frontend resource in `AppHost.cs` is
commented out, so contributors must start Vite separately. Authentication endpoints and the
Identity store exist. The invoice endpoint, QuestPDF renderer, and Supabase upload path are not
functional.

## Target learning-MVP architecture

```mermaid
flowchart LR
    Browser[React/Vite SPA]
    Proxy[Same-origin /api proxy]
    API[.NET 10 Minimal API]
    DB[(PostgreSQL)]
    Storage[(Private Supabase<br/>invoices bucket)]
    Scalar[OpenAPI + Scalar]
    Telemetry[Aspire dashboard<br/>logs, traces, health]

    AppHost[Aspire AppHost] --> Browser
    AppHost --> API
    AppHost --> DB
    Browser --> Proxy --> API
    API --> DB
    API --> Storage
    API --> Scalar
    API --> Telemetry
```

For local development, Aspire becomes the single entrypoint and the browser uses relative
`/api` requests. The API remains responsible for authentication, authorization, calculations,
PDF generation, and storage access. Supabase credentials never enter the browser bundle.

## Target data model

```mermaid
erDiagram
    APP_USER ||--o| BUSINESS_PROFILE : owns
    APP_USER ||--o{ SERVICE : owns
    APP_USER ||--o{ INVOICE : creates
    INVOICE ||--|{ INVOICE_ITEM : contains
    SERVICE o|--o{ INVOICE_ITEM : source_for

    APP_USER {
        string id PK
        string email
        string user_name
        string first_name
        string last_name
    }

    BUSINESS_PROFILE {
        uuid id PK
        string user_id FK, UK
        string business_name
        string email
        string address_line_1
        string address_line_2
        string postal_code
        string city
        string country_code
        datetime updated_at
    }

    SERVICE {
        uuid id PK
        string user_id FK
        string name
        string description
        decimal default_unit_price
        datetime created_at
        datetime updated_at
    }

    INVOICE {
        uuid id PK
        string user_id FK
        string invoice_number UK
        string seller_name
        string seller_email
        string seller_address
        string customer_name
        string customer_email
        string customer_address
        date issue_date
        date due_date
        string currency
        string notes
        decimal total_amount
        string pdf_storage_key
        datetime pdf_generated_at
        long pdf_size_bytes
        datetime created_at
    }

    INVOICE_ITEM {
        uuid id PK
        uuid invoice_id FK
        uuid service_id FK
        string description
        decimal unit_price
        decimal quantity
        decimal line_total
    }
```

`AppUser.Id` remains the existing ASP.NET Core Identity string key. Changing Identity to `Guid`
would create migration and authentication churn without improving the learning MVP.

### Snapshot rules

- `BusinessProfile` stores the user's current seller information.
- Seller fields are copied to `Invoice` when an invoice is created.
- Customer details live directly on `Invoice`; there is no `Customer` entity in the MVP.
- Selecting a reusable `Service` prefills an invoice line, but `InvoiceItem` stores its own
  description and price.
- Changing a profile or service never changes an existing invoice or PDF.
- `ServiceId` is optional so a user can enter a one-off invoice line.

### Data rules

- Money uses C# `decimal` and PostgreSQL `numeric(18,2)`.
- Quantity uses `decimal` and PostgreSQL `numeric(18,3)`.
- `LineTotal` and `TotalAmount` are calculated by the backend and rounded to two decimals.
- Invoice dates use `DateOnly`; timestamps are UTC.
- Currency is stored as a three-letter uppercase code and is restricted to `EUR` in the MVP.
- The visible number is a string such as `INV-2026-A1B2C3D4`, derived from the invoice ID. It is
  readable and practically unique, but deliberately not claimed to be legally sequential.
- `(UserId, InvoiceNumber)` is unique. `BusinessProfile.UserId` is unique.

## Application boundaries

| Boundary | Responsibility |
| --- | --- |
| React route | URL state, authentication gate, query preloading, and page composition |
| Frontend feature | Zod schema, form behavior, hand-written contract, API adapter, query/mutation, and feature UI |
| Minimal API endpoint | HTTP route, authorization metadata, OpenAPI metadata, binding, and typed response |
| Handler | Ownership checks, use-case orchestration, calculation, persistence, and failure mapping |
| Validator | Request-shape and cross-field validation that does not require database access |
| EF Core | Relational persistence, constraints, relationships, and queries scoped to the current user |
| PDF renderer | Pure conversion from an immutable invoice document model to PDF bytes |
| PDF storage | Upload, delete compensation, and signed-URL generation behind a narrow interface |

The MVP does not add MediatR, a repository layer, a unit-of-work abstraction, domain events, or a
generic service layer. EF Core already provides the required persistence boundary.

## Authentication flow

```mermaid
sequenceDiagram
    actor User
    participant UI as React app
    participant API as Auth endpoint
    participant Identity as ASP.NET Core Identity
    participant DB as PostgreSQL

    User->>UI: Submit register or login form
    UI->>API: POST /api/auth/register or /login
    API->>Identity: Create user or verify credentials
    Identity->>DB: Read/write Identity data
    Identity-->>API: Authentication result
    API-->>UI: 200 + HttpOnly session cookie
    UI->>API: GET /api/auth/me with credentials
    API-->>UI: Current user or 401
```

The browser sends cookies with API requests. A `401` means no authenticated session; transport
failures and server failures must not be converted into “logged out.” Google sign-in is optional
for local MVP work and must use configuration rather than a hardcoded frontend redirect.

## Service management flow

```mermaid
sequenceDiagram
    actor User
    participant UI as Service feature
    participant API as Service endpoint
    participant DB as PostgreSQL

    User->>UI: Enter reusable service
    UI->>API: POST /api/services
    API->>API: Authenticate and validate
    API->>DB: Insert with current UserId
    DB-->>API: Created service
    API-->>UI: 201 ServiceResponse
    UI->>UI: Invalidate services query
    UI->>API: GET /api/services
    API->>DB: Filter by current UserId
    API-->>UI: 200 owned services only
```

Service names need not be globally unique. Every read or write is scoped to the authenticated
user.

## Invoice creation and upload flow

```mermaid
sequenceDiagram
    actor User
    participant UI as Invoice form
    participant API as Create invoice handler
    participant DB as PostgreSQL
    participant PDF as QuestPDF renderer
    participant Storage as Supabase Storage

    User->>UI: Select services and edit snapshot values
    UI->>API: POST /api/invoices
    API->>API: Validate request and authenticated user
    API->>DB: Load business profile and referenced owned services
    API->>API: Calculate line totals and total
    API->>DB: Begin transaction and persist invoice/items
    API->>PDF: Render immutable document model
    PDF-->>API: PDF bytes
    API->>Storage: Upload {userId}/{invoiceId}.pdf
    Storage-->>API: Upload success
    API->>DB: Save PDF metadata and commit
    API-->>UI: 201 InvoiceResponse
```

Failure behavior is explicit:

- validation or ownership failure creates no invoice and uploads no file;
- rendering or upload failure rolls back the database transaction;
- if upload succeeds but the final database commit fails, the handler attempts a best-effort
  storage delete and logs any compensation failure;
- the response never includes the private storage key;
- retries must not silently overwrite an invoice belonging to another request.

Synchronous rendering and upload are accepted for the learning MVP. Background jobs are a later
optimization only after the synchronous flow is measured.

## PDF download flow

```mermaid
sequenceDiagram
    actor User
    participant Browser
    participant API as PDF endpoint
    participant DB as PostgreSQL
    participant Storage as Supabase Storage

    User->>Browser: Download invoice PDF
    Browser->>API: GET /api/invoices/{id}/pdf
    API->>DB: Find invoice by id and current UserId
    DB-->>API: PDF metadata or not found
    API->>Storage: Create short-lived signed URL
    Storage-->>API: Signed URL
    API-->>Browser: 302 redirect
    Browser->>Storage: GET signed URL
    Storage-->>Browser: application/pdf
```

Returning `404` for a missing or foreign invoice avoids revealing whether another user's invoice
exists. Signed URLs are short-lived and are generated only after the API ownership check.

## Current-to-target differences

| Current implementation | Target MVP |
| --- | --- |
| Feature endpoints map outside the `/api` group | All application endpoints map below `/api` |
| Hardcoded frontend API origin | Relative `/api` through Aspire/Vite proxy |
| `InvoiceNumber` is a `Guid` | Separate `Guid` ID and readable string number |
| No business profile or seller snapshot | One profile per user and immutable seller snapshots |
| Unbounded text and unconstrained `numeric` columns | Explicit lengths, indexes, and decimal precision |
| Invoice DTO, frontend schema, and UI field names differ | One documented JSON contract with explicit frontend mapper |
| PDF and Supabase logic are commented prototypes | Injected, testable renderer and storage boundaries |
| Raw/private `PdfPath` is part of a draft response | Storage key is internal; download uses an authorized endpoint |
| Mock invoice list and status values | API-backed metadata without a status workflow |
| English and Dutch strings are mixed in components | English resources first; Dutch follows after the MVP |

## References

- [Requirements and contracts](REQUIREMENTS.md)
- [Backend conventions](conventions/BACKEND.md)
- [Frontend conventions](conventions/FRONTEND.md)
- [Aspire JavaScript integration](https://aspire.dev/integrations/frameworks/javascript/)
- [Supabase private bucket access](https://supabase.com/docs/guides/storage/buckets/fundamentals)
