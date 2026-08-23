# Backend agent instructions

These instructions apply to `src/backend/MyApp.Api` and extend the repository root `AGENTS.md`.

- Follow `../../../docs/conventions/BACKEND.md` and the active ticket in
  `../../../docs/TASKS.md`.
- Default to coaching. Do not modify backend code unless the user explicitly requests backend
  implementation.
- Keep a small vertical slice in one file with nested request/response records, endpoint,
  validator, and handler. Split orchestration-heavy slices as described in the backend guide.
- Map protected feature routes under `/api`, require authorization, and filter every owned entity
  by the authenticated user ID.
- Accept `CancellationToken` in async handlers and pass it to EF Core and external I/O.
- Use `decimal` for money and quantity, `DateOnly` for invoice dates, and UTC for timestamps.
- Calculate invoice totals on the server. Never trust client-calculated totals or ownership.
- Return typed HTTP results and consistent Problem Details or validation responses.
- Do not add MediatR, repositories, generic service layers, or speculative abstractions for the
  learning MVP.
- Never edit an existing migration. Add a corrective migration after changing the EF model.
- Run focused backend tests and a build after explicitly authorized backend changes.
