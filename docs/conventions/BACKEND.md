# Backend conventions

## Goals

Backend code should be easy for a junior developer to trace from HTTP request to database write.
Prefer explicit feature code over framework-heavy indirection.

The API uses:

- .NET 10 Minimal APIs;
- vertical slices under `Features`;
- EF Core directly in handlers;
- FluentValidation through the existing endpoint filter;
- typed HTTP results and Problem Details;
- ASP.NET Core Identity cookie authentication.

## Coaching default

The project owner is learning backend development. An agent handling backend work must default to:

1. restating the request and response contract;
2. explaining validation, authorization, data access, and failure cases;
3. proposing a small implementation sequence;
4. letting the owner implement it;
5. reviewing the result against the ticket and tests.

An agent edits backend code only after the user explicitly asks it to implement the backend ticket
or names the backend change directly.

## Route organization

`Program.cs` owns the root `/api` group. Feature endpoints receive and map onto that group:

```csharp
var api = app.MapGroup("/api");
api.MapAuthEndpoints();
api.MapFeatureEndpoints();
```

Feature routes are resource-oriented and lowercase:

```text
POST /api/services
GET  /api/services
POST /api/invoices
GET  /api/invoices/{id}
GET  /api/invoices/{id}/pdf
```

Do not add action words such as `/create`, inconsistent capitalization, or a second `/api` prefix
inside a feature.

Every endpoint supplies:

- a stable `.WithName(...)` value;
- `.WithTags(...)` for Scalar grouping;
- `.RequireAuthorization()` for user-owned data;
- an endpoint filter when a FluentValidation validator exists;
- typed results that advertise actual success and failure statuses.

## Small vertical slice: one file

Use one file when the feature has one request, one response, straightforward validation, one EF
operation, and no external integration. Keep the records, endpoint, validator, and handler nested
under one feature class.

The following is the target shape for a small `CreateService.cs` slice. It is a convention example,
not a claim that the current source already matches it.

```csharp
using System.Security.Claims;
using FluentValidation;
using Microsoft.AspNetCore.Http.HttpResults;
using MyApp.Api.Data;
using MyApp.Api.Shared;

namespace MyApp.Api.Features.Services;

public static class CreateService
{
    public sealed record Request(
        string Name,
        string? Description,
        decimal DefaultUnitPrice);

    public sealed record Response(
        Guid Id,
        string Name,
        string? Description,
        decimal DefaultUnitPrice);

    public sealed class Validator : AbstractValidator<Request>
    {
        public Validator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .MaximumLength(100);

            RuleFor(x => x.Description)
                .MaximumLength(250);

            RuleFor(x => x.DefaultUnitPrice)
                .GreaterThanOrEqualTo(0);
        }
    }

    public sealed class Endpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost("/services", Handle)
                .WithName("CreateService")
                .WithTags("Services")
                .AddEndpointFilter<ValidationFilter<Request>>()
                .RequireAuthorization();
        }
    }

    private static async Task<Results<Created<Response>, UnauthorizedHttpResult>> Handle(
        Request request,
        ClaimsPrincipal principal,
        AppDbContext db,
        CancellationToken cancellationToken)
    {
        var userId = principal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId is null)
            return TypedResults.Unauthorized();

        var service = new Service
        {
            UserId = userId,
            Name = request.Name.Trim(),
            Description = request.Description?.Trim(),
            DefaultUnitPrice = request.DefaultUnitPrice
        };

        db.Services.Add(service);
        await db.SaveChangesAsync(cancellationToken);

        var response = new Response(
            service.Id,
            service.Name,
            service.Description,
            service.DefaultUnitPrice);

        return TypedResults.Created($"/api/services/{service.Id}", response);
    }
}
```

Do not add an interface for this handler. The HTTP endpoint is already the slice boundary.

## When to split a slice

Split the feature when any of these is true:

- it coordinates both a database transaction and external I/O;
- it needs a separately testable calculation, renderer, or integration adapter;
- more than one endpoint consumes the same behavior;
- the single file approaches 250 lines;
- request/response types become hard to find among orchestration details.

Invoice creation should use a feature folder similar to:

```text
Features/Invoices/CreateInvoice/
|-- Endpoint.cs
|-- Contracts.cs
|-- Validator.cs
|-- Handler.cs
`-- InvoiceDocumentModel.cs

Features/Invoices/Pdf/
|-- IInvoicePdfRenderer.cs
`-- QuestPdfInvoiceRenderer.cs

Features/Invoices/Storage/
|-- IInvoicePdfStorage.cs
`-- SupabaseInvoicePdfStorage.cs
```

The split follows concrete responsibilities. Do not create generic `IRepository<T>`,
`IService<T>`, command bus, or mediator abstractions.

## Contracts

- Use `sealed record` request and response types.
- Keep contracts inside the feature; do not expose EF entities directly.
- Use descriptive names (`CreateInvoiceRequest`, `InvoiceResponse`) in split features.
- JSON uses the framework's `camelCase` naming.
- Responses expose stable public data only. Do not return password data, storage keys, connection
  information, or provider responses.
- A create endpoint returns `201 Created` and a `Location` header.
- A delete endpoint, when later introduced, returns `204 No Content` on success.

For the exact MVP routes and JSON, use [REQUIREMENTS.md](../REQUIREMENTS.md).

## Validation

FluentValidation owns syntactic and cross-field request validation:

- required and maximum-length rules;
- email and country-code shape;
- numeric ranges and decimal scale;
- item-count limits;
- `DueDate >= IssueDate`;
- `Currency == "EUR"` for the MVP.

Database-dependent decisions remain in the handler:

- whether a business profile exists;
- whether a referenced service exists and belongs to the user;
- uniqueness conflicts;
- whether an invoice belongs to the current user.

Validation errors return `Results.ValidationProblem(...)`. Do not return ad-hoc strings for one
validator and Problem Details for another. Error messages are English and address the client field
name rather than internal entity terminology.

Validators should have focused unit tests for boundary values and cross-field rules.

## Authentication and ownership

- Require authorization in endpoint metadata.
- Resolve the current Identity user ID from the authenticated principal.
- Include `UserId == currentUserId` in every query for an owned entity.
- For a missing or foreign invoice/service, return the same `404` response.
- Never accept `userId` in a request body or trust a client-provided owner.
- Validate every optional `ServiceId` in an invoice request against the current user.
- Do not load a record by ID first and check ownership later when one scoped query can do both.

Example read predicate:

```csharp
var invoice = await db.Invoices
    .AsNoTracking()
    .Include(x => x.Items)
    .SingleOrDefaultAsync(
        x => x.Id == invoiceId && x.UserId == userId,
        cancellationToken);
