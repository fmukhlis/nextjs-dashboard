import React from "react";
import Breadcrumbs from "../dashboard/invoices/breadcrumbs";
import EditInvoiceForm from "../dashboard/invoices/edit-form";

import { CustomerField, InvoiceForm } from "@/types/global";

export default function EditInvoice({
  customers,
  invoice,
}: {
  customers: CustomerField[];
  invoice: InvoiceForm;
}) {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { href: "/dashboard/invoices", label: "Invoices" },
          {
            href: `/dashboard/invoices/${invoice.id}/edit`,
            label: "Edit Invoice",
            active: true,
          },
        ]}
      />
      <EditInvoiceForm customers={customers} invoice={invoice} />
    </main>
  );
}
