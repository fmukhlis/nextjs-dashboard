import SearchInvoice from "@/components/dashboard/invoices/search-invoice";
import { CreateInvoice } from "@/components/dashboard/invoices/buttons";
import { robotoSlab } from "@/components/fonts";
import { Suspense } from "react";
import {
  InvoicesTableSkeleton,
  PaginationSkeleton,
} from "@/components/placeholders/skeletons";
import InvoicesTable from "@/components/dashboard/invoices/(async)/table";
import PaginationServer from "@/components/dashboard/invoices/(async)/pagination-server";

export default async function Invoices(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${robotoSlab.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center gap-2 md:mt-8">
        <SearchInvoice />
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
