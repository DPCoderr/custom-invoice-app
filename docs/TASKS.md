# Implementation backlog

## How to use this file

Work from top to bottom unless a ticket explicitly says it can run independently. Complete one
ticket per reviewable change. A ticket is complete only when its acceptance criteria and checks
pass; writing code is not completion by itself.

Size estimates count human-reviewed source lines. Generated migrations, lockfiles, and generated
TanStack route trees are excluded from the estimate but must still be inspected.

Status values:

- `Ready`: sufficiently specified and not implemented;
- `Blocked`: a prerequisite is incomplete;
- `Done`: acceptance evidence exists and documentation reflects it.

All tickets below start as `Ready` or `Blocked`. Update status in the same change that completes a
ticket.

## Current findings

| Priority | Finding | Planned ticket |
| --- | --- | --- |
| P0 | Invoice create, PDF storage, list, detail, and download are not functional. | `INVOICE-001` through `INVOICE-007` |
| P0 | Frontend and backend invoice field names and shapes disagree. | `INVOICE-001`, `FE-002` |
| P0 | User-owned reads do not yet have a proven, tested ownership pattern. | `FND-005`, `QA-001` |
| P0 | Cookie settings, HTTP localhost, hardcoded origins, and Google redirects are inconsistent. | `FND-004`, `AUTH-001` |
| P1 | Feature endpoints map outside `/api` and use action/case-inconsistent paths. | `FND-005` |
| P1 | `InvoiceNumber` is a `Guid`; decimal precision, lengths, and unique constraints are missing. | `DATA-001` |
| P1 | Seller data has no source and historical seller snapshots do not exist. | `PROFILE-001` |
| P1 | The frontend has duplicate user APIs, double response parsing, and hides network failures as logout. | `FND-004` |
| P1 | Supabase construction and PDF code are commented prototypes inside feature code. | `INVOICE-003`, `INVOICE-004` |
| P1 | Startup automatically applies migrations and there is no repeatable design-time migration path. | `DATA-001` |
| P1 | There are no backend tests and Vitest contains no test files. | `FND-004`, `QA-001` |
| P2 | The frontend build reports a dashboard chunk larger than 500 kB. | Post-MVP performance review |

## Foundation

### FND-001 — Establish a clean frontend quality baseline

**Status:** Done
**Purpose:** Make lint output trustworthy before feature work adds more diagnostics.
**Prerequisites:** None.
**Expected area:** `biome.json` and existing frontend files named by Biome.
**Estimated size:** 150–350 lines.

**Implementation**

- Update the Biome schema reference to the installed CLI version without disabling recommended
  rules.
- Fix all current errors and warnings: type-only imports, unused imports, invalid empty anchors,
  inaccessible labels/breadcrumb semantics, optional-chain diagnostics, and formatting findings.
- Treat shadcn primitives carefully: fix usage sites first and change a primitive only when its
  general implementation is the source of the diagnostic.
- Do not introduce broad ignore patterns. Keep generated route-tree and stylesheet exclusions.

**Acceptance criteria**

- `npm run lint` exits successfully with zero errors and warnings.
- `npm run build` still passes.
- UI behavior is unchanged except for corrected semantics/accessibility.

**Tests/checks:** `npm run lint`, `npm run build`.
**Non-goals:** visual redesign, feature behavior, localization, bundle optimization.

### FND-002 — Remove starter and duplicate application code

**Status:** Done
**Purpose:** Leave one obvious router/session/API structure and remove template behavior that is not
part of Invoice Generator.
**Expected area:** router bootstrap, unused auth hooks/API functions, demo routes/data, placeholder
landing/dashboard copy.
**Estimated size:** 150–300 lines.

**Implementation**

- Choose `main.tsx` as the single router bootstrap and remove the unused duplicate router factory,
  or move the existing bootstrap into that factory and use it exactly once.
- Keep one `getUser` API contract; remove the implementation that attempts to parse a response
  twice.
