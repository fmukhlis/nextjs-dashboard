import { sql } from "@/lib/db";
import { FormSchema } from "./schema";
import { UpdateInvoiceRecord } from "@/types/invoice";

export const UpdateInvoice = FormSchema.omit({ date: true });

export function updateInvoiceDTO(invoiceId: string, formData: FormData) {
  const validated = UpdateInvoice.safeParse({
    id: invoiceId,
    amount: formData.get("amount"),
    status: formData.get("status"),
    customerId: formData.get("customerId"),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Missing fields. Failed to create invoice.",
    };
  }

  return validated.data;
}

export async function updateInvoiceDAL({
  id,
  status,
  customerId,
  amountInCents,
}: UpdateInvoiceRecord) {
  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
}
