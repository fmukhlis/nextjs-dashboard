import InvoicesTable from "@/components/dashboard/invoices/(async)/table";
import SearchInvoice from "@/components/dashboard/invoices/search-invoice";
import PaginationServer from "@/components/dashboard/invoices/(async)/pagination-server";

import { Suspense } from "react";
import { robotoSlab } from "@/components/fonts";
import { CreateInvoice } from "@/components/dashboard/invoices/buttons";
import {
  InvoicesTableSkeleton,
  PaginationServerSkeleton,
} from "@/components/dashboard/invoices/skeletons";

export default function Invoices({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
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
        <Suspense fallback={<PaginationServerSkeleton />}>
          <PaginationServer query={query} />
        </Suspense>
      </div>
    </div>
  );
}
