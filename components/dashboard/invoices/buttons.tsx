/* v8 ignore next */
import Link from "next/link";

import { deleteInvoice } from "@/lib/actions";
import { Pencil, Plus, Trash } from "lucide-react";

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Invoice</span>
      <Plus className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ invoiceId }: { invoiceId: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${invoiceId}/edit`}
      className="flex rounded-md border p-2 hover:bg-gray-100"
    >
      <span className="sr-only">Update Invoice</span>
      <Pencil className="h-5 w-5" />
    </Link>
  );
}

export function DeleteInvoice({ invoiceId }: { invoiceId: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, invoiceId);
  return (
    <form action={deleteInvoiceWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete Invoice</span>
        <Trash className="h-5 w-5" />
      </button>
    </form>
  );
}
