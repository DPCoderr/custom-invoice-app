import { PageWrapper } from "#/components/layout/page-wrapper";
import { SectionWrapper } from "#/components/layout/section-wrapper";
import { CreateInvoiceForm } from "#/features/invoices/create/create-invoice-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/invoices/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageWrapper>
      <SectionWrapper>
        <h1 className="text-xl font-medium">Create an invoice</h1>
        <CreateInvoiceForm className="mt-10" />
      </SectionWrapper>
    </PageWrapper>
  );
}
