import RevenueChart from "../revenue-chart";

import { mocked } from "storybook/test";
import { Suspense } from "react";
import { getRevenueDTO } from "@/data/revenue-dto";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RevenueChartSkeleton } from "../../skeletons";

const meta = {
  title: "Dashboard/RevenueChart",
  component: RevenueChart,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof RevenueChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  beforeEach: async () => {
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
  },
  render: () => (
    <Suspense>
      <RevenueChart />
    </Suspense>
  ),
};

export const NoData: Story = {
  beforeEach: async () => {
    mocked(getRevenueDTO).mockResolvedValue([]);
  },
  render: () => (
    <Suspense>
      <RevenueChart />
    </Suspense>
  ),
};

export const Skeleton: Story = {
  render: () => <RevenueChartSkeleton />,
};
