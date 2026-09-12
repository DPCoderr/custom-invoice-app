# Page stream A

## Ordered completion checklist

- [ ] PAGE-01 — [Home](#page-01-home)
- [ ] PAGE-02 — [Login](#page-02-login)
- [ ] PAGE-03 — [Registration](#page-03-registration)
- [ ] PAGE-05 — [Business profile](#page-05-business-profile)
- [ ] PAGE-07 — [Services](#page-07-services)

Read [shared rules/contracts](PAGES.md), the [workflow](FRONTEND-WORKFLOW.md), and the active
[ticket](TASKS.md) first. The other concurrent stream is [stream B](PAGES-B.md).
This stream owns the public layout. Maximum one owned page chat in this stream and two total;
a chat waiting for approval or integration still occupies its slot. All pages start unchecked.

Check a page only after design approval, implementation, tests, visual review, and integration.
Use `Ready to integrate` for verified work still on its page branch. Follow the workflow's
claim/resume rules; do not start from this file in a stale worktree without checking current ownership.

## Progress records

Statuses: `Todo`, `Designing`, `Awaiting approval`, `Building`, `Verifying`,
`Ready to integrate`, `Done`, `Blocked`. Keep these records and the checklist synchronized.
At interruption, record completed work, remaining work, blocker, and an exact next-chat instruction
in the page handoff; update the next-step field here with its link. Never tick existing mockups as done.

### PAGE-01 tracking

- Status: `Todo`; owner chat: unassigned; planned branch: `frontend/home`; worktree: unassigned.
- Dependencies: Foundation and visual gates; blocker: shared gates pending (see workflow); later prerequisites must also be integrated.
- Handoff/designs: pending; expected brief `docs/design/home/HANDOFF.md`. Add actual links and approval evidence when created.
- Verification: not run; integrated commit: none; next step: satisfy dependencies, then claim and prepare the page brief.

### PAGE-02 tracking

- Status: `Todo`; owner chat: unassigned; planned branch: `frontend/login`; worktree: unassigned.
- Dependencies: PAGE-01; blocker: shared gates pending (see workflow); later prerequisites must also be integrated.
- Handoff/designs: pending; expected brief `docs/design/login/HANDOFF.md`. Add actual links and approval evidence when created.
- Verification: not run; integrated commit: none; next step: satisfy dependencies, then claim and prepare the page brief.

### PAGE-03 tracking

- Status: `Todo`; owner chat: unassigned; planned branch: `frontend/signup`; worktree: unassigned.
- Dependencies: PAGE-02; blocker: shared gates pending (see workflow); later prerequisites must also be integrated.
- Handoff/designs: pending; expected brief `docs/design/signup/HANDOFF.md`. Add actual links and approval evidence when created.
- Verification: not run; integrated commit: none; next step: satisfy dependencies, then claim and prepare the page brief.

### PAGE-05 tracking

- Status: `Todo`; owner chat: unassigned; planned branch: `frontend/business-profile`; worktree: unassigned.
- Dependencies: PAGE-03 and stream B PAGE-04; blocker: shared gates pending (see workflow); later prerequisites must also be integrated.
- Handoff/designs: pending; expected brief `docs/design/business-profile/HANDOFF.md`. Add actual links and approval evidence when created.
- Verification: not run; integrated commit: none; next step: satisfy dependencies, then claim and prepare the page brief.

### PAGE-07 tracking

- Status: `Todo`; owner chat: unassigned; planned branch: `frontend/services`; worktree: unassigned.
- Dependencies: PAGE-05; blocker: shared gates pending (see workflow); later prerequisites must also be integrated.
- Handoff/designs: pending; expected brief `docs/design/services/HANDOFF.md`. Add actual links and approval evidence when created.
- Verification: not run; integrated commit: none; next step: satisfy dependencies, then claim and prepare the page brief.

## Detailed page specifications

## PAGE-01: Home

- Purpose: explain reusable services/customer details -> invoice creation -> PDF retrieval.
- Content: header with login/register links; concise hero with primary `Create account` action;
  responsive invoice-paper visual; three brief workflow steps; closing signup action and footer.
- Keep the existing professional invoice-paper reference as design input. Never invent testimonials,
  compliance badges, pricing plans, integrations, payment tracking, or usage statistics.
- The home route stays public for signed-in users; replace account CTAs with `Open dashboard`.
  Session errors must not hide the public content; provide an unobtrusive retry for session controls.
- No business-data request is needed. A decorative image failure leaves readable content/actions.
- Mobile: recompose the hero vertically, preserve document legibility, avoid giant empty hero space.
- Acceptance: all CTAs resolve; signed-in/guest navigation works; no fabricated loading or empty
  business-data screen is added to this static page; image dimensions prevent layout jumps.

## PAGE-02: Login

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
