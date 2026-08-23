import { PageWrapper } from "#/components/layout/page-wrapper";
import { SectionWrapper } from "#/components/layout/section-wrapper";
import { CreateInvoiceForm } from "#/features/invoices/create/create-invoice-form";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/_authenticated/invoices/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation("invoices");

  return (
    <PageWrapper>
      <SectionWrapper>
        <h1 className="text-xl font-medium">{t("create.title")}</h1>
        <CreateInvoiceForm className="mt-10" />
      </SectionWrapper>
    </PageWrapper>
  );
}
