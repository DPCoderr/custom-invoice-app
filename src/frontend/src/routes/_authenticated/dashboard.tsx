import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "#/components/layout/page-wrapper";
import { SectionWrapper } from "#/components/layout/section-wrapper";
import { Button } from "#/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageWrapper>
      <SectionWrapper className="space-y-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Use the invoice workspace while the remaining MVP features are built.
        </p>
        <Button
          nativeButton={false}
          render={<Link to="/invoices">View invoices</Link>}
        />
      </SectionWrapper>
    </PageWrapper>
  );
}
