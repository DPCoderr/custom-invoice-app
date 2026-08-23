# Invoice Generator

Invoice Generator is a learning-focused full-stack web application for creating reusable
services, turning those services into invoice lines, generating a PDF, and storing that PDF
privately. The application is intentionally kept small so that its backend can be learned and
built one vertical slice at a time.

> [!IMPORTANT]
> This project is an educational MVP. It is not yet suitable for real invoicing and does not
> claim tax, accounting, privacy, security, or Dutch legal compliance.

## Current status

The repository contains a foundation, not a finished invoice workflow.

| Area | Status | What exists today |
| --- | --- | --- |
| Authentication | Partial | Cookie authentication, register, login, logout, current-user, and Google endpoints exist. Error handling and deployment-safe cookie configuration still need work. |
| Aspire orchestration | Local foundation | PostgreSQL, pgAdmin, the API, and Vite are registered. Production frontend hosting remains undecided. |
| Services | Partial | The entity, migration, validation, and create endpoint exist. The route and response contract still need normalization; listing is missing. |
| Invoices | Scaffold only | Entities and an initial migration exist. Create, list, detail, and download endpoints are not functional. |
| PDF generation | Scaffold only | QuestPDF template code exists but is commented out and uses sample data. |
| PDF storage | Scaffold only | Supabase upload code exists but is commented out and is not registered through dependency injection. |
| Frontend | Foundation | Authentication screens, a minimal dashboard, and an authenticated shell exist. Invoice screens remain incomplete and use mock data. |
| Tests | Missing | Vitest is configured but has no tests. There is no backend test project. |

See [Architecture](docs/ARCHITECTURE.md) for the current and target designs and
[Tasks](docs/TASKS.md) for the ordered implementation backlog.

## Technology

- Frontend: React 19, Vite 8, TypeScript, TanStack Router, TanStack Query, React Hook Form,
  Zod, shadcn/ui, Tailwind CSS, Biome, and Vitest.
- Backend: .NET 10 Minimal API, vertical slice architecture, ASP.NET Core Identity,
  FluentValidation, Entity Framework Core, Scalar, and QuestPDF.
- Orchestration: Aspire 13.4.
- Data: PostgreSQL.
- File storage: a private Supabase Storage bucket named `invoices`.

## Repository layout

```text
.
|-- AGENTS.md                         Project-wide agent instructions
|-- docs/                             Architecture, requirements, tasks, and conventions
`-- src/
    |-- AppHost/                      Aspire resource graph
    |-- ServiceDefaults/              Health checks, telemetry, and service discovery
    |-- backend/MyApp.Api/            .NET API, EF Core data model, and vertical slices
    `-- frontend/                     React/Vite single-page application
```

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Aspire CLI](https://aspire.dev/get-started/install-cli/)
- Node.js and npm compatible with the versions in `src/frontend/package-lock.json`
- Docker Desktop or another Aspire-compatible container runtime
- A Supabase project with a private `invoices` bucket when PDF work begins
- Google OAuth credentials only when testing Google sign-in

## Configuration

Do not commit credentials. Local backend secrets belong in .NET user secrets:

```powershell
dotnet user-secrets set "Google:ClientId" "<client-id>" --project src/backend/MyApp.Api/MyApp.Api.csproj
dotnet user-secrets set "Google:ClientSecret" "<client-secret>" --project src/backend/MyApp.Api/MyApp.Api.csproj
dotnet user-secrets set "Supabase:SupabaseUrl" "<project-url>" --project src/backend/MyApp.Api/MyApp.Api.csproj
dotnet user-secrets set "Supabase:SupabaseKey" "<server-side-key>" --project src/backend/MyApp.Api/MyApp.Api.csproj
```

The Supabase key is server-side only. Never expose it through a `VITE_*` variable or commit it
to an appsettings file.

## Run locally

The AppHost starts PostgreSQL, pgAdmin, the API, and Vite. Run it from the AppHost directory:

```powershell
cd src/AppHost
aspire start
```

Use the Aspire dashboard to discover the allocated frontend, API, PostgreSQL, and pgAdmin endpoints.
When an agent operates the application, it must use `aspire wait <resource>` before accessing a
resource rather than polling a URL.

Open the frontend endpoint reported by Aspire. During local development, Vite proxies relative
`/api` requests to the Aspire-provided `webapi` endpoint. Production frontend hosting remains a
separate, unresolved decision.

## API documentation

In Development, the API exposes:

- OpenAPI JSON at `/openapi/v1.json`.
- Scalar API reference at `/scalar/v1`.
- Aspire health endpoints at `/health` and `/alive`.

Resolve the API base URL from the Aspire dashboard before opening these paths.

## Validation commands

Backend:

```powershell
dotnet build src/MyApp.slnx
dotnet test src/MyApp.slnx
```

Frontend:

```powershell
cd src/frontend
npm run build
npm run lint
npm run test
```

Observed baseline on 2026-08-23:

- the frontend production build passes with a large-chunk warning;
- Biome lint passes with zero errors and warnings after `FND-001`;
- Vitest exits with no test files found;
- `ServiceDefaults` and `MyApp.Api` compile;
- the full solution check is blocked in the Codex sandbox because the Aspire SDK resolver cannot
  read the host user's NuGet configuration.

These are baseline facts, not acceptable end-state criteria.

## Documentation

- [Architecture and flows](docs/ARCHITECTURE.md)
- [MVP requirements and API contracts](docs/REQUIREMENTS.md)
- [Development workflow](docs/DEVELOPMENT.md)
- [Implementation tasks](docs/TASKS.md)
- [Backend conventions](docs/conventions/BACKEND.md)
- [Frontend conventions](docs/conventions/FRONTEND.md)

## Working with coding agents

Agents read [AGENTS.md](AGENTS.md) and then the more specific instructions under the frontend or
backend directory. Backend work defaults to coaching because the project owner is learning .NET;
an agent may edit backend code only after an explicit implementation request.

Keep each change tied to one ticket from `docs/TASKS.md` and small enough to review comfortably.
