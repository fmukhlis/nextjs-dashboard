import { sql } from "@/lib/db";
import { FormSchema } from "./schema";
import { UpdateInvoiceRecord } from "@/types/invoice";

export const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export function UpdateInvoiceDTO(formData: FormData) {
  const validated = UpdateInvoice.parse({
    amount: formData.get("amount"),
    status: formData.get("status"),
    customerId: formData.get("customerId"),
  });
  return validated;
}

export async function UpdateInvoiceDAL({
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
