import CreateInvoice from "@/components/pages/create-invoice";

import { getCustomersDTO } from "@/data/customers-dto";

export default async function CreateInvoicePage() {
  const customers = await getCustomersDTO();

  return <CreateInvoice customers={customers} />;
}
