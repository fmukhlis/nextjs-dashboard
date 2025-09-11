import z from "zod";

import { sql } from "@/lib/db";
import { CreateInvoiceRecord } from "@/types/invoice";

export function createInvoiceDTO(formData: FormData) {
  const validated = CreateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  return validated;
}

export async function createInvoiceDAL({
  amount,
  customerId,
  date,
  status,
}: CreateInvoiceRecord) {
  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amount}, ${status}, ${date})
  `;
}

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number<number>(),
  date: z.string(),
  status: z.enum(["pending", "paid"]),
});

export const CreateInvoice = FormSchema.omit({ id: true, date: true });
