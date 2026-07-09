import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import "../styles.css";
import type { QueryClient } from "@tanstack/react-query";
import { Button } from "#/components/ui/button";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <nav>
        <Button
          nativeButton={false}
          variant={"link"}
          render={<Link to="/">Home</Link>}
        ></Button>
        <Button
          nativeButton={false}
          variant={"link"}
          render={<Link to="/login">Login</Link>}
        ></Button>
        <Button
          nativeButton={false}
          variant={"link"}
          render={<Link to="/register">Register</Link>}
        ></Button>
        <Button
          nativeButton={false}
          variant={"link"}
          render={<Link to="/dashboard">Dashboard</Link>}
        ></Button>
      </nav>
      <Outlet />
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "TanStack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  );
}
