import { createFileRoute } from "@tanstack/react-router";
import { PageWrapper } from "#/components/layout/page-wrapper";
import { SectionWrapper } from "#/components/layout/section-wrapper";
import { Button } from "#/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation("common");

  return (
    <PageWrapper>
      <SectionWrapper className="space-y-4">
        <h1 className="text-2xl font-bold">
          {t("navigation.dashboard")}
        </h1>
        <p className="text-muted-foreground">
          {t("dashboard.description")}
        </p>
        <Button
          nativeButton={false}
          render={<Link to="/invoices">{t("dashboard.viewInvoices")}</Link>}
        />
      </SectionWrapper>
    </PageWrapper>
  );
}
