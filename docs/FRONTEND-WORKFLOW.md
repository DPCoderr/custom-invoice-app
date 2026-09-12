# Frontend-first delivery workflow

## Purpose and boundaries

Complete the agreed frontend using HTTP mocks, then let the owner implement the backend manually.
Read [Pages](PAGES.md), [Requirements](REQUIREMENTS.md), [Frontend conventions](conventions/FRONTEND.md),
and the active [ticket](TASKS.md). No page implementation or image generation happens in the
documentation ticket. Do not mark the original backend-dependent FE/QA tickets complete from mocks.

## Models, tasks, branches, and approval

1. Finish shared technical foundation tickets first: contracts/fixtures and HTTP mocking, English
   resources, then common query/form/state infrastructure. Split into <=500 reviewed-line tickets.
   Obtain approval of the shared visual foundation before starting the two page streams.
2. Use one visible Codex task per page, initially `gpt-5.6-sol` with reasoning `medium`.
   These are user-visible page conversations, not hidden page subagents reporting only to a parent.
   Run at most two owned page chats at once: one in [stream A](PAGES-A.md), one in [stream B](PAGES-B.md).
   Waiting for approval or integration occupies the page's slot; never fill it with a third page chat.
3. Each task uses its own worktree and branch `frontend/<page-suffix>` from the page inventory.
   Start from the current integrated base. Stream A owns the public layout; B owns the protected
   app layout. Coordinate shared files before editing; integrate shared changes one at a time.
   Preserve user changes; do not reset branches or launch every page concurrently.
4. Sol prepares the full page handoff below and generates mockups with the built-in image generator.
   It has no explicit model selector: never claim a guaranteed GPT Image 2.5 model or silently use
   a paid API/CLI fallback. Retain prompts, chosen image paths, and revision identifiers.
5. Present mobile (390px), tablet (768px), and desktop (1440px) compositions plus each applicable
   state. Generate separate readable variants; a tiny contact sheet alone is insufficient for review.
6. Ask for explicit approval of the concrete page design and functional brief. Stop implementation
   while awaiting approval; silence, old reference assets, and approval of another page do not count.
7. After approval, change the same page task to `gpt-5.6-luna` with reasoning `max` for implementation.
   If the requested model/settings are unavailable, report that fact before substituting anything.
8. Luna implements only the approved page and scoped shared changes, then verifies functionality
   and compares actual browser screenshots with approved mockups at all three viewport sizes.
9. Keep each page on its own branch even when split into multiple small tickets. Integrate verified
   work before starting dependent pages; record commit/branch and test evidence in the handoff.
   Mark the stream checkbox only after integration. Then a fresh chat can pick the next ready page.

## Shared gates and ownership ledger

| Gate | Current status | Evidence required to open |
| --- | --- | --- |
| Technical foundation | Pending | Integrated contracts/fixtures, MSW mode, English resources, form/query/error helpers; passing foundation checks and commit recorded here |
| Visual foundation | Pending | Explicit user approval of shared typography, colors, spacing, controls, and responsive direction; links/revision/approval recorded here |

Initial state: no page is claimed and neither stream is ready to start. Update the gates and affected
page blockers from actual evidence, not merely because this workflow exists. Once open, use these orders:

- A: Home -> Login -> Registration -> Business profile -> Services.
- B: Dashboard -> Customers -> Invoices -> Invoice detail -> Create invoice.
- Business profile also waits for B's integrated Dashboard/protected shell. Create invoice also
  waits for integrated Business profile, Customers, Services, and Invoice detail.
- A single coordinator serializes claims, shared infrastructure changes, and integration. Stream
  chats send progress updates for that coordinator to record in the current integrated checkout's
  stream files; those records are authoritative, not stale copies in page worktrees.
- Only the coordinator updates the gate/ownership ledger. Do not overwrite newer progress when
  integrating an older branch. Page chats own their code, designs, and page HANDOFF.md.
- Record current integrated base branch/commit when opening the gates. New worktrees use that
  latest base; running pages incorporate required shared changes before final verification.
- Claims require recording the owner chat ID, page branch/worktree, status, and next action before
  page work starts. Do not derive ownership from a checkbox alone or claim a second page in a lane.

