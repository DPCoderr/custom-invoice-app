import { userQueryOptions } from "#/lib/queries/user-query-options";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context, location }) => {
    const user = await context.queryClient.ensureQueryData(userQueryOptions);

    if (!user) {
      throw redirect({ to: "/login", search: { redirect: location.href } });
    }

    return { user };
  },
  component: Outlet,
});
