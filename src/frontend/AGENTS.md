# Frontend agent instructions

These instructions apply to `src/frontend` and extend the repository root `AGENTS.md`.

- Follow `../../docs/conventions/FRONTEND.md` and the active ticket in
  `../../docs/TASKS.md`.
- For frontend-first delivery, read `../../docs/PAGES.md`, `../../docs/FRONTEND-WORKFLOW.md`,
  and existing page implementation notes. Use Astra-high (`gpt-6-astra`, reasoning `high`),
  one page at a time in the current chat, with a separate branch per page. Implement directly
  without generated mockups or mandatory advance design approval; refine the built page.
- Follow the central checklist and build the landing last using screenshots of implemented features.
  Do not create page agents or parallel chats. Check a page only after verification and integration.
- Keep route files thin. Put schemas, contracts, API calls, query options, mutation hooks, and
  forms in their feature directory.
- Use the shared API client and relative `/api` URLs once `FND-004` is complete. Do not introduce
  new hardcoded backend origins.
- Use TanStack Query for server state and React Hook Form with a Zod resolver for forms.
- Use shadcn/ui components and the required `sidebar-01`, `login-01`, and `signup-01` blocks
  for the authenticated sidebar, login, and signup respectively. Follow the installation/adaptation
  rules in `../../docs/conventions/FRONTEND.md`; preserve existing customized components.
- Invalidate explicit query keys after successful mutations.
- Serialize .NET `DateOnly` values as `yyyy-MM-dd` in a request mapper; do not send JavaScript
  `Date` objects directly.
- Use `#/*` for application-owned imports. Existing generated or shadcn-owned files may keep
  `@/*` until a dedicated cleanup ticket changes them.
- Never hand-edit `src/routeTree.gen.ts`.
- Keep user-facing copy in English locale resources after `I18N-001` is complete.
- Run `npm run build`, `npm run lint`, and relevant Vitest tests for completed frontend tickets.