- Remove the unused `posts` demo route and regenerate the route tree through the configured TanStack
  command.
- Remove dead invoice mutation files and unused auth-hook paths only after verifying no imports.
- Replace template “TanStack Start” copy and mock-only navigation with minimal Invoice Generator
  placeholders. Do not implement real invoice features in this cleanup.
- Leave shadcn-generated components in place when they are likely to be used.

**Acceptance criteria**

- There is one router construction and one current-user fetch implementation.
- No production route imports `data.json` or displays a framework starter message.
- Generated route output contains no removed demo route.
- Build and lint pass.

**Tests/checks:** `npm run generate-routes`, `npm run lint`, `npm run build`.
**Non-goals:** API client redesign (`FND-004`), final dashboard, invoice CRUD.

### FND-003 — Make Aspire the local frontend entrypoint

**Status:** Done
**Purpose:** Start PostgreSQL, API, and Vite through the AppHost and use relative `/api` calls.
**Expected area:** AppHost project/resource graph and Vite dev-server configuration.
**Estimated size:** 100–250 lines plus lock/package metadata.

**Implementation**

- Search the installed Aspire docs/API docs for the current `AddViteApp` C# APIs before editing.
- Add the official JavaScript hosting integration through `aspire add ... --non-interactive`; do not
  hand-pick an unverified package version.
- Register the frontend with `AddViteApp`, reference `webapi`, expose its HTTP endpoint, and wait for
  the API.
- Configure Vite to proxy `/api` to the Aspire-provided API endpoint. Do not call
  `.WithHttpEndpoint()` on `AddViteApp`, which already supplies its endpoint.
- Change application calls only as needed to prove the proxy; the shared-client conversion belongs
  to `FND-004`.
- Document any separate production hosting decision as unresolved; this ticket is local-only.

**Acceptance criteria**

- `aspire start` launches frontend, `webapi`, PostgreSQL, and pgAdmin.
- `aspire wait frontend` and `aspire wait webapi` succeed using the actual resource names.
- A browser request to relative `/api/auth/me` reaches the API without a hardcoded origin.
- The AppHost has no duplicate Vite endpoint configuration.

**Tests/checks:** AppHost build, `aspire start`, resource waits, `aspire describe`, frontend build.
**Non-goals:** cloud deployment, custom domain, production static hosting.

### FND-004 — Add one frontend API client and error model

**Status:** Ready.
**Purpose:** Centralize request behavior and stop hiding server/network errors as authentication
state.
**Expected area:** `src/lib/api`, auth API adapters, current-user query, and focused Vitest files.
**Estimated size:** 250–400 lines.

**Implementation**

- Add the shared `apiRequest`/`ApiError` contract from the frontend conventions.
- Use relative `/api` paths, cookies, optional abort signals, and single-pass body parsing.
- Support JSON success, empty success, validation Problem Details, ordinary Problem Details, `401`,
  and transport failure.
- Migrate register, login, logout, and current-user calls to the client.
- Return `null` from current-user only for `401`; throw every other failure.
- Give current-user data a finite stale policy and explicitly invalidate/update it after auth
  mutations before navigation.
- Add Vitest tests by stubbing fetch responses; do not add MSW unless the ticket would remain below
  its size limit and the dependency is justified.

**Acceptance criteria**

- No frontend API module contains a hardcoded backend origin.
- Response bodies are parsed at most once.
- Server validation detail reaches forms, while network failures remain distinguishable.
- An API outage shows an error and does not silently redirect an authenticated route as logged out.

**Tests/checks:** API-client tests, auth-query tests, `npm run test`, lint, build.
**Non-goals:** generated OpenAPI clients, global toast policy, invoice APIs.

### FND-005 — Normalize API route groups and error contracts

**Status:** Ready; coordinate with `FND-003` before integration testing.
**Purpose:** Give every feature one predictable `/api` route and consistent HTTP failures.
**Expected area:** `Program.cs`, endpoint registration, validation filter, and existing service/item
scaffolds.
**Estimated size:** 150–300 lines.

