import { sql } from "@/lib/db";
import { FormSchema } from "./schema";
import { UpdateInvoiceRecord } from "@/types/invoice";

export const UpdateInvoice = FormSchema.omit({ date: true });

export function updateInvoiceDTO(invoiceId: string, formData: FormData) {
  const validated = UpdateInvoice.parse({
    id: invoiceId,
    amount: formData.get("amount"),
    status: formData.get("status"),
    customerId: formData.get("customerId"),
  });
  return validated;
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
