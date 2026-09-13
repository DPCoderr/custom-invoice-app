# Frontend-first delivery workflow

## Direct implementation with Astra-high

Use GPT-6 Astra (`gpt-6-astra`) with reasoning `high` for frontend work. Read [Pages](PAGES.md),
[Requirements](REQUIREMENTS.md), [Frontend conventions](conventions/FRONTEND.md), and the active
[ticket](TASKS.md). This is the active workflow from 2026-09-13; earlier workflow tickets and
design-generation records are historical. Updating these documents does not switch the current
chat's configured model or stop an existing external task.

- Work on one page at a time in the current chat. Do not create separate page agents, page chats,
  parallel workstreams, or a coordinator task.
- Implement directly from the detailed page specification. No generated mockups, advance design
  approval, or separate visual approval gate is required before coding.
- Establish and refine shared typography, colors, spacing, and component patterns in the actual
  implementation, starting with login and then the protected dashboard shell. Maintain a professional
  light theme, responsive layouts, accessible controls, and consistent shared tokens.
- Build the necessary technical foundation first: contracts/fixtures, HTTP mocks, English resources,
  and shared form/query/error helpers. Implement missing prerequisites as small tickets rather than
  waiting for an obsolete design task. Keep backend changes outside this frontend-only track.
- Use one branch per page, `frontend/<page-suffix>`, from the current integrated base. A page may
  contain multiple reviewable tickets; keep each ticket around 500 reviewed changed lines or less.
  Reuse existing page work safely after inspecting its branch/worktree; never reset unrelated work.
- Implement, verify, and integrate the current page before starting the next. Check the actual
  rendered page at mobile/tablet/desktop sizes, refine it, and show the working result to the user.
  A user-requested redesign is a subsequent scoped change, not a mandatory pre-implementation step.
- Keep functional requirements, English UI copy, shadcn, React Query, React Hook Form, Zod via
  zodResolver, and the existing feature-owned code structure. Preserve historical invoice snapshots.
- Use the [required shadcn blocks](conventions/FRONTEND.md#required-shadcn-blocks): `sidebar-01`
  for the shared authenticated sidebar, `login-01` for login, and `signup-01` for registration.

## One queue and completion records

[PAGES.md](PAGES.md) is the only active queue and progress source. Preserve page IDs and use this order:
Login -> Registration -> Dashboard/protected shell -> Business profile -> Customers -> Services ->
Invoices -> Invoice detail -> Create invoice -> Home/landing.

- Statuses: `Todo`, `Building`, `Verifying`, `Ready to integrate`, `Done`, `Blocked`.
  Track the page branch, blocker, verification/notes, integrated commit, and exact next action.
- Start by reading the current queue and any implementation notes. Resume unfinished work before
  starting a new page; verify actual branch state rather than assuming a previous chat completed it.
- A page checkbox means implementation, relevant tests, visual inspection, and integration passed.
  Verified work remaining on its branch is `Ready to integrate`, not `Done`.
- On interruption, record what is complete, what remains, failed/unrun checks, and the exact next step.
  A later conversation can resume these notes if needed; do not create per-page conversations.
- The earlier A/B files are historical pointers, not active ownership ledgers or execution queues.
  Their recorded design requests do not establish implementation progress or prove tasks stopped.
- Initial technical foundation status: pending verification/remaining foundation tickets. Record
  evidence in TASKS.md when implemented; do not claim the original backend FE/QA tickets pass from mocks.

## Implementation notes and landing assets

Maintain concise notes at `docs/design/<page-suffix>/NOTES.md` during implementation. Record relevant
layout/component decisions, any clarified behavior, screenshots of the built page, verification
commands/results, branch/integrated commit, and remaining work. Link the actual notes from the queue
once created. Existing HANDOFF.md files, if any, remain optional historical input; completing a
design handoff template is not a prerequisite. The detailed page specification still defines fields,
validation, interactions, contracts, responsive behavior, required states, and acceptance scenarios.

Build the landing last, after the feature pages and their integrated mock flow are verified.
Capture screenshots from the running app using fictitious example records; show real implemented
features, not invented/generated app screens. Store selected captures as project assets with useful
responsive sizes, explicit dimensions, and appropriate alt text. Reflow/crop for legibility and keep
surrounding headings, explanations, and CTAs in HTML. Existing images remain optional references;
they do not substitute for current app screenshots on the landing.

## Mock boundary and later backend connection

- Feature API functions keep relative `/api` URLs and the shared cookie-aware client. React Query
  owns server state; React Hook Form + Zod + zodResolver own all data-entry forms.
- Add MSW behind an explicit mock launch mode; initialize it before the router/session query.
  JSON fixtures seed a small demo store, never import fixtures into page components.
- Provide a future `npm run dev:mock` command that works without Aspire/backend dependencies.
  Keep real integration mode under Aspire and retain the missing-API-target check in that mode.
- Persist only fictitious demo records/session identity locally using a versioned namespace and
  reset control. Never persist submitted passwords; demo authentication is a simulation.
- Mock reads and writes must agree: create/edit/archive/list/detail survive navigation and refresh.
  Copy invoice snapshots on creation; response totals are calculated by the mock handler, not supplied
  by form submission. Demo calculations are not proof of backend decimal precision or correctness.
- Include selectable loading, empty, populated, validation, 401, 404, 409, 500, and network scenarios
  through a development-only control. Fail unhandled `/api` requests visibly; do not call live APIs
  accidentally from mock mode. Tests reset state between cases.
- Use a clearly identified static example PDF for the mock download flow; do not pretend that it
  matches dynamically created invoices. The real contract remains an authorized 302 download.
- Normal production builds never activate mocking or ship demo controls/fixtures/worker assets.
  Verify both artifact contents and startup behavior; a separately labeled demo build is optional.
- Later, disable mocks and implement the same contracts. Integration checks still need to prove
  cookie behavior, ownership, persistence, authoritative totals, PDF generation, and download errors.

## Completion evidence

- Documentation: resolve relative Markdown links, inspect diff/scope, and run `git diff --check`.
- Frontend tickets: `npm run build`, `npm run lint`, `npx tsc --noEmit`, and relevant Vitest tests.
  Run the complete frontend tests for the final integrated workflow; explain warnings/failures.
- Check mobile/tablet/desktop screenshots, 320px and zoom reflow, keyboard/focus, and all required states.
  Test behavior rather than shadcn internals; cover schemas, request mappers, mutations, and navigation.
- Integrated demo: register/login -> profile -> customer/service -> create -> list -> detail ->
  example PDF; also verify logout/session expiry, failures, local persistence, and reset.
- Record `Frontend verified with mocks` separately from `Backend integration not verified`.
  Passing frontend tests alone does not make the full product production-ready.
