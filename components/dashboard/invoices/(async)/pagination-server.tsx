import Pagination from "@/components/dashboard/invoices/pagination";

export default async function PaginationServer({ query }: { query: string }) {
  return <Pagination totalPages={9} />;
}
