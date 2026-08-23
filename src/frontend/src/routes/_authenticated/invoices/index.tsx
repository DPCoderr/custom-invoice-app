import { PageWrapper } from "#/components/layout/page-wrapper";
import { SectionWrapper } from "#/components/layout/section-wrapper";
import { Button } from "#/components/ui/button";
import type { InvoiceListItem } from "#/features/invoices/types";
import { formatCurrency } from "#/i18n/formatters";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/_authenticated/invoices/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation("invoices");
  const invoices: InvoiceListItem[] = [
    {
      id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
      invoiceNumber: "INV-2026-001",
      clientName: "Bakkerij Van Dijk",
      total: 1240.5,
      currency: "EUR",
      dueDate: "2026-08-15",
      status: "Sent",
    },
    {
      id: "a1b2c3d4-5e6f-4a1b-8c9d-1234567890ab",
      invoiceNumber: "INV-2026-002",
      clientName: "TechNova B.V.",
      total: 3499.0,
      currency: "EUR",
      dueDate: "2026-07-20",
      status: "Overdue",
    },
    {
      id: "f0e1d2c3-b4a5-4968-9876-fedcba098765",
      invoiceNumber: "INV-2026-003",
      clientName: "Studio Groen",
      total: 675.0,
      currency: "EUR",
      dueDate: "2026-08-01",
      status: "Paid",
    },
    {
      id: "12345678-90ab-4cde-8f01-234567890abc",
      invoiceNumber: "INV-2026-004",
      clientName: "De Vries Consultancy",
      total: 2100.75,
      currency: "EUR",
      dueDate: "2026-09-01",
      status: "Draft",
    },
    {
      id: "87654321-ba09-4fed-8c10-fedcba098765",
      invoiceNumber: "INV-2026-005",
      clientName: "Meubelhuis Post",
      total: 890.25,
      currency: "EUR",
      dueDate: "2026-06-30",
      status: "Cancelled",
    },
  ];

  return (
    <PageWrapper>
      <SectionWrapper>
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <Button
            nativeButton={false}
            render={<Link to="/invoices/create">{t("create.submit")}</Link>}
          />
        </div>
        <div className="mt-10">
          <div>
            {invoices.map((invoice) => (
              <div className="flex justify-between" key={invoice.id}>
                <p>{invoice.clientName}</p>
                <p>{formatCurrency(invoice.total, invoice.currency)}</p>
                <p>{invoice.status}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </PageWrapper>
  );
}
