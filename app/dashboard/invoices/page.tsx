import Invoices from "@/components/pages/invoices";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoices",
};

export default async function InvoicesPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return <Invoices currentPage={currentPage} query={query} />;
}
