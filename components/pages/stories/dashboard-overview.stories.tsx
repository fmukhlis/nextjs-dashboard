import DashboardLayout from "@/app/dashboard/layout";
import DashboardOverview from "../dashboard-overview";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mocked } from "storybook/internal/test";
import { getCardDataDTO } from "@/data/card-dto";
import { formatCurrency } from "@/lib/utils";
import { getRevenueDTO } from "@/data/revenue-dto";
import { getLatestInvoicesDTO } from "@/data/invoices-dto";
import { DashboardActive } from "@/components/dashboard/stories/nav-link.stories";

const meta = {
  title: "Pages/DashboardOverview",
  component: DashboardOverview,
  parameters: { layout: "centered" },
  render: () => (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  ),
} satisfies Meta<typeof DashboardOverview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  async beforeEach() {
    mocked(getCardDataDTO).mockResolvedValue({
      numberOfCustomers: 11,
      numberOfInvoices: 15,
      totalPaidInvoices: formatCurrency(150000),
      totalPendingInvoices: formatCurrency(13000),
    });
    mocked(getRevenueDTO).mockResolvedValue([
      { month: "January", revenue: 7300 },
      { month: "February", revenue: 12300 },
      { month: "March", revenue: 9700 },
      { month: "April", revenue: 10300 },
      { month: "May", revenue: 11900 },
      { month: "June", revenue: 12500 },
      { month: "July", revenue: 7800 },
      { month: "August", revenue: 5900 },
      { month: "September", revenue: 12900 },
      { month: "October", revenue: 11000 },
      { month: "November", revenue: 10000 },
      { month: "December", revenue: 12500 },
    ]);
    mocked(getLatestInvoicesDTO).mockResolvedValue([
      {
        amount: "$500",
        email: "john@example.com",
        id: "1",
        image_url: "customers/michael-novotny.png",
        name: "John Doe",
      },
      {
        amount: "$300",
        email: "alice@example.com",
        id: "2",
        image_url: "customers/evil-rabbit.png",
        name: "Alice",
      },
    ]);
  },
  parameters: {
    nextjs: DashboardActive.parameters?.nextjs,
  },
};
