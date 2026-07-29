import { z } from "zod";

export const invoiceLineSchema = z.object({
  serviceId: z.string().uuid().optional(),
  description: z.string().min(1, "Omschrijving is verplicht"),
  quantity: z.number().positive(),
  unitPrice: z.number().nonnegative(),
  vatRate: z.number().min(0).max(100),
});

export const createInvoiceSchema = z
  .object({
    clientName: z.string().min(1),
    issueDate: z.date({ error: "Factuurdatum is verplicht" }),
    dueDate: z.date({ error: "Vervaldatum is verplicht" }),
    notes: z.string().optional(),
    // lines: z.array(invoiceLineSchema).min(1, "Voeg minstens één regel toe"),
  })
  .refine((data) => data.dueDate >= data.issueDate, {
    message: "Vervaldatum moet na de factuurdatum liggen",
    path: ["dueDate"],
  });

export type CreateInvoiceType = z.infer<typeof createInvoiceSchema>;
export type InvoiceLineType = z.infer<typeof invoiceLineSchema>;
