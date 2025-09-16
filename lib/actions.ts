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
import {
  deleteInvoiceDAL,
  deleteInvoiceDTO,
} from "@/data/invoices/delete-invoice";

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

export async function updateInvoice(invoiceId: string, formData: FormData) {
  const { id, amount, customerId, status } = updateInvoiceDTO(
    invoiceId,
    formData,
  );

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

export async function deleteInvoice(invoiceId: string) {
  const { id } = deleteInvoiceDTO(invoiceId);

  await deleteInvoiceDAL({ id });

  revalidatePath("/dashboard/invoices");
}