**Implementation**

- Map discovered feature endpoints on the existing `/api` group rather than on `app`.
- Normalize existing feature paths to lowercase resource routes and remove the empty standalone
  invoice-item create route; invoice items are created with their invoice.
- Keep auth routes at `/api/auth/*`.
- Configure Problem Details consistently for unexpected errors and endpoint-produced not-found or
  conflict responses.
- Keep `Results.ValidationProblem` as the validation shape and verify Scalar documents it.
- Add stable endpoint names and tags.

**Acceptance criteria**

- No application feature endpoint unintentionally exists outside `/api`.
- No route contains `/create` or uppercase resource segments.
- Invalid JSON/validation, unauthenticated, not-found, and unexpected failures have documented
  status codes and parseable Problem Details behavior.
- Scalar groups auth, services, profile, and invoices predictably as they are added.

**Tests/checks:** API build, inspect OpenAPI/Scalar, focused HTTP smoke requests.
**Non-goals:** changing endpoint business behavior, API versioning, response envelopes.

### AUTH-001 — Stabilize authentication validation and cookies

**Status:** Blocked by `FND-003` through `FND-005`.
**Purpose:** Make the existing cookie flow reliable for the same-origin local architecture.
**Expected area:** authentication features, cookie/CORS configuration, Google redirect settings,
and auth frontend behavior.
**Estimated size:** 300–500 lines.

**Implementation**

- Add FluentValidation for register and login request shapes; keep password policy aligned with
  configured Identity policy rather than duplicating unexplained regex rules.
- Return consistent validation/Problem Details responses without revealing whether an email exists.
- Configure cookie `SameSite`, secure policy, and CORS by environment for the same-origin `/api`
  target; document that a future cross-site deployment requires a separate CSRF review.
- Move allowed frontend origins and Google callback frontend base URL into validated configuration.
- Handle failed/cancelled Google authentication and missing claims without null-forgiving crashes.
- Accept only safe internal return paths.
- Ensure login/register/logout update the current-user query correctly.

**Acceptance criteria**

- Register, login, `/me`, and logout work through the Aspire-hosted frontend.
- Incorrect credentials return a generic error.
- Missing Google configuration fails clearly only when Google auth is invoked/enabled.
- No hardcoded Vercel, Render, or localhost redirect remains in auth source.

**Tests/checks:** auth validator tests, cookie integration smoke flow, unsafe return-path test,
frontend auth tests, builds/lint.
**Non-goals:** password reset, email confirmation, MFA, production cross-site deployment.

## Data and core features

### DATA-001 — Correct invoice schema constraints and migration workflow

**Status:** Blocked by `FND-005`.
**Purpose:** Make the existing schema match the documented learning-MVP primitives before feature
handlers depend on it.
**Expected area:** invoice/service entities, EF configuration, design-time database setup, and one
new corrective migration.
**Estimated size:** 300–500 lines excluding generated migration files.

**Implementation**

- Keep Identity user IDs as strings.
- Change visible `InvoiceNumber` from `Guid` to bounded string and add a per-user unique index.
- Rename the invoice-line snapshot from `ServiceName` to `Description` consistently.
- Replace ambiguous `PdfPath` with nullable storage key, generated timestamp, and byte-size metadata.
- Remove `IsPaid`; status/payment tracking is not in the MVP.
- Configure all documented text lengths, required columns, indexes, money precision, and quantity
  precision. Ensure deleting a service sets the optional reference to null or restricts deletion
  without deleting historical lines.
- Establish one repeatable design-time `AppDbContext` creation path that does not commit a
  connection string, then document the exact migration command in `DEVELOPMENT.md`.
- Add a new corrective migration; do not edit `InvoicesTables` or its snapshot history manually.
- Restrict automatic startup migration behavior to the documented local environment, leaving
  production migration orchestration explicitly deferred.

