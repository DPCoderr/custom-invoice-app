import { userQueryOptions } from "#/lib/queries/user";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(userQueryOptions),
  pendingComponent: () => <div>Waiting</div>,
  errorComponent: () => <div>OOPS something went wrong</div>,
});

function Home() {
  const {
    data: user,
  } = useQuery(userQueryOptions);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Welcome to TanStack Start</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>

      {user && <p className="mt-4 text-lg">{user.firstName}  {user.email}</p>}
    </div>
  );
}
