# Project agent instructions

## Read first

- Read `README.md`, `docs/ARCHITECTURE.md`, and the relevant ticket in `docs/TASKS.md`.
- For backend work, also read `docs/conventions/BACKEND.md`.
- For frontend work, also read `docs/conventions/FRONTEND.md`.
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