**Acceptance criteria**

- A clean database migrates from the existing history to the corrected target without data loss
  assumptions hidden in code.
- The model snapshot shows the exact lengths, precision, relationships, and unique index.
- The design-time migration command works from a clean terminal with secrets/config supplied through
  the documented mechanism.
- Backend build passes.

**Tests/checks:** inspect generated SQL/migration, migrate a clean PostgreSQL database, build.
**Non-goals:** business profile, seller snapshots, legal sequential numbering, tax.

### PROFILE-001 — Add business profile and seller snapshots

**Status:** Blocked by `DATA-001`.
**Purpose:** Give every generated invoice a user-owned seller identity that remains historically
stable.
**Expected area:** data model/configuration/migration and a profile vertical slice.
**Estimated size:** 350–500 lines excluding migration.

**Implementation**

- Add one `BusinessProfile` per `AppUser` with the fields and limits in `REQUIREMENTS.md`.
- Add seller name, email, and formatted-address snapshot fields to `Invoice`.
- Add `GET /api/business-profile`; return `404` when no profile exists.
- Add idempotent `PUT /api/business-profile`; create when absent and update when present.
- Scope both operations to the authenticated user and set `UpdatedAt` in UTC.
- Add validation and a new migration with a unique `UserId` index.
- Do not expose Identity navigation or another user's profile.

**Acceptance criteria**

- A user can create, retrieve, and replace only their own profile.
- A second user sees `404`, not the first user's data.
- The database prevents two profiles for one user.
- Existing invoices can retain their own seller snapshot independently of future profile edits.

**Tests/checks:** validator boundaries, create/update/read HTTP tests, two-user ownership test,
migration/build.
**Non-goals:** logos, bank accounts, VAT/KVK numbers, multiple profiles.

### SERVICE-001 — Finish service create and list

**Status:** Blocked by `FND-005`, `DATA-001`, and auth stability.
**Purpose:** Provide the reusable service catalogue required by invoice creation.
**Expected area:** existing create slice plus a small list slice.
**Estimated size:** 200–400 lines.

**Implementation**

- Move/normalize the slice to the `Features.Services` convention without overwriting the user's
  existing custom validation messages unintentionally.
- Map `POST /api/services`, return `201 Created`, `Location`, and `ServiceResponse`.
- Trim text and persist the current user ID.
- Add `GET /api/services` with `AsNoTracking`, current-user filtering, and stable name/ID ordering.
- Return an empty array for no services.
- Add tags, names, cancellation, validation, and tests.

**Acceptance criteria**

- Created data is returned and appears in the caller's service list.
- The endpoint never returns another user's service.
- Invalid price/name/description values return field errors.
- The contract matches the documented JSON exactly.

**Tests/checks:** validator tests, create/list/two-user endpoint tests, build and OpenAPI review.
**Non-goals:** update, delete, search, pagination, unique service names.

## Invoice backend

### INVOICE-001 — Define invoice contracts and validation

**Status:** Blocked by `DATA-001` and `PROFILE-001`.
**Purpose:** Lock the public create/detail/list shapes before orchestration is implemented.
**Expected area:** `Features/Invoices/CreateInvoice` contracts and validator.
**Estimated size:** 150–300 lines.

**Implementation**

- Define `CreateInvoiceRequest`, nested item request, `InvoiceResponse`, list summary, detail, and
  line response records.
- Match property names and optionality in `REQUIREMENTS.md`.
- Validate dates, `EUR`, customer fields, notes, 1–100 items, descriptions, prices, quantities, and
  decimal scale.
- Do not accept totals, number, owner, seller fields, or PDF metadata.
- Keep database ownership/profile checks out of FluentValidation.

**Acceptance criteria**

- Scalar displays the intended schema once endpoints consume the records.
- Boundary tests cover empty items, 101 items, due-before-issue, unsupported currency, zero
  quantity, negative price, long text, and valid fractional quantity.
