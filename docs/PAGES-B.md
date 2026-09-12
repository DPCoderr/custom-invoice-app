# Page stream B

## Ordered completion checklist

- [ ] PAGE-04 — [Dashboard](#page-04-dashboard)
- [ ] PAGE-06 — [Customers](#page-06-customers)
- [ ] PAGE-08 — [Invoices](#page-08-invoices)
- [ ] PAGE-10 — [Invoice detail](#page-10-invoice-detail)
- [ ] PAGE-09 — [Create invoice](#page-09-create-invoice)

Read [shared rules/contracts](PAGES.md), the [workflow](FRONTEND-WORKFLOW.md), and the active
[ticket](TASKS.md) first. The other concurrent stream is [stream A](PAGES-A.md).
This stream owns the protected app layout. Maximum one owned page chat in this stream and two total;
a chat waiting for approval or integration still occupies its slot. All pages start unchecked.

Check a page only after design approval, implementation, tests, visual review, and integration.
Use `Ready to integrate` for verified work still on its page branch. Follow the workflow's
claim/resume rules; do not start from this file in a stale worktree without checking current ownership.

## Progress records

Statuses: `Todo`, `Designing`, `Awaiting approval`, `Building`, `Verifying`,
`Ready to integrate`, `Done`, `Blocked`. Keep these records and the checklist synchronized.
At interruption, record completed work, remaining work, blocker, and an exact next-chat instruction
in the page handoff; update the next-step field here with its link. Never tick existing mockups as done.

### PAGE-04 tracking

- Status: `Todo`; owner chat: unassigned; planned branch: `frontend/dashboard`; worktree: unassigned.
- Dependencies: Foundation and visual gates; blocker: shared gates pending (see workflow); later prerequisites must also be integrated.
- Handoff/designs: pending; expected brief `docs/design/dashboard/HANDOFF.md`. Add actual links and approval evidence when created.
- Verification: not run; integrated commit: none; next step: satisfy dependencies, then claim and prepare the page brief.

### PAGE-06 tracking

- Status: `Todo`; owner chat: unassigned; planned branch: `frontend/customers`; worktree: unassigned.
- Dependencies: PAGE-04; blocker: shared gates pending (see workflow); later prerequisites must also be integrated.
- Handoff/designs: pending; expected brief `docs/design/customers/HANDOFF.md`. Add actual links and approval evidence when created.
- Verification: not run; integrated commit: none; next step: satisfy dependencies, then claim and prepare the page brief.

### PAGE-08 tracking

- Status: `Todo`; owner chat: unassigned; planned branch: `frontend/invoices`; worktree: unassigned.
- Dependencies: PAGE-06; blocker: shared gates pending (see workflow); later prerequisites must also be integrated.
- Handoff/designs: pending; expected brief `docs/design/invoices/HANDOFF.md`. Add actual links and approval evidence when created.
- Verification: not run; integrated commit: none; next step: satisfy dependencies, then claim and prepare the page brief.

### PAGE-10 tracking

- Status: `Todo`; owner chat: unassigned; planned branch: `frontend/invoice-detail`; worktree: unassigned.
- Dependencies: PAGE-08; blocker: shared gates pending (see workflow); later prerequisites must also be integrated.
- Handoff/designs: pending; expected brief `docs/design/invoice-detail/HANDOFF.md`. Add actual links and approval evidence when created.
- Verification: not run; integrated commit: none; next step: satisfy dependencies, then claim and prepare the page brief.

### PAGE-09 tracking

- Status: `Todo`; owner chat: unassigned; planned branch: `frontend/invoice-create`; worktree: unassigned.
- Dependencies: PAGE-10, PAGE-06, and stream A PAGE-05/PAGE-07; blocker: shared gates pending (see workflow); later prerequisites must also be integrated.
- Handoff/designs: pending; expected brief `docs/design/invoice-create/HANDOFF.md`. Add actual links and approval evidence when created.
- Verification: not run; integrated commit: none; next step: satisfy dependencies, then claim and prepare the page brief.

## Detailed page specifications

## PAGE-04: Dashboard

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
