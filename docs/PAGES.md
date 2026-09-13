# Frontend page specifications

## Scope and authority

This is the target frontend-first release, not a claim of implemented functionality. Read this
with [Requirements](REQUIREMENTS.md), [Frontend conventions](conventions/FRONTEND.md), and the
[page workflow](FRONTEND-WORKFLOW.md). The original backend learning MVP remains a separate track.
This release adds customer management, service editing/archiving, and local list search/filter/sort.
It does not add tax, discounts, drafts, payment statuses, email, recurring invoices, invoice editing,
Dutch localization, multiple currencies, deployment, or legal-compliance claims.

Implement directly with GPT-6 Astra and reasoning `high`, one page at a time in the current chat.
No generated mockups, model handoff, or advance design approval is required. Refine the working UI
against these specifications and keep concise implementation notes following the [workflow](FRONTEND-WORKFLOW.md).

## Ordered completion checklist

Complete the shared technical foundation first. Page IDs remain stable; their numeric order is
not the build order. The landing is last so it can use screenshots of completed app features.

- [ ] PAGE-02 — [Login](#page-02-login)
- [ ] PAGE-03 — [Registration](#page-03-registration)
- [ ] PAGE-04 — [Dashboard](#page-04-dashboard)
- [ ] PAGE-05 — [Business profile](#page-05-business-profile)
- [ ] PAGE-06 — [Customers](#page-06-customers)
- [ ] PAGE-07 — [Services](#page-07-services)
- [ ] PAGE-08 — [Invoices](#page-08-invoices)
- [ ] PAGE-10 — [Invoice detail](#page-10-invoice-detail)
- [ ] PAGE-09 — [Create invoice](#page-09-create-invoice)
- [ ] PAGE-01 — [Home](#page-01-home)

## Page inventory

| ID | Page / branch suffix | Route | Access | Primary outcome |
| --- | --- | --- | --- | --- |
| PAGE-02 | Login / `login` | `/login` | Guest | Start a session and continue |
| PAGE-03 | Registration / `signup` | `/signup` | Guest | Create an account and start a session |
| PAGE-04 | Dashboard / `dashboard` | `/dashboard` | Authenticated | See setup progress and recent work |
| PAGE-05 | Business profile / `business-profile` | `/business-profile` | Authenticated | Save seller information |
| PAGE-06 | Customers / `customers` | `/customers` | Authenticated | Maintain reusable customer details |
| PAGE-07 | Services / `services` | `/services` | Authenticated | Maintain reusable service prices |
| PAGE-08 | Invoices / `invoices` | `/invoices` | Authenticated | Find and open an invoice |
| PAGE-10 | Invoice detail / `invoice-detail` | `/invoices/$invoiceId` | Authenticated | Inspect snapshots and download the PDF |
| PAGE-09 | Create invoice / `invoice-create` | `/invoices/create` | Authenticated | Submit an invoice with editable snapshots |
| PAGE-01 | Home / `home` | `/` | Public | Understand the product and register |

## Progress and continuation

This is the only active queue. The former [stream A](PAGES-A.md) and [stream B](PAGES-B.md)
files preserve historical assignments only; their design requests do not count as implementation.
No page has verified implementation/integration evidence recorded here yet; all remain unchecked.

Statuses: `Todo`, `Building`, `Verifying`, `Ready to integrate`, `Done`, `Blocked`.
Update the current page's row at each phase change. A checkbox requires implementation, relevant
tests, visual review of the built page, and integration. Keep the actual failure/blocker explicit.
Verified work still on a page branch stays `Ready to integrate`.

| Page | Status | Branch | Blocker / prerequisite | Verification / notes | Integrated commit | Next step |
| --- | --- | --- | --- | --- | --- | --- |
| PAGE-02 | `Todo` | `frontend/login` | Technical foundation pending | Not run; notes pending | None | Complete foundation, then implement login |
| PAGE-03 | `Todo` | `frontend/signup` | PAGE-02 integration pending | Not run; notes pending | None | After PAGE-02, implement this page |
| PAGE-04 | `Todo` | `frontend/dashboard` | PAGE-03 integration pending | Not run; notes pending | None | After PAGE-03, implement this page |
| PAGE-05 | `Todo` | `frontend/business-profile` | PAGE-04 integration pending | Not run; notes pending | None | After PAGE-04, implement this page |
| PAGE-06 | `Todo` | `frontend/customers` | PAGE-05 integration pending | Not run; notes pending | None | After PAGE-05, implement this page |
| PAGE-07 | `Todo` | `frontend/services` | PAGE-06 integration pending | Not run; notes pending | None | After PAGE-06, implement this page |
| PAGE-08 | `Todo` | `frontend/invoices` | PAGE-07 integration pending | Not run; notes pending | None | After PAGE-07, implement this page |
| PAGE-10 | `Todo` | `frontend/invoice-detail` | PAGE-08 integration pending | Not run; notes pending | None | After PAGE-08, implement this page |
| PAGE-09 | `Todo` | `frontend/invoice-create` | PAGE-10 integration pending | Not run; notes pending | None | After PAGE-10, implement this page |
| PAGE-01 | `Todo` | `frontend/home` | PAGE-09 integration pending | Not run; notes pending | None | Verify feature flow, capture app screenshots, then implement landing |

Add a link to `docs/design/<page-suffix>/NOTES.md` when created; do not invent a successful check
or commit. On interruption, record completed/remaining work and the exact next action there.
Resume unfinished work first. After integrating a verified page, tick it and proceed to the next
unchecked page in this order. Preserve existing branches and inspect prior work before reusing it.

## Rules shared by every page

- Use shadcn/ui components. The shared sidebar on every authenticated page must start from
  `sidebar-01`; see [required blocks and commands](conventions/FRONTEND.md#required-shadcn-blocks).
- One clear heading, short supporting copy, explicit primary action, and semantic navigation.
- Light theme; existing Inter font and shadcn primitives. Use consistent shared tokens, refined in the implementation.
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
- Implement loading skeletons, populated success, empty data, filtered-no-results, recoverable error,
  and not-found states where applicable. Forms also need invalid, saving, failed-save, and saved states.
  Keep existing data visible during background refresh and explain refresh failures inline.
- Error messages identify a recovery action; toasts are supplementary. Use visible focus,
  accessible labels, named icon actions, dialog focus trapping/restoration, and announced feedback.
- English resource keys hold application copy. Display dates and EUR through Intl; serialize
  date-only values using calendar parts, never UTC conversion. Server totals remain authoritative.
- Shared 404 boundary provides a useful return link. Invoice/PDF absence must not expose ownership.

## Detailed page specifications

## PAGE-02: Login

- Required UI starting point: shadcn `login-01` (`npx shadcn@latest add login-01` from `src/frontend`).
  Adapt the block to the fields, validation, and behavior below using React Hook Form and Zod.
- Content: focused sign-in form, email, password, password visibility toggle, and signup link.
  Start email/password empty; omit remember-me and password-reset UI from this release.
- Email is required and valid; password is required. Do not apply registration complexity rules
  to login, because existing users must be able to submit their current credentials.
- Submit `POST /api/auth/login`, then refresh `GET /api/auth/me` before guarded navigation.
  Continue to the safe return path or `/dashboard`. Signed-in visitors skip the form.
- Invalid credentials produce a generic root error; transport/server failures offer retry without
  erasing inputs. If login succeeds but session retrieval fails, show that failure rather than success.
- Google sign-in is omitted from the approved baseline until a separate configured flow is specified.
- Desktop/tablet can pair the form with the shared visual; mobile prioritizes the form and its labels.
- Acceptance: invalid input prevents submit; Enter submits once; password toggle is accessible;
  no password is logged/persisted by demo code; session refresh and safe redirects are tested.

## PAGE-03: Registration

- Required UI starting point: shadcn `signup-01` (`npx shadcn@latest add signup-01` from `src/frontend`).
  Adapt the block to the fields, validation, and behavior below using React Hook Form and Zod.
- Fields: first name, last name, email, password, confirm password; all start empty and are required.
- Trim names/email, never passwords. Match the current registration baseline: minimum six password
  characters with lowercase, uppercase, digit, and symbol; confirmation must match. Show requirements
  beside the password field. Keep backend policy authoritative and surface server validation.
- Submit `POST /api/auth/register` without confirmPassword; refresh `/api/auth/me` before continuing
  to a safe retained return path or `/dashboard`. Existing-account errors appear at field/root level.
- Link back to login while preserving a safe return path. No fake terms/privacy links or acceptance
  checkbox for documents the product does not actually provide.
- Use the login layout, illustration direction, control sizes, and responsive behavior.
- Acceptance: mismatch prevents submission, confirmation never reaches the API, duplicate submission
  is blocked, server errors retain input, successful registration establishes the session first.

## PAGE-04: Dashboard

- Build the shared authenticated sidebar from shadcn `sidebar-01`
  (`npx shadcn@latest add sidebar-01` from `src/frontend`); all protected routes reuse this layout.
- Load profile, customers, services, and invoice summaries through their existing feature queries;
  no new analytics endpoint. A missing profile is setup-required, not an application crash.
- Show greeting, profile setup callout, active customer/service counts, invoice count, and the five
  newest invoices. Counts describe their actual data; do not label invoice totals as paid revenue.
- Primary action is `Create invoice`; if profile is missing, explain and link to profile setup.
  Secondary actions lead to customers/services and all invoices. Recent rows link to invoice detail.
- With no data, show useful setup actions and a restrained document illustration; never populate
  chart placeholders. Each independently loaded section can recover without hiding healthy sections.
- Desktop: balanced overview with a prominent recent-invoices section; mobile: setup/action first,
  compact summaries next, recent invoices below. All values come from query results.
- Acceptance: counts/recent rows change after relevant mutations; archived records are excluded
  from active counts; first-use, partial failure, loading, and populated variants are covered.

## PAGE-05: Business profile

- Load `GET /api/business-profile`; `404` initializes a blank setup form. Other failures show retry.
- Fields: businessName, email, addressLine1, optional addressLine2, postalCode, city, countryCode.
  Use the contract limits below; mark required fields and explain that these are seller details.
- Save through `PUT /api/business-profile`; show inline errors and success confirmation, keep saved
  values visible, and invalidate profile/dashboard queries. No logo upload or multiple profiles.
- A callout explains that edits affect future invoices, not existing invoice/PDF snapshots.
- Support a validated internal `returnTo` when arriving from invoice creation; after saving, provide
  an explicit `Continue to invoice` action when that return path was supplied.
- Desktop groups business/contact and address fields; mobile stacks fields with full-width save.
- Acceptance: missing-profile initialization, first save, update, invalid country/email, failed save,
  dirty navigation, and unchanged historical snapshots all have verification scenarios.

## PAGE-06: Customers

- List name, optional email, address, active/archive state, and named row actions. Default to active
  customers ordered by name then ID. Search name/email; filter Active/Archived/All; sort name A-Z/Z-A.
- Keep validated search/filter/sort in URL state. Filter locally from the list response; distinguish
  no customers from no matching results and offer `Add customer` or `Clear filters` respectively.
- `Add customer` and `Edit` open the same responsive sheet: name, optional email, address textarea.
  Use empty create defaults and selected-record edit defaults. Do not add a separate detail route.
- Save via create/update contracts below; close only after success, invalidate customers/dashboard,
  and confirm success. Archived rows are read-only and excluded from new invoice selections.
- Archive requires confirmation explaining that old invoices remain unchanged. Do not optimistically
  hide a record before success. No permanent delete or restore action is part of this release.
- Desktop uses a readable table; mobile uses labeled summary rows and a full-width form sheet.
- Acceptance: add/edit/archive persistence, cancellation, pending/error feedback, URL filter restore,
  empty/no-results states, and customer edits not changing existing invoices are covered.

## PAGE-07: Services

- Reuse the customer overview interaction pattern, without building a generic CRUD framework.
  Columns: name, description, default EUR unit price, archive state, and named actions.
- Search name/description; Active/Archived/All filter; name A-Z/Z-A sort; default active/name A-Z.
- Create/edit sheet fields: name, optional description, defaultUnitPrice. Initial price is `0`;
  empty/invalid numeric input must not silently become zero. Enforce documented nonnegative limits.
- Use service create/update/archive contracts below. Archived services are read-only and cannot be
  newly selected; changing prices never rewrites existing invoice line snapshots.
- Save/archive feedback, confirmations, responsive behavior, and cache invalidation follow customers.
- Acceptance: zero price, invalid negative price, optional description, save failure, search/filter,
  archive confirmation, and editable copied service values on invoice creation are covered.

## PAGE-08: Invoices

- Load `GET /api/invoices`. Show invoice number, customer, issue/due dates, EUR total, and detail link.
  Primary action: `Create invoice`. Download lives on detail to keep row actions unambiguous.
- Search invoice number/customer; inclusive issue-date From/To filter; sort issue date newest/oldest,
  customer A-Z, or total high/low. Default is API newest-created order; ID breaks sorting ties.
- Store validated filters in URL state; invalid date ranges show a correction message. Search and
  sorting operate locally on returned summaries; no pagination or server filter API is added.
- Empty account offers create action; no matches offers clear filters; failed fetch offers retry.
  Do not add status badges, edit/delete actions, bulk operations, or fake PDF/financial analytics.
- Mobile rows preserve invoice number, customer, dates, total, and a clear detail link.
- Acceptance: filter combinations, deterministic sort, clear/reset, URL restoration, empty/error,
  long customer names, and new invoice appearing after creation are verified.

## PAGE-10: Invoice detail

- Load `GET /api/invoices/{id}` with the route ID. Show heading/number, issue/due dates, seller and
  customer snapshots, ordered lines, EUR totals, optional notes, back link, and PDF availability.
- Values come entirely from invoice detail, not current profile/customer/service queries. Missing
  optional email/notes are omitted cleanly; long addresses/descriptions wrap without truncating meaning.
- When hasPdf is true, the download action targets `/api/invoices/{id}/pdf`; browser follows the
  authorized redirect. No signed URL/private key is cached in React state or rendered in the page.
- Open download in a separate tab with appropriate link semantics so detail remains usable on an
  HTTP error. Do not show a success toast: browser download completion is not observable here.
  When hasPdf is false, show `PDF unavailable` and a refresh-details action instead of a dead link.
- Missing/foreign records share a not-found state and return link; invalid ID never starts a fetch.
  Server failures show retry. No invoice edit/delete/send/mark-paid or embedded live-PDF editor.
- Desktop uses a document layout with distinct download area; mobile stacks seller/customer and
  labeled line items, keeping quantity, price, line total, and grand total accessible.
- Acceptance: full snapshot, optional omissions, long/many lines, missing/foreign/invalid IDs,
  hasPdf false, owner download redirect, and available/unavailable demo PDF scenarios are verified.

## PAGE-09: Create invoice

- Load profile, active customers, and active services. Missing profile blocks submission with a
  setup link carrying `returnTo=/invoices/create`; empty customer/service lists permit manual entry.
  Customer/service fetch errors allow retry and manual entry; profile errors block seller validation.
- Sections: read-only current seller details; customer selection/manual snapshot fields; invoice
  dates; editable line items; optional notes; preview total and primary `Create invoice` action.
- Defaults: local today for issueDate, today plus 14 calendar days for dueDate, EUR fixed, blank
  customer/notes, one blank line with quantity `1` and unitPrice `0`.
- Selecting a customer copies name/email/address into editable form fields. Keep selection form-only;
  submit the snapshot fields, not a customer ID. Confirm before replacing dirty customer fields.
- Use React Hook Form `useFieldArray`, stable row keys, one to 100 lines. Selecting a service copies
  its ID, name into description, and default price. Description/price remain editable. Switching to
  manual removes the service ID while preserving entered description/price. Never remove the last line.
- Validate dueDate >= issueDate, required customer/address/description, quantity > 0 with at most
  three decimal places, and price >= 0 with at most two. Apply Requirements text/range limits.
- Show line and grand-total previews; do not send totals, seller, owner, invoice number, status,
  tax, storage fields, or form-only selectors. Send the existing CreateInvoiceRequest contract.
- Explain that creation produces a finalized snapshot; do not offer save draft. During submit show
  `Creating invoice...`, prevent duplicates, retain values on validation/render/upload/network errors.
  Do not automatically retry this mutation; a network failure may have occurred after creation.
- Success invalidates invoice queries and navigates to the returned invoice ID; detail shows the
  response totals. No real PDF generation or successful backend persistence is claimed in mock mode.
- Desktop uses form plus summary; tablet moves summary below fields; mobile stacks labeled line
  controls and actions. Sticky elements must not cover focused inputs, errors, or the last line.
- Acceptance: manual and selected data, fractional quantities, row add/remove, dirty overwrite,
  missing profile, validation mapping, two timezone directions, exact request shape, failed submit,
  success navigation, and historical snapshot independence are all tested.

## PAGE-01: Home

- Purpose: explain reusable services/customer details -> invoice creation -> PDF retrieval.
- Content: header with login/register links; concise hero with primary `Create account` action;
  responsive screenshots of implemented app features; three brief workflow steps; closing signup action and footer.
- Build this page last after the other nine pages and their integrated feature flow are verified.
  Capture the actual invoice/customer/service UI with fictitious records, store responsive screenshot
  assets with explicit dimensions/alt text, and retain headings, explanations, and CTAs in HTML.
  Never invent testimonials, compliance badges, pricing plans, integrations, payment tracking, or statistics.
- The home route stays public for signed-in users; replace account CTAs with `Open dashboard`.
  Session errors must not hide the public content; provide an unobtrusive retry for session controls.
- No business-data request is needed. A decorative image failure leaves readable content/actions.
- Mobile: recompose the hero vertically and crop/reflow app screenshots for legibility; avoid giant empty hero space.
- Acceptance: all CTAs resolve; signed-in/guest navigation works; no fabricated loading or empty
  business-data screen is added to this static page; image dimensions prevent layout jumps; screenshots
  show the actual built features rather than generated screens or outdated prototype behavior.

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