- Frontend contract examples can be mapped without undocumented fields.

**Tests/checks:** validator unit tests and backend build.
**Non-goals:** persistence, PDF generation, endpoint orchestration.

### INVOICE-002 — Implement invoice calculation and persistence model assembly

**Status:** Blocked by `INVOICE-001`.
**Purpose:** Build deterministic server-owned invoice values before external I/O is introduced.
**Expected area:** create-invoice handler helpers/domain calculation inside the feature.
**Estimated size:** 250–450 lines.

**Implementation**

- Resolve current user ID and load the owned business profile.
- Load all distinct referenced services in one scoped query; reject any missing/foreign ID without
  revealing ownership.
- Copy submitted editable description and price values into line snapshots.
- Calculate rounded line totals and grand total on the server.
- Generate invoice ID, readable MVP number, seller/customer snapshots, UTC timestamps, and item
  entities.
- Keep calculation deterministic and separately testable; do not save or upload yet.

**Acceptance criteria**

- A valid request produces a complete entity graph with no client-owned calculated fields.
- Profile absence and foreign/missing service references have explicit results.
- Fractional quantities and rounding behave consistently.
- Changing a service/profile after assembly cannot mutate snapshot values.

**Tests/checks:** calculation/rounding tests, profile/service ownership tests, build.
**Non-goals:** EF transaction, QuestPDF, Supabase, HTTP endpoint.

### INVOICE-003 — Implement the English QuestPDF renderer

**Status:** Blocked by `INVOICE-002`.
**Purpose:** Render a deterministic PDF from an immutable invoice document model.
**Expected area:** invoice PDF interface, document model, QuestPDF implementation, and tests.
**Estimated size:** 250–450 lines.

**Implementation**

- Replace commented sample/random template code with `IInvoicePdfRenderer` and a QuestPDF
  implementation.
- Map persisted snapshot values to a document model before calling the renderer.
- Render invoice heading, number, issue/due dates, seller/customer blocks, item table, total, EUR,
  notes, and page numbers.
- Centralize English PDF labels in one renderer resource/static copy object so later Dutch work does
  not require searching the layout.
- Use invariant model values and locale-aware presentation deliberately; never use random data or
  `DateTime.Now` in the renderer.

**Acceptance criteria**

- Rendering a fixed model returns non-empty bytes beginning with the PDF signature.
- The PDF can be opened and visually contains all required sections for zero-priced and fractional
  quantity lines.
- Long but valid descriptions and notes wrap without overlapping or clipping.

**Tests/checks:** deterministic renderer tests plus manual render/open visual check.
**Non-goals:** logos, themes, Dutch, email attachments, browser preview.

### INVOICE-004 — Add injected private PDF storage

**Status:** Blocked by `INVOICE-003`.
**Purpose:** Isolate Supabase operations and keep secrets/provider types out of handlers.
**Expected area:** storage interface/implementation, configuration options, dependency injection.
**Estimated size:** 250–400 lines.

**Implementation**

- Add the narrow `IInvoicePdfStorage` interface from the backend conventions.
- Bind and validate server-side Supabase URL/key and bucket name configuration.
- Register/reuse the Supabase client instead of constructing it per request.
- Upload to private bucket `invoices` using `{userId}/{invoiceId}.pdf` and `application/pdf`.
- Implement best-effort delete and short-lived signed URL creation.
- Wrap/map provider exceptions at the integration boundary while preserving the original error for
  logging; never log keys or signed URLs.
- Use a fake storage implementation in handler tests.

**Acceptance criteria**

- No Supabase construction remains inside invoice handlers.
- Configuration fails with an actionable message when the storage feature is invoked without
  required settings.
- Upload, delete, and signed-URL calls use the documented bucket/key.
- Storage keys and secrets are absent from public responses and logs.

