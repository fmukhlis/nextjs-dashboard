import { fetchInvoicesPages } from "@/lib/data";
import Pagination from "@/components/dashboard/invoices/pagination";

export default async function PaginationServer({ query }: { query: string }) {
  const totalPages = await fetchInvoicesPages(query);
  return <Pagination totalPages={totalPages} />;
}
