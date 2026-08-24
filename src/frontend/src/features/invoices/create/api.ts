import { apiRequest } from "#/lib/api/client";
import type { CreateInvoiceType } from "../schema";

type CreateInvoiceResponse = {
	message: string;
};

export function createInvoice(
	data: CreateInvoiceType,
): Promise<CreateInvoiceResponse> {
	return apiRequest("/api/invoices", { method: "POST", body: data });
}
