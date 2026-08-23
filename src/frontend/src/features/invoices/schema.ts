import i18n from "#/i18n";
import { z } from "zod";

export const invoiceLineSchema = z.object({
  serviceId: z.string().uuid().optional(),
  description: z
    .string()
    .min(1, i18n.t("invoices:validation.descriptionRequired")),
  quantity: z.number().positive(),
  unitPrice: z.number().nonnegative(),
  vatRate: z.number().min(0).max(100),
});

export const createInvoiceSchema = z
  .object({
    clientName: z.string().min(1),
    issueDate: z.date({ error: i18n.t("invoices:validation.issueDateRequired") }),
    dueDate: z.date({ error: i18n.t("invoices:validation.dueDateRequired") }),
    notes: z.string().optional(),
    // lines: z
    //   .array(invoiceLineSchema)
    //   .min(1, i18n.t("invoices:validation.lineRequired")),
  })
  .refine((data) => data.dueDate >= data.issueDate, {
    message: i18n.t("invoices:validation.dueDateAfterIssue"),
    path: ["dueDate"],
  });

export type CreateInvoiceType = z.infer<typeof createInvoiceSchema>;
export type InvoiceLineType = z.infer<typeof invoiceLineSchema>;
