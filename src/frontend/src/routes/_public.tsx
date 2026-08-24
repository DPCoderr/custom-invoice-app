import { Navbar } from "#/components/navbar";
import { currentUserQuery } from "#/features/auth/api";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(currentUserQuery);
    if (user) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
