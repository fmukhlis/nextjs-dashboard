import Pagination from "@/components/dashboard/invoices/pagination";

// import { getInvoicesPagesDTO } from "@/data/invoices-dto";

export default async function PaginationServer({ query }: { query: string }) {
  // const totalPages = await getInvoicesPagesDTO(query);
  const totalPages = 9
  return <Pagination totalPages={totalPages} />;
}
