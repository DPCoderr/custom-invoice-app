# Learning MVP requirements

## Product goal

An authenticated user can maintain a small reusable service catalogue, configure seller details,
create an invoice from editable service snapshots, generate an English PDF, and later download
that PDF securely.

The goal is to learn a clear full-stack implementation. It is not to build a legally compliant
accounting product in the first version.

## Actor

The MVP has one actor: an authenticated individual user. There are no organizations, team
members, accountants, administrators, or shared invoices in scope.

## Functional requirements

### Authentication

- `FR-AUTH-01`: A visitor can register with first name, last name, email, and password.
- `FR-AUTH-02`: A registered user can log in and log out using an HttpOnly cookie session.
- `FR-AUTH-03`: The frontend can retrieve the current user and distinguish `401` from a network
  or server failure.
- `FR-AUTH-04`: Protected routes redirect an unauthenticated visitor to login and retain a safe
  internal return path.
- `FR-AUTH-05`: Google sign-in may remain available, but it must be configuration-driven and is
  not required to accept the invoice MVP.

### Business profile

- `FR-PROFILE-01`: A user can create or update exactly one business profile.
- `FR-PROFILE-02`: The profile contains business name, email, address line 1, optional address
  line 2, postal code, city, and ISO alpha-2 country code.
- `FR-PROFILE-03`: A complete profile is required before an invoice can be created.
- `FR-PROFILE-04`: Updating the profile does not change an existing invoice or PDF.

### Services

- `FR-SERVICE-01`: A user can create a reusable service with name, optional description, and a
  non-negative default unit price.
- `FR-SERVICE-02`: A user can list only their own services, ordered by name and then ID for stable
  results.
- `FR-SERVICE-03`: Creating a service returns `201 Created` and the complete service response.
- `FR-SERVICE-04`: Editing and deleting services are not required for the MVP.

### Invoices

- `FR-INVOICE-01`: A user can create an invoice only when authenticated and after completing a
  business profile.
- `FR-INVOICE-02`: An invoice contains issue date, due date, customer name, optional customer
  email, customer address, `EUR`, optional notes, and at least one line.
- `FR-INVOICE-03`: Each line contains optional `serviceId`, an editable description, unit price,
  and quantity.
- `FR-INVOICE-04`: When `serviceId` is supplied, the service must belong to the current user.
- `FR-INVOICE-05`: The backend calculates and persists line totals and the invoice total.
- `FR-INVOICE-06`: The due date cannot be earlier than the issue date.
- `FR-INVOICE-07`: The backend copies seller, customer, and line values into immutable invoice
  snapshots.
- `FR-INVOICE-08`: A successful create returns `201 Created` with invoice metadata; it never
  returns a private Supabase key.
- `FR-INVOICE-09`: A user can list their own invoices newest first.
- `FR-INVOICE-10`: A user can retrieve one owned invoice with its lines.
- `FR-INVOICE-11`: A user cannot discover, read, or download another user's invoice.

### PDF

- `FR-PDF-01`: A successful invoice creation generates one English PDF from persisted snapshot
  values.
- `FR-PDF-02`: The PDF includes invoice number and dates, seller and customer details, line
  description, unit price, quantity, line total, grand total, currency, and optional notes.
- `FR-PDF-03`: The PDF is uploaded to the private `invoices` bucket using
  `{userId}/{invoiceId}.pdf`.
- `FR-PDF-04`: PostgreSQL stores the object key, generation timestamp, and byte size.
- `FR-PDF-05`: An authorized download request redirects to a short-lived signed URL.
- `FR-PDF-06`: A failed render, upload, or final database commit does not leave a successful
  invoice response. Uploaded orphan cleanup is attempted and logged.

### Language

- `FR-LANG-01`: English is the only MVP UI and PDF language.
- `FR-LANG-02`: New frontend copy is read from English locale resources once localization is
  introduced.
- `FR-LANG-03`: Dutch translations, a language switcher, and per-invoice PDF language are
  separate post-MVP work.

## Target HTTP contracts

All JSON property names use `camelCase`. All protected endpoints require the Identity application
cookie.

| Method | Route | Success | Purpose |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | `200` | Create and sign in a user |
| `POST` | `/api/auth/login` | `200` | Start a cookie session |
| `POST` | `/api/auth/logout` | `200` | End the session |
| `GET` | `/api/auth/me` | `200` | Return the current user |
| `GET` | `/api/business-profile` | `200` | Return the current user's profile |
| `PUT` | `/api/business-profile` | `200` | Create or replace the profile |
| `GET` | `/api/services` | `200` | List owned services |
| `POST` | `/api/services` | `201` | Create a service |
| `GET` | `/api/invoices` | `200` | List owned invoice summaries |
| `POST` | `/api/invoices` | `201` | Create, render, and store an invoice |
| `GET` | `/api/invoices/{id}` | `200` | Return one owned invoice and its lines |
| `GET` | `/api/invoices/{id}/pdf` | `302` | Redirect to an authorized signed URL |

Missing or foreign owned resources return `404`. Invalid request data returns an RFC 7807-style
validation response. An unauthenticated request returns `401`, and an authenticated request that
is globally forbidden returns `403`.

