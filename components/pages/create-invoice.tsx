import Form from "../dashboard/invoices/create-form";
import Breadcrumbs from "../dashboard/invoices/breadcrumbs";

import { CustomerField } from "@/types/global";

export default function CreateInvoice({
  customers,
}: {
  customers: CustomerField[];
}) {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Create Invoice",
            href: "/dashboard/invoices/create",
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
