import { sql } from "@/lib/db";
import { FormSchema } from "./schema";
import { DeleteInvoiceRecord } from "@/types/invoice";

const DeleteInvoice = FormSchema.pick({ id: true });

export function deleteInvoiceDTO(invoiceId: string) {
  const validated = DeleteInvoice.parse({
    id: invoiceId,
  });
  return validated;
}

export async function deleteInvoiceDAL({ id }: DeleteInvoiceRecord) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
}
