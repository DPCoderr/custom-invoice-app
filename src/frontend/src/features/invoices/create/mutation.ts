import type { CreateInvoiceType } from "../schema";
import i18n from "#/i18n";

type CreateInvoiceResponseDto = {
  message: string;
};

export async function createInvoice(
  data: CreateInvoiceType,
): Promise<CreateInvoiceResponseDto | null> {
  try {
    const res = await fetch("http://localhost:5050/api/invoices", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const body: CreateInvoiceResponseDto = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(body?.message ?? i18n.t("common:errors.generic"));
    }

    if (!body) {
      throw new Error(i18n.t("invoices:errors.invalidResponse"));
    }

    return body;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(i18n.t("common:errors.connection"));
  }
}
