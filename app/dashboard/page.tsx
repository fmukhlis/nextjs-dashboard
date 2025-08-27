import RevenueChart from "@/components/dashboard/revenue-chart";
import LatestInvoices from "@/components/dashboard/latest-invoices";
import { robotoSlab } from "@/components/fonts";
import { fetchLatestInvoices, fetchRevenue } from "@/lib/data";

export default async function Page() {
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();
  return (
    <main>
      <h1 className={`${robotoSlab.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"></div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
