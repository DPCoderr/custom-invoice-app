# Development guide

## Principles

- Work from one ticket in [TASKS.md](TASKS.md).
- Prefer a complete, small vertical slice over a wide partial refactor.
- Keep current behavior and target behavior clearly separated.
- Preserve user changes and inspect the working tree before editing.
- Backend work defaults to coaching unless implementation is explicitly requested.

## Prerequisites

Install:

- .NET 10 SDK;
- Aspire CLI 13.4-compatible tooling;
- Node.js and npm;
- Docker Desktop or another supported container runtime.

Confirm the main tools:

```powershell
dotnet --info
aspire --version
node --version
npm --version
docker version
```

Do not install the obsolete .NET Aspire workload.

## Restore

```powershell
dotnet restore src/MyApp.slnx
cd src/frontend
npm ci
```

Use `npm ci`, not `npm install`, when reproducing the committed dependency graph. A ticket that
intentionally changes packages may use `npm install <package>` and must include the lockfile.

## Secrets and configuration

The committed `appsettings.json` files contain keys but no credential values. Configure local
credentials through the API project's user-secrets store:

```powershell
dotnet user-secrets set "Google:ClientId" "<client-id>" --project src/backend/MyApp.Api/MyApp.Api.csproj
dotnet user-secrets set "Google:ClientSecret" "<client-secret>" --project src/backend/MyApp.Api/MyApp.Api.csproj
dotnet user-secrets set "Supabase:SupabaseUrl" "<project-url>" --project src/backend/MyApp.Api/MyApp.Api.csproj
dotnet user-secrets set "Supabase:SupabaseKey" "<server-side-key>" --project src/backend/MyApp.Api/MyApp.Api.csproj
```

Rules:

- do not put real secrets in appsettings, `.env`, documentation, HTTP scratch files, logs, or test
  snapshots;
- do not send the Supabase server key to Vite;
- do not log cookies, authorization headers, signed URLs, or full provider responses;
- validate required configuration at startup only when its feature is enabled.

## Start the distributed application

Run the AppHost rather than starting its .NET project directly:

```powershell
cd src/AppHost
aspire start
```

Current resource names are:

- `postgres` for the PostgreSQL server;
- `appdb` for the application database;
- `webapi` for `MyApp.Api`;
- `frontend` for the Vite development server.

The Aspire dashboard is the source of truth for allocated endpoints, health, logs, and traces.
For agent-driven work:

```powershell
aspire wait webapi
aspire wait frontend
aspire describe
aspire logs webapi
```

Do not manually poll health URLs. Do not restart the complete AppHost when a resource command or
framework watch process is sufficient.

### Frontend development boundary

Open the `frontend` endpoint reported by Aspire. The Vite development server proxies relative
`/api` requests to `webapi`; the current-user request uses this path as the integration proof.
`FND-004` migrates the remaining hardcoded calls while adding the shared request/error model.
Production hosting for the built frontend assets remains unresolved.

## Database and migrations

`Program.cs` currently calls `Database.MigrateAsync()` at API startup and seeds roles. This is
acceptable only as a temporary local-learning behavior. It is not the target production migration
strategy.

Migration rules:

1. Never modify or delete an existing committed migration.
2. Change entity configuration and create a new corrective migration.
3. Give the migration a behavior-based name, for example `CorrectInvoiceConstraints`.
4. Inspect both the generated migration and model snapshot.
5. Verify upgrade from the previous migration state and, where practical, downgrade behavior.
6. Keep generated migration volume outside the 500-line review target, but review every schema
   operation.

The current project has no design-time `AppDbContext` factory and receives `appdb` from Aspire.
Ticket `DATA-001` must establish and document one repeatable migration command before contributors
rely on `dotnet ef migrations add`. Do not invent or commit a local connection string as a
workaround.

## API documentation

In Development, use the API endpoint reported by Aspire:

- `/openapi/v1.json` for the OpenAPI document;
- `/scalar/v1` for Scalar;
- `/health` for readiness;
- `/alive` for liveness.

Scalar describes the API but is not the frontend type source in the MVP. Frontend DTOs remain
hand-written and are checked against documented JSON examples and integration tests.

## Verification

### Backend

```powershell
dotnet build src/MyApp.slnx
dotnet test src/MyApp.slnx
```

After the backend test project exists, prefer a focused test filter while iterating and run the
complete suite before completing a ticket.

### Frontend

```powershell
cd src/frontend
npm run build
npm run lint
npm run test
```

`npm run format` currently writes files; run it only when formatting changes are in scope. Review
the resulting diff.

### Documentation-only changes

Check:

- all relative Markdown links resolve;
- mentioned paths and commands match the repository;
- Mermaid blocks have balanced fences and valid diagram declarations;
- current-status language does not present target work as complete;
- `git diff --check` reports no whitespace errors;
- only intended documentation files changed.

## Working-tree safety

Before and after each ticket:

```powershell
git -c safe.directory='C:/Users/dppc2/Documents/Projects/custom-invoice-app' status --short
git -c safe.directory='C:/Users/dppc2/Documents/Projects/custom-invoice-app' diff --stat
```

The explicit `safe.directory` option is needed only in the Codex sandbox because its Windows user
does not own the checkout. Do not persist this setting globally just to silence the sandbox.

Known pre-documentation user change: `Features/Service/CreateService.cs` contains custom validation
messages. Preserve it unless a later ticket explicitly includes that code.

## Troubleshooting

### Aspire SDK cannot be resolved

If a sandbox build reports that it cannot read the host user's `NuGet.Config`, first determine
whether the API projects compiled. This is an environment permission failure, not evidence that
the AppHost source is invalid. Re-run from a normal user terminal with access to NuGet settings.

Do not install the obsolete Aspire workload. Restore the AppHost SDK/package through the normal
Aspire/.NET 10 toolchain.

### Login appears successful but `/me` returns `401`

Inspect the browser cookie, request origin, secure transport, `SameSite`, and CORS credentials.
The current app mixes an HTTP Vite origin with a cookie configured as `SameSite=None` and
`Secure=Always`; this is tracked by `AUTH-001`. Do not weaken production cookie policy as an
unreviewed local workaround.

### Frontend redirects to login during an API outage

The current user query converts fetch failures to `null`. `FND-004` changes the shared client so
only a real `401` represents an unauthenticated user; other failures reach an error boundary.

### Frontend lint fails

The current Biome schema version does not match the installed CLI and the project has accessibility
and unused-code diagnostics. Fix these under `FND-001`; do not disable recommended rules globally.

### Vitest reports no tests

That is the current baseline. Do not use `--passWithNoTests` as the final fix. `QA-001` adds actual
tests and makes an empty suite a failure again.

## Pull request or handoff checklist

- One ticket ID is named in the description.
- Behavior and non-goals match the ticket.
- The diff is reviewable and unrelated edits are absent.
- Ownership checks exist for all user-owned data paths.
- Relevant build, lint, and test results are included.
- Migration and generated files were inspected.
- Documentation and API examples were updated when contracts changed.
- Remaining risks and deferred work are stated explicitly.
