"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createInvoiceDAL,
  createInvoiceDTO,
} from "@/data/invoices/create-invoice";

export async function createInvoice(formData: FormData) {
  const { amount, customerId, status } = createInvoiceDTO(formData);

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  await createInvoiceDAL({
    date,
    status,
    customerId,
    amount: amountInCents,
  });

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}