**Tests/checks:** adapter/fake tests, optional private-bucket smoke test with local secrets, build.
**Non-goals:** public bucket, direct browser uploads, retry library, background jobs.

### INVOICE-005 — Complete transactional invoice creation

**Status:** Blocked by `INVOICE-001` through `INVOICE-004`.
**Purpose:** Connect validation, ownership, persistence, rendering, storage, compensation, and HTTP
response into the primary vertical slice.
**Expected area:** create-invoice endpoint and handler.
**Estimated size:** 350–500 lines.

**Implementation**

- Map authorized `POST /api/invoices` with validator, name, tags, and typed results.
- Assemble the entity graph through `INVOICE-002` behavior.
- Begin an EF transaction, persist the invoice/items, render PDF, upload it, save metadata, and
  commit in the order documented in `ARCHITECTURE.md`.
- On render/upload failure, roll back. On commit failure after upload, attempt deletion and log a
  compensation failure separately without masking the original error.
- Return `201 Created`, `Location`, and `InvoiceResponse`; do not return storage key or signed URL.
- Use request cancellation throughout.

**Acceptance criteria**

- One valid request creates matching database rows and one private object.
- The returned total and number match persisted data.
- Validation/profile/service/render/upload failures return no success and leave no committed invoice.
- Commit failure triggers best-effort storage cleanup.
- A second user cannot reference the first user's service.

**Tests/checks:** success integration test, each failure-path test with fakes, PostgreSQL transaction
test, OpenAPI review, build.
**Non-goals:** idempotency keys, asynchronous jobs, invoice editing.

### INVOICE-006 — Add secure PDF download

**Status:** Blocked by `INVOICE-005`.
**Purpose:** Let an owner download a PDF without exposing storage credentials or permanent URLs.
**Expected area:** one small invoice PDF endpoint.
**Estimated size:** 100–250 lines.

**Implementation**

- Map `GET /api/invoices/{id:guid}/pdf` with authorization.
- Query invoice ID and current user ID together and require non-null PDF metadata.
- Return the same `404` for missing, foreign, or unavailable PDFs.
- Ask storage for a signed URL with the documented short lifetime and return `302`.
- Prevent the URL or token from entering application logs.

**Acceptance criteria**

- The owner receives a redirect and can open a PDF.
- Another authenticated user and a random ID both receive indistinguishable `404` responses.
- An unauthenticated request returns `401`.
- The API never returns the provider key or a permanent public URL.

**Tests/checks:** owner/foreign/missing/unauthenticated endpoint tests and optional storage smoke
test.
**Non-goals:** inline streaming, caching signed URLs, email sharing.

### INVOICE-007 — Add invoice list and detail endpoints

**Status:** Blocked by `INVOICE-005`.
**Purpose:** Supply the metadata needed by the frontend without loading PDF bytes or signing URLs.
**Expected area:** list and detail vertical slices.
**Estimated size:** 250–450 lines.

**Implementation**

- Add `GET /api/invoices` returning owned summaries ordered by `CreatedAt` descending and ID as a
  stable tie-breaker.
- Add `GET /api/invoices/{id:guid}` returning owned seller/customer snapshots and ordered lines.
- Use `AsNoTracking` and project directly to response records.
- Return empty array for no invoices and `404` for missing/foreign detail.
- Include `hasPdf`, never the private storage key.
- Keep pagination out of MVP, but avoid loading document bytes or generating signed URLs.

**Acceptance criteria**

- Each user sees only their invoices.
- Detail totals and lines match create output.
- Empty, owner, foreign, and missing cases use documented status codes.
- Query shape does not include storage content or provider calls.

**Tests/checks:** list ordering/empty/two-user tests, detail tests, query review, build.
**Non-goals:** filtering, search, pagination, status, editing.

## Frontend completion

### I18N-001 — Establish English locale resources

**Status:** Ready. Can run before invoice frontend tickets.
**Purpose:** Prevent new screens from spreading hardcoded copy while still shipping English only.
**Expected area:** localization bootstrap, English resources, existing app-owned screens.
**Estimated size:** 200–400 lines plus lockfile.

