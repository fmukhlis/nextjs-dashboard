import EditInvoice from "@/components/pages/edit-invoice";

import { getCustomersDTO } from "@/data/customers-dto";
import { getInvoiceByIdDTO } from "@/data/invoices-dto";

export default async function EditInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [customers, invoice] = await Promise.all([
    getCustomersDTO(),
    getInvoiceByIdDTO(id),
  ]);

  return <EditInvoice customers={customers} invoice={invoice} />;
}
