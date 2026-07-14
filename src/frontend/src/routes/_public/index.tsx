import { userQueryOptions } from "#/lib/queries/user-query-options";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/")({
  component: Home,
  beforeLoad: async ({ context }) => {
  const user = await context.queryClient.ensureQueryData(userQueryOptions)
  if (user) {
    throw redirect({ to: "/dashboard" });
  }
},
  pendingComponent: () => <div>Waiting</div>,
  errorComponent: () => <div>OOPS something went wrong</div>,
});

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Welcome to TanStack Start</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
    </div>
  );
}
