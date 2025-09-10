import CardWrapper from "@/components/dashboard/(async)/cards";
import RevenueChart from "@/components/dashboard/(async)/revenue-chart";
import LatestInvoices from "@/components/dashboard/(async)/latest-invoices";

import { Suspense } from "react";
import { robotoSlab } from "@/components/fonts";
import {
  CardsSkeleton,
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
} from "@/components/dashboard/skeletons";

export default function DashboardOverview() {
  return (
    <main>
      <h1 className={`${robotoSlab.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <Suspense fallback={<CardsSkeleton />}>
        <CardWrapper />
      </Suspense>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
