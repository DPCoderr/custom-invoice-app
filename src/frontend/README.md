# Invoice Generator frontend

This directory contains the React/Vite single-page application for Invoice Generator.

The canonical project documentation is in the repository root:

- [Project overview](../../README.md)
- [Architecture and flows](../../docs/ARCHITECTURE.md)
- [Development workflow](../../docs/DEVELOPMENT.md)
- [Frontend conventions](../../docs/conventions/FRONTEND.md)
- [Implementation backlog](../../docs/TASKS.md)

## Current local workflow

Until `FND-003` in the backlog is complete, run the frontend separately from Aspire:

```powershell
npm ci
npm run dev
```

Useful checks:

```powershell
npm run build
npm run lint
npm run test
```

The current invoice pages are prototypes. They do not yet represent the target API contract and
must not be used as evidence that invoice creation works.
