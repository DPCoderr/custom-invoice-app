export type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue" | "Cancelled";

export type InvoiceListItem = {
  id: string;
  invoiceNumber: string;
  clientName: string;
  total: number;
  currency: string;
  dueDate: string; // ISO date string
  status: InvoiceStatus;
}