```

Use `AsNoTracking()` for read-only queries.

## EF Core model rules

- Put relational constraints in `OnModelCreating` or small `IEntityTypeConfiguration<T>` classes
  once entity configuration becomes crowded.
- Mirror important validation with `HasMaxLength`, `HasPrecision`, required columns, foreign keys,
  and unique indexes.
- Use `numeric(18,2)` for money and `numeric(18,3)` for quantity.
- Keep existing Identity string keys.
- Generate a new migration for each schema correction. Never rewrite existing migrations.
- Inspect cascade behavior. Deleting a user may cascade to owned data; deleting a service must not
  delete historical invoice items.
- Set `CreatedAt` and `UpdatedAt` in UTC. Update `UpdatedAt` deliberately in write handlers.

The backend calculates:

```text
lineTotal = round(unitPrice * quantity, 2)
totalAmount = sum(lineTotal)
```

The request never supplies `LineTotal`, `TotalAmount`, `InvoiceNumber`, seller snapshots, owner ID,
or PDF metadata.

## Invoice numbering

For the learning MVP:

1. Generate the invoice `Guid` ID in the application.
2. Format `INV-{IssueDate.Year}-{first eight uppercase N-format ID characters}`.
3. Enforce uniqueness per user in the database.

This is intentionally non-sequential. Do not describe it as legally compliant. A later ticket may
replace the generator without changing the public string field.

## PDF rendering

The QuestPDF renderer accepts an immutable document model and returns bytes. It does not query EF,
read `ClaimsPrincipal`, or call Supabase.

```csharp
public interface IInvoicePdfRenderer
{
    byte[] Render(InvoiceDocumentModel model);
}
```

The document model contains already-calculated and already-snapshotted values. Renderer tests use a
fixed model and assert metadata/content characteristics without relying on random sample data or the
current clock.

## Storage integration

Wrap only the operations the use case needs:

```csharp
public interface IInvoicePdfStorage
{
    Task UploadAsync(
        string objectKey,
        ReadOnlyMemory<byte> content,
        CancellationToken cancellationToken);

    Task DeleteIfExistsAsync(
        string objectKey,
        CancellationToken cancellationToken);

    Task<string> CreateSignedUrlAsync(
        string objectKey,
        TimeSpan lifetime,
        CancellationToken cancellationToken);
}
```

- Register one configured Supabase client through dependency injection.
- Do not construct and initialize a new client inside every request handler.
- Use bucket `invoices` and object key `{userId}/{invoiceId}.pdf`.
- Upload as `application/pdf` without exposing the object key to clients.
- Generate signed URLs only after a database ownership check.
- Log provider failures with operation and invoice ID, never the key/secret or signed URL.

## Transaction and compensation

Invoice creation crosses PostgreSQL and Supabase, which cannot share one atomic transaction.
Use the documented sequence:

1. validate and load all prerequisites;
2. begin an EF transaction;
3. persist invoice/items so the generated ID and snapshots are fixed;
4. render PDF bytes;
5. upload the object;
6. save PDF metadata and commit;
7. if step 6 fails after upload, attempt a best-effort delete and rethrow/map the original failure.

Do not catch every exception and return `400`. Unexpected failures flow through the configured
exception handler as `500` Problem Details and are logged.

## Result rules

| Situation | Result |
| --- | --- |
| Created resource | `201 Created<T>` |
| Successful read/update | `200 Ok<T>` |
| Successful delete | `204 No Content` |
| Invalid request | `400 ValidationProblem` |
| No session | `401 Unauthorized` |
| Authenticated but globally forbidden | `403 Forbidden` |
| Missing or foreign owned record | `404 Problem` |
| Concurrency/unique conflict | `409 Problem` |
| Unexpected failure | `500 Problem` through exception middleware |

Do not wrap successful responses in a generic `{ success, data, message }` envelope. HTTP status,
typed payload, and Problem Details already provide the contract.

## Tests

For a small feature, cover:

- validator boundaries;
- unauthenticated request;
- successful request and response contract;
- persistence under the current user;
- cancellation where meaningful.

For user-owned reads, add a second user and prove cross-user access returns `404`. For invoice
creation, cover calculation, profile requirement, service ownership, rendering failure, upload
failure, commit compensation, and private-key non-disclosure.

Integration tests must use PostgreSQL-compatible behavior. Do not rely on EF Core's in-memory
provider for relational constraints or transaction behavior.

## Avoid

- business logic in `Program.cs`;
- unscoped `FindAsync(id)` for user-owned entities;
- `double` or `float` for money;
- `DateTime.Now` for persisted timestamps;
- swallowing provider exceptions;
- hardcoded URLs, credentials, bucket keys, or frontend origins;
- returning EF entities directly;
- a separate invoice-item create endpoint outside invoice creation;
- premature status, tax, customer, email, or payment models.
