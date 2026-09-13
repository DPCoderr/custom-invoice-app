# Project agent instructions

## Read first

- Read `README.md`, `docs/ARCHITECTURE.md`, and the relevant ticket in `docs/TASKS.md`.
- For backend work, also read `docs/conventions/BACKEND.md`.
- For frontend work, also read `docs/conventions/FRONTEND.md`.
- For frontend-first pages, read the central `docs/PAGES.md` checklist, `docs/FRONTEND-WORKFLOW.md`,
  and any existing page implementation notes. Implement directly; no advance mockup approval is required.
- More specific `AGENTS.md` files override these instructions within their directory.

## Working agreements

- Keep the architecture KISS and implement one vertical-slice ticket at a time.
- Target at most 500 human-reviewed changed lines per ticket. Generated migrations, lockfiles,
  and `routeTree.gen.ts` do not count, but must still be inspected for correctness.
- Preserve unrelated and uncommitted user changes. Never rewrite an existing migration.
- Do not claim a feature is working unless its endpoint, persistence, UI where required, and
  relevant verification have passed.
- Use English for documentation, identifiers, API contracts, and initial user-facing copy.
- Do not add tax, discounts, customers, payment workflows, recurring invoices, email delivery,
  or deployment work to an MVP ticket unless the ticket explicitly requires it.
- The frontend-first track explicitly includes customers and service editing/archiving through
  mocked contracts. It does not authorize backend implementation or completion claims from mocks.
- Use GPT-6 Astra (`gpt-6-astra`) with reasoning `high` for frontend work, one page at a time in
  the current chat. Do not create page agents or parallel page chats. Keep one branch per page.
- Follow the central queue; build the landing last using screenshots of implemented app features.
  Record notes and verification, and tick a page only after tests, visual review, and integration.

## Aspire workflow

- Treat `src/AppHost` as the local distributed-application entrypoint.
- Start it with `aspire start`, never `dotnet run` on the AppHost.
- Use `aspire wait <resource>` before interacting with a running resource.
- Inspect Aspire state and telemetry before guessing about runtime failures.
- Search Aspire docs/API docs before changing unfamiliar AppHost APIs.
- Never install the obsolete Aspire workload.

## Backend learning rule

- Default to coaching for backend requests: explain the contract, steps, edge cases, and tests,
  then review the user's implementation.
- Edit backend code only when the user explicitly asks for implementation.
- A general request to implement a full ticket counts as explicit permission only when that ticket
  clearly names backend files or backend behavior.

## Completion

- Run the checks required by the ticket and report commands that could not be run.
- Update documentation only when a contract, workflow, or current-status statement changed.
- Summarize changed behavior, verification, and any remaining risk without hiding known failures.