**Implementation**

- Add `i18next` and `react-i18next` with fixed default/fallback `en`.
- Organize semantic keys by common/auth/profile/services/invoices.
- Move app-owned user-facing copy into English resources; do not rewrite shadcn internal copy that
  is not user-visible application content.
- Localize date and EUR display through existing internationalization APIs.
- Keep API identifiers, logs, routes, and schema field names unchanged.
- Do not add Dutch resources or a switcher.

**Acceptance criteria**

- The application renders the same English experience from resource keys.
- Missing keys fall back predictably in development.
- New feature tickets have an obvious resource location for copy.
- Build, lint, and tests pass.

**Tests/checks:** localization initialization test, representative component test, lint/build.
**Non-goals:** Dutch, runtime language selection, backend/PDF language contract.

### FE-001 — Add business profile and service UI

**Status:** Blocked by `PROFILE-001`, `SERVICE-001`, `FND-004`, and `I18N-001`.
**Purpose:** Let the user satisfy invoice prerequisites and maintain reusable services.
**Expected area:** profile/services features and thin authenticated routes.
**Estimated size:** 350–500 lines.

**Implementation**

- Add hand-written contracts, Zod schemas, request mappers, query options, and mutations for profile
  and services.
- Add a profile form using existing form components and field/root server errors.
- Add service list, empty state, and create form; invalidate service keys after creation.
- Add an owned-service select component reusable by the invoice form.
- Preload required queries from route loaders and include pending/error states.
- Use locale resources and relative API calls.

**Acceptance criteria**

- A new user can create/update a profile and create/list a service without a page reload.
- Invalid server responses map to the correct fields.
- Empty/error/loading states are accessible.
- No API origin or mock service data is hardcoded.

**Tests/checks:** schema tests, mutation invalidation tests, profile/service component tests, lint,
build.
**Non-goals:** edit/delete service, multiple profiles, logos.

### FE-002 — Complete the invoice creation form

**Status:** Blocked by `INVOICE-005`, `FE-001`, and `I18N-001`.
**Purpose:** Submit the documented create contract with editable service snapshots.
**Expected area:** invoice schema/contracts/mapper/mutation and create form.
**Estimated size:** 400–500 lines.

**Implementation**

- Replace `clientName`/commented lines/VAT prototype fields with the target contract.
- Use `useFieldArray` for one or more lines with add/remove behavior.
- Selecting a service copies service ID, name into description, and default price; description and
  price remain editable.
- Keep issue/due dates only in React Hook Form and map them to local `yyyy-MM-dd` strings.
- Display EUR preview totals as non-authoritative UI values.
- Submit through a feature mutation, prevent duplicate submission, show field/root errors, and
  navigate to created invoice detail after success.
- Use English resource keys and accessible labels/actions.

**Acceptance criteria**

- The JSON request exactly matches `CreateInvoiceRequest` and contains no VAT/status/total fields.
- At least one line is enforced and fractional quantities work.
- Date serialization does not change across tested time zones.
- Server validation is visible and a successful response navigates to the new invoice.

**Tests/checks:** schema/mapper/time-zone tests, field-array interaction tests, request-shape test,
lint/build.
**Non-goals:** draft saving, tax, discounts, customer selector, PDF language.

### FE-003 — Replace mock invoices with list, detail, and download

**Status:** Blocked by `INVOICE-006`, `INVOICE-007`, `FND-004`, and `I18N-001`.
**Purpose:** Complete the user's post-creation invoice workflow.
**Expected area:** invoice query options and list/detail routes/components.
**Estimated size:** 300–500 lines.

**Implementation**

- Remove hardcoded invoice/status rows and obsolete status types.
- Add list/detail hand-written response types and query options.
- Preload list/detail queries in route loaders and use accessible loading, empty, error, and
  not-found states.
