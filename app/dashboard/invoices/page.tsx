import Search from "@/components/search";
import { CreateInvoice } from "@/components/dashboard/invoices/buttons";
import { robotoSlab } from "@/components/fonts";
import { Suspense } from "react";
import {
  InvoicesTableSkeleton,
  PaginationSkeleton,
} from "@/components/placeholders/skeletons";
import InvoicesTable from "@/components/dashboard/invoices/table";
import { fetchInvoicesPages } from "@/lib/data";
import Pagination from "@/components/dashboard/invoices/pagination";

async function PaginationServer({ query }: { query: string }) {
  const totalPages = await fetchInvoicesPages(query);
  return <Pagination totalPages={totalPages} />;
}

export default function Invoices(props: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = props.searchParams?.query || "";
  const currentPage = Number(props.searchParams?.page) || 1;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${robotoSlab.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <InvoicesTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Suspense fallback={<PaginationSkeleton />}>
          <PaginationServer query={query} />
        </Suspense>
      </div>
    </div>
  );
}