### Create service

```json
{
  "name": "Website development",
  "description": "Implementation work per hour",
  "defaultUnitPrice": 100.00
}
```

```json
{
  "id": "6d9e2bd5-c7e2-49ad-a5f7-f5ee18414a82",
  "name": "Website development",
  "description": "Implementation work per hour",
  "defaultUnitPrice": 100.00
}
```

### Create invoice

```json
{
  "issueDate": "2026-08-23",
  "dueDate": "2026-09-06",
  "customerName": "Example Customer B.V.",
  "customerEmail": "finance@example.test",
  "customerAddress": "Main Street 10, 1234 AB Amsterdam, NL",
  "currency": "EUR",
  "notes": "Thank you for your business.",
  "items": [
    {
      "serviceId": "6d9e2bd5-c7e2-49ad-a5f7-f5ee18414a82",
      "description": "Website development",
      "unitPrice": 100.00,
      "quantity": 8.5
    }
  ]
}
```

Successful response:

```json
{
  "id": "3654b204-5ddb-4890-8754-d252fe5f226b",
  "invoiceNumber": "INV-2026-3654B204",
  "issueDate": "2026-08-23",
  "dueDate": "2026-09-06",
  "customerName": "Example Customer B.V.",
  "totalAmount": 850.00,
  "currency": "EUR",
  "hasPdf": true
}
```

The response `Location` header points to `/api/invoices/{id}`. Clients derive the download action
from the invoice ID and do not receive `pdfStorageKey`.

### Validation response

```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "items": ["At least one invoice item is required."],
    "dueDate": ["Due date cannot be before issue date."]
  }
}
```

The frontend must not assume every failure has a `message` property.

## Validation rules

| Field | Rule |
| --- | --- |
| Business name | Required, trimmed, maximum 150 characters |
| Email | Required for seller, optional for customer; valid format; maximum 254 characters |
| Address fields | Required where specified, trimmed, bounded lengths |
| Country code | Exactly two uppercase ASCII letters |
| Service name | Required, trimmed, maximum 100 characters |
| Service description | Optional, maximum 250 characters |
| Unit price | `0` through `9999999999999999.99` |
| Quantity | Greater than `0`, maximum three decimal places |
| Customer name | Required, trimmed, maximum 150 characters |
| Customer address | Required, trimmed, maximum 500 characters |
| Notes | Optional, maximum 2,000 characters |
| Items | Between 1 and 100 lines |
| Currency | Exactly `EUR` in the MVP |

Database constraints mirror important request limits so invalid values cannot be inserted by a
different code path.

## Quality requirements

- `NFR-01 Security`: every profile, service, invoice, and PDF lookup is scoped by current user ID.
- `NFR-02 Secrets`: Google and Supabase credentials are never committed or sent to the browser.
- `NFR-03 Consistency`: API errors use Problem Details/validation responses and typed status codes.
- `NFR-04 Reliability`: cancellation tokens reach EF Core, QuestPDF orchestration, and Supabase
  operations where supported.
- `NFR-05 Data integrity`: database precision, maximum lengths, foreign keys, and unique indexes
  enforce the documented model.
- `NFR-06 Observability`: failures include structured context such as invoice ID and operation,
  but never passwords, cookies, keys, or signed URLs.
- `NFR-07 Accessibility`: forms have associated labels, keyboard-accessible controls, visible
  validation, and an error summary where appropriate.
- `NFR-08 Maintainability`: one vertical slice remains reviewable in at most 500 non-generated
  changed lines.
- `NFR-09 Testability`: calculation and rendering boundaries are deterministic; endpoint tests use
  a real PostgreSQL-compatible path rather than EF's in-memory provider.
- `NFR-10 Performance`: invoice lists return summaries without PDF bytes or signed URLs. No
  optimization is added before measurement.

## MVP acceptance criteria

The MVP is complete only when all of the following are demonstrable:

1. A new user can register, remain authenticated, and complete a business profile.
2. The user can create and list reusable services.
3. The invoice form can add, remove, and edit at least one line and can prefill from an owned
   service.
4. Submitting valid data creates invoice and line records with server-calculated totals.
5. The generated English PDF matches the persisted snapshot and is stored privately.
6. The invoice appears in the list, its detail can be opened, and its PDF can be downloaded.
7. A second user cannot read or download any resource owned by the first user.
8. Invalid requests produce field-level validation messages without partial database or storage
   state.
9. Backend and frontend builds, lints, and agreed automated tests pass.
10. README current-status statements are updated from “partial” to “working” only after the
    relevant acceptance evidence exists.

## Explicit non-goals

- legal or fiscal compliance;
- sequential invoice numbering;
- VAT or other tax calculation;
- discounts and credit notes;
- a customer table or customer management;
- invoice editing after creation;
- draft/sent/paid/overdue/cancelled workflows;
- payment collection or reconciliation;
- emailing invoices;
- recurring invoices;
- organizations, roles beyond existing Identity roles, or shared access;
- multiple currencies;
- Dutch UI/PDF output;
- production deployment or production migration automation.
