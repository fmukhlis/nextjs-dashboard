import { Pencil, Plus, Trash } from "lucide-react";
import Link from "next/link";

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Invoice</span>{" "}
      <Plus className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice() {
  return (
    <Link
      href="/dashboard/invoices"
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <Pencil className="h-5 w-5" />
    </Link>
  );
}

export function DeleteInvoice() {
  return (
    <>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <Trash className="h-5 w-5" />
      </button>
    </>
  );
}
