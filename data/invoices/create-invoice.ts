import { sql } from "@/lib/db";
import { FormSchema } from "./schema";
import { CreateInvoiceRecord } from "@/types/invoice";

export const CreateInvoice = FormSchema.omit({ id: true, date: true });

export function createInvoiceDTO(formData: FormData) {
  const validated = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Missing fields. Failed to create invoice.",
    };
  }

  return validated.data;
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
