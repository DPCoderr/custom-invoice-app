import { userQueryOptions } from "#/lib/queries/user-query-options";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(userQueryOptions);
    if (user) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: Outlet,
});
