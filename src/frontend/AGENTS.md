# Frontend agent instructions

These instructions apply to `src/frontend` and extend the repository root `AGENTS.md`.

- Follow `../../docs/conventions/FRONTEND.md` and the active ticket in
  `../../docs/TASKS.md`.
- Keep route files thin. Put schemas, contracts, API calls, query options, mutation hooks, and
  forms in their feature directory.
- Use the shared API client and relative `/api` URLs once `FND-004` is complete. Do not introduce
  new hardcoded backend origins.
- Use TanStack Query for server state and React Hook Form with a Zod resolver for forms.
- Invalidate explicit query keys after successful mutations.
- Serialize .NET `DateOnly` values as `yyyy-MM-dd` in a request mapper; do not send JavaScript
  `Date` objects directly.
- Use `#/*` for application-owned imports. Existing generated or shadcn-owned files may keep
  `@/*` until a dedicated cleanup ticket changes them.
- Never hand-edit `src/routeTree.gen.ts`.
- Keep user-facing copy in English locale resources after `I18N-001` is complete.
- Run `npm run build`, `npm run lint`, and relevant Vitest tests for completed frontend tickets.
