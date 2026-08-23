import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/")({
  component: Home,
  pendingComponent: () => <div>Waiting</div>,
  errorComponent: () => <div>OOPS something went wrong</div>,
});

function Home() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-6 py-24 text-center">
      <h1 className="text-4xl font-bold">Invoice Generator</h1>
      <p className="text-lg text-muted-foreground">
        A focused learning app for creating reusable services and invoices.
      </p>
    </main>
  );
}
