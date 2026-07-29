import type { CreateInvoiceType } from "../schema";

type CreateInvoiceResponseDto = {
  message: string;
};

export async function createInvoice(
  data: CreateInvoiceType,
): Promise<CreateInvoiceResponseDto | null> {
  let res: Response;

  try {
    res = await fetch("http://localhost:5050/api/invoices", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const body: CreateInvoiceResponseDto = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(body?.message ?? "Something went wrong");
    }

    if (!body) {
      throw new Error("Invalid response from server");
    }

    return res.json();
  } catch (error) {
    throw new Error("Failed to connect with the backend. Try it later again.");
  }
}
