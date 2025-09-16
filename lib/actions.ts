"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createInvoiceDAL,
  createInvoiceDTO,
} from "@/data/invoices/create-invoice";
import {
  updateInvoiceDAL,
  updateInvoiceDTO,
} from "@/data/invoices/update-invoice";

export async function createInvoice(formData: FormData) {
  const { amount, customerId, status } = createInvoiceDTO(formData);

  const date = new Date().toISOString().split("T")[0];
  const amountInCents = amount * 100;

  await createInvoiceDAL({
    date,
    status,
    customerId,
    amountInCents,
  });

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function updateInvoice(id: string, formData: FormData) {
  const { amount, customerId, status } = updateInvoiceDTO(formData);

  const amountInCents = amount * 100;

  await updateInvoiceDAL({
    id,
    status,
    customerId,
    amountInCents,
  });

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}
