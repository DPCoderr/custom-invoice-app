# Frontend page specifications

## Scope and authority

This is the target frontend-first release, not a claim of implemented functionality. Read this
with [Requirements](REQUIREMENTS.md), [Frontend conventions](conventions/FRONTEND.md), and the
[page workflow](FRONTEND-WORKFLOW.md). The original backend learning MVP remains a separate track.
This release adds customer management, service editing/archiving, and local list search/filter/sort.
It does not add tax, discounts, drafts, payment statuses, email, recurring invoices, invoice editing,
Dutch localization, multiple currencies, deployment, or legal-compliance claims.

These specifications are the starting brief for Sol-medium. Before Luna-max starts, Sol must add
the approved visual references, exact copy, component mapping, fixtures, and test cases using the
handoff template in the workflow. A generated image must never silently introduce a product feature.

## Page inventory

Full page descriptions and progress checklists live in [stream A](PAGES-A.md) and
[stream B](PAGES-B.md). Read this shared index first, then your assigned stream. The two streams
run concurrently only after the shared gates in the [workflow](FRONTEND-WORKFLOW.md) are satisfied.

| Order | Stream A | Stream B |
| --- | --- | --- |
| 1 | PAGE-01 Home | PAGE-04 Dashboard |
| 2 | PAGE-02 Login | PAGE-06 Customers |
| 3 | PAGE-03 Registration | PAGE-08 Invoices |
| 4 | PAGE-05 Business profile | PAGE-10 Invoice detail |
| 5 | PAGE-07 Services | PAGE-09 Create invoice |


| ID | Page / branch suffix | Route | Access | Primary outcome |
| --- | --- | --- | --- | --- |
| PAGE-01 | Home / `home` | `/` | Public | Understand the product and register |
| PAGE-02 | Login / `login` | `/login` | Guest | Start a session and continue |
| PAGE-03 | Registration / `signup` | `/signup` | Guest | Create an account and start a session |
| PAGE-04 | Dashboard / `dashboard` | `/dashboard` | Authenticated | See setup progress and recent work |
| PAGE-05 | Business profile / `business-profile` | `/business-profile` | Authenticated | Save seller information |
| PAGE-06 | Customers / `customers` | `/customers` | Authenticated | Maintain reusable customer details |
| PAGE-07 | Services / `services` | `/services` | Authenticated | Maintain reusable service prices |
| PAGE-08 | Invoices / `invoices` | `/invoices` | Authenticated | Find and open an invoice |
| PAGE-09 | Create invoice / `invoice-create` | `/invoices/create` | Authenticated | Submit an invoice with editable snapshots |
| PAGE-10 | Invoice detail / `invoice-detail` | `/invoices/$invoiceId` | Authenticated | Inspect snapshots and download the PDF |

## Rules shared by every page

- One clear heading, short supporting copy, explicit primary action, and semantic navigation.
- Light theme; existing Inter font and shadcn primitives. Follow the approved shared tokens.
  Use visual hierarchy, document previews, illustration, spacing, and considered composition;
  do not fill every screen with interchangeable cards, gradients, decorative charts, or fake metrics.
- Desktop at 1440px: persistent sidebar on protected pages. Tablet at 768px: off-canvas navigation.
  Mobile at 390px: single-column content, stacked actions, readable controls, and reflowed list rows.
  Also check 320px, long text, keyboard use, and 200% zoom. Do not hide essential data on mobile.
- Protected navigation: Dashboard, Invoices, Customers, Services, Business profile; prominent
  Create invoice action. Account area shows name/email and logout, without dead settings links.
- Only a real `401` represents a missing session. Preserve a safe internal return path when sending
  a guest to login; reject external and protocol-relative return URLs. Server/network errors show retry.
- Clear all user-scoped query data after successful logout and before another user enters.
  A failed logout keeps the current page and displays a retryable error.