- Display server totals with `Intl.NumberFormat`, date-only values without timezone shifts, and
  `hasPdf` download availability.
- Implement download through `/api/invoices/{id}/pdf`; allow the browser to follow the authorized
  redirect.
- Invalidate invoice-list queries after creation.

**Acceptance criteria**

- The list contains only API data and links to typed detail routes.
- Detail renders snapshot seller/customer/line values and matching totals.
- Download works for an owner and error state is clear when the PDF is unavailable.
- No status workflow, signed URL, or private storage key is modeled in frontend state.

**Tests/checks:** list empty/error/success tests, detail test, download action test, route tests,
lint/build.
**Non-goals:** filters, pagination, status badges, edit/delete invoice.

## Quality gate

### QA-001 — Add integration coverage and run MVP acceptance

**Status:** Blocked by all MVP tickets above.
**Purpose:** Prove the vertical flow and ownership boundaries with automated and manual evidence.
**Expected area:** backend test project, frontend integration-focused tests, and documentation status
updates.
**Estimated size:** 350–500 lines excluding test snapshots/package metadata.

**Implementation**

- Add an xUnit backend integration test project using `WebApplicationFactory` and a real
  PostgreSQL-compatible container/test resource. Do not use EF InMemory for relational behavior.
- Provide test authentication helpers that can create two distinct users without bypassing endpoint
  authorization behavior under test.
- Use fakes for PDF renderer/storage in failure-path tests and one opt-in real Supabase smoke test
  guarded by secrets.
- Cover register/login/session, profile, services, invoice create, list, detail, and PDF ownership.
- Complete frontend tests for the critical authenticated create/list/detail flow using mocked HTTP
  boundaries.
- Run the manual acceptance sequence from `REQUIREMENTS.md` through Aspire.
- Update README status rows only for behavior proven by the checks.

**Acceptance criteria**

- Two-user tests prove no profile, service, invoice, or PDF crosses ownership boundaries.
- Render/upload/commit failures have regression coverage.
- Backend build/tests and frontend build/lint/tests pass.
- Aspire resources become healthy and the manual end-to-end flow succeeds.
- No empty test suite, skipped critical test, or unexplained warning is treated as success.

**Tests/checks:** complete solution build/test, frontend lint/build/test, Aspire start/waits, manual
MVP acceptance.
**Non-goals:** load testing, production deployment test, legal document review.

## Post-MVP roadmap

These items are intentionally compact. Expand only the next selected item into sub-500-line tickets
before implementation.

1. **Dutch UI localization:** add `nl` resources, persisted/user-selected locale, and switcher.
2. **Per-invoice PDF language:** add a supported language contract and English/Dutch PDF resources.
3. **Dutch legal readiness:** obtain professional requirements, add mandatory seller/customer/tax
   fields, retention policy, immutable audit behavior, and compliance tests.
4. **Sequential numbering:** replace ID-derived display numbers with concurrency-safe per-user/year
   sequences and explicit gap policy.
5. **VAT:** add tax categories/rates, tax snapshots, subtotal/tax/grand-total calculations, PDF
   presentation, and rounding tests.
6. **Customer management:** add reusable customers while continuing to snapshot customer data on
   each invoice.
7. **Invoice lifecycle:** model draft/sent/paid/overdue/cancelled transitions only after defining
   allowed transitions and audit requirements.
8. **Editing and credit notes:** decide immutability boundaries; do not silently mutate finalized
   invoices.
9. **Email delivery:** introduce a provider boundary, delivery status, retries, and safe attachment
   handling.
10. **Recurring invoices:** schedule generation only after numbering, lifecycle, and idempotency are
    defined.
11. **Deployment:** select frontend hosting, API hosting, Supabase environment strategy, secret
    management, migration orchestration, observability, backup, and rollback procedures.
12. **Performance:** measure route chunks, list query size, PDF latency, and storage calls before
    adding pagination, background jobs, or caching.
