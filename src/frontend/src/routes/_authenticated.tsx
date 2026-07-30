import { AppSidebar } from "#/components/sidebar/app-sidebar";
import { SiteHeader } from "#/components/site-header";
import { SidebarInset, SidebarProvider } from "#/components/ui/sidebar";
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
  component: RootComponent,
});

function RootComponent() {
  const { user } = Route.useRouteContext();
  return (
    <>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" user={user} />
        <SidebarInset>
          <SiteHeader />
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