- Queries use shared feature keys/options and pass cancellation signals. Mutations invalidate
  affected lists/details and dashboard dependencies; no reload is needed to see a saved change.
- All data-entry forms use React Hook Form, feature-owned Zod schemas, inferred types, and
  `zodResolver`. Use existing shadcn form adapters; add only missing primitives needed by the page.
- Default form values are complete; dates and line values are owned by React Hook Form. Never
  duplicate them in component state. Map form values explicitly to the documented HTTP request.
- Validate on submit, revalidate corrected fields after errors, focus the first invalid field,
  and show field errors plus a root summary. Map server errors, including indexed item paths.
- Preserve entered values on failure; prevent duplicate submissions while pending. Do not reset
  dirty forms on background refetch. Successful profile saves reset the dirty baseline to saved data.
- Confirm discarding dirty editable data when closing a sheet or leaving a form; cancel keeps
  values/focus. No confirmation is needed for an untouched form or after successful submission.
- Design loading skeletons, populated success, empty data, filtered-no-results, recoverable error,
  and not-found states where applicable. Forms also need invalid, saving, failed-save, and saved states.
  Keep existing data visible during background refresh and explain refresh failures inline.
- Error messages identify a recovery action; toasts are supplementary. Use visible focus,
  accessible labels, named icon actions, dialog focus trapping/restoration, and announced feedback.
- English resource keys hold application copy. Display dates and EUR through Intl; serialize
  date-only values using calendar parts, never UTC conversion. Server totals remain authoritative.
- Shared 404 boundary provides a useful return link. Invoice/PDF absence must not expose ownership.

## Target contract additions and clarification

These are frontend mock targets for later manual backend implementation, not existing endpoints.
Keep [Requirements](REQUIREMENTS.md) as the source for existing create/auth/error contracts.
IDs are UUID strings; optional text may be absent or null in responses and renders as empty.
Empty optional form strings are omitted in requests. All list endpoints return arrays.

| Contract | Shape / behavior |
| --- | --- |
| BusinessProfile input/response | `businessName`, `email`, `addressLine1`, optional `addressLine2`, `postalCode`, `city`, `countryCode`; GET missing -> 404; PUT -> 200 with saved fields |
| CustomerInput | `name` (trimmed, required, max 150), optional `email` (valid, max 254), `address` (trimmed, required, max 500) |
| CustomerResponse | CustomerInput plus `id`, `isArchived`; create defaults isArchived to false |
| Customer endpoints | GET `/api/customers` -> 200 including archived; POST -> 201 CustomerResponse; PUT `/api/customers/{id}` -> 200 CustomerResponse; POST `/api/customers/{id}/archive` without body -> 200 CustomerResponse |
| ServiceResponse extension | Existing service fields plus required `isArchived`; creates default false; GET includes archived |
| Service endpoints extension | PUT `/api/services/{id}` accepts existing create fields -> 200 ServiceResponse; POST `/api/services/{id}/archive` without body -> 200 ServiceResponse |
| Archive rules | Idempotent archive returns archived response; PUT of archived record -> 409; missing/foreign -> 404; all endpoints are user-scoped |
| InvoiceSummary | Existing create response fields: `id`, `invoiceNumber`, `issueDate`, `dueDate`, `customerName`, `totalAmount`, `currency`, `hasPdf` |
| InvoiceDetail | InvoiceSummary plus `sellerName`, `sellerEmail`, `sellerAddress`, optional `customerEmail`, `customerAddress`, optional `notes`, ordered `items` |
| InvoiceDetail item | optional `serviceId`, `description`, `unitPrice`, `quantity`, `lineTotal`; preserve array order |

Profile addressLine1/addressLine2 limits are 200 each, postalCode 20, city 100; required strings are
trimmed. Country is two uppercase ASCII letters. Business name/email use existing Requirements limits.
Clarify these targets in the contract ticket before writing fixtures/types; never adapt a page to an
old prototype DTO silently. Use explicit fixtures for successful, missing, archived, and failed cases.
