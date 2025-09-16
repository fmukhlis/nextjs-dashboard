import { sql } from "@/lib/db";
import { FormSchema } from "./schema";
import { CreateInvoiceRecord } from "@/types/invoice";

export const CreateInvoice = FormSchema.omit({ id: true, date: true });

export function createInvoiceDTO(formData: FormData) {
  const validated = CreateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  return validated;
}

export async function createInvoiceDAL({
  amountInCents,
  customerId,
  date,
  status,
}: CreateInvoiceRecord) {
  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
}