## How a new page chat picks up work

1. Read this workflow, shared PAGES.md, the assigned stream file, and the active ticket from the
   current integrated checkout. Confirm that both shared gates are open.
2. Check the recorded owner's actual chat state. A waiting/blocked owner retains its page; elapsed
   time does not release it. If activity cannot be determined, report the uncertainty without claiming.
3. Resume previously started work with no active owner after the coordinator records the transfer;
   otherwise take the first unchecked page with all dependencies integrated. Reuse its branch and
   handoff when resuming; do not create a duplicate implementation. Leave blocked work visible.
4. Have the coordinator record the claim before designing/building. Read existing approval and
   handoff evidence; preserve valid approvals and resume the appropriate Sol/Luna phase.
5. Report status at each phase transition. On interruption, save completed/remaining work, pending
   checks, blockers, and the exact next-chat instruction in HANDOFF.md; link it from the stream record.
6. Use `Ready to integrate` after page checks pass on its branch. After serialized integration and
   relevant integration checks, record evidence/commit, set `Done`, tick the checkbox, and release
   the slot. A checked page must always have approval, test, visual-review, and integration evidence.

Recheck the complete flow after both streams finish. Links to planned pages remain recorded as
pending until integration. These queue rules do not authorize page work during documentation tickets.

## Required Sol-to-Luna handoff

Store one brief at `docs/design/<page-suffix>/HANDOFF.md`, alongside references and approval notes.
Fill every field with concrete information; write `Not applicable` with a reason where appropriate.
Luna must not start with only a screenshot or a link to this checklist.

| Section | Required information |
| --- | --- |
| Identity | Page ID, ticket IDs, branch/base commit, route/search params, access rules, dependencies, implementation status |
| User outcome | Audience, entry paths, primary task, success destination, explicit non-goals |
| Layout and content | Ordered sections, exact English copy/resource keys, primary/secondary actions, data labels, icon meanings |
| Design references | Approved image per viewport/state, filenames/revisions, prompts, shared tokens, approval message/date and exact scope |
| Component mapping | Existing shadcn/form/layout primitives, feature components, missing primitives to add, shared component ownership |
| Forms | Every field's name/type/label/default, required/optional rules, Zod constraints/cross-field rules, RHF ownership, field-array behavior |
| Interactions | Click/submit/keyboard behavior for each action, pending/disabled conditions, focus changes, confirmations, dirty-data handling |
| Data flow | Request/response examples, HTTP method/path/status, query keys/options, mutation invalidation, form-to-request mapper |
| States | Trigger, rendered content, available recovery/action, preserved data, and matching fixture for every applicable state |
| Responsive behavior | Section order, table-to-row conversion, navigation, overlays, sticky behavior, wrapping, image crop/aspect ratio at each viewport |
| Assets | Final local asset paths, alt text/decorative treatment, dimensions, responsive variants; no baked-in functional text or buttons |
| Accessibility | Labels, tab order, focus/error announcements, contrast, keyboard interactions, reduced-motion handling where relevant |
| Verification | Concrete Given/When/Then cases, contract/interaction tests, screenshots to capture, commands and expected outcomes |
| Handoff constraints | Known backend gaps, integration dependencies, remaining unresolved decisions; zero blockers before implementation |

The page brief specializes its PAGES-A.md or PAGES-B.md specification and shared PAGES.md rules.
Do not merely duplicate those documents without details. Include filled and
empty examples, realistic long strings, and a failure example for each mutation. Explain exactly
what happens after success and failure, including which inputs remain. Unexpected implementation
decisions that change scope or approved design return to the owner for clarification.

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
- Check mobile/tablet/desktop screenshots, 320px and zoom reflow, keyboard/focus, and all agreed states.
  Test behavior rather than shadcn internals; cover schemas, request mappers, mutations, and navigation.
- Integrated demo: register/login -> profile -> customer/service -> create -> list -> detail ->
  example PDF; also verify logout/session expiry, failures, local persistence, and reset.
- Record `Frontend verified with mocks` separately from `Backend integration not verified`.
  Neither passing frontend tests nor an approved mockup makes the full product production-ready.
