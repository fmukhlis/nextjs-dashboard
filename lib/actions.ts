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

export async function createInvoice(_: State, formData: FormData) {
  const validated = createInvoiceDTO(formData);

  if ("errors" in validated) {
    return validated;
  }

  const { amount, customerId, status } = validated;

  const date = new Date().toISOString().split("T")[0];
  const amountInCents = amount * 100;

  try {
    await createInvoiceDAL({
      date,
      status,
      customerId,
      amountInCents,
    });
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function updateInvoice(invoiceId: string, formData: FormData) {
  const { id, amount, customerId, status } = updateInvoiceDTO(
    invoiceId,
    formData,
  );

  const amountInCents = amount * 100;

  try {
    await updateInvoiceDAL({
      id,
      status,
      customerId,
      amountInCents,
    });
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(invoiceId: string) {
  const { id } = deleteInvoiceDTO(invoiceId);

  try {
    await deleteInvoiceDAL({ id });
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/dashboard/invoices");
}

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};
