import CardWrapper from "../cards";

import { mocked } from "storybook/test";
import { Suspense } from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { getCardDataDTO } from "@/data/card-dto";
import { formatCurrency } from "@/lib/utils";
import { CardsSkeleton } from "../../skeletons";

const meta = {
  title: "Dashboard/CardWrapper",
  component: CardWrapper,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof CardWrapper>;

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
  },
  render: () => (
    <Suspense>
      <CardWrapper />
    </Suspense>
  ),
};

export const NoData: Story = {
  async beforeEach() {
    mocked(getCardDataDTO).mockResolvedValue({
      numberOfCustomers: 0,
      numberOfInvoices: 0,
      totalPaidInvoices: formatCurrency(0),
      totalPendingInvoices: formatCurrency(0),
    });
  },
  render: () => (
    <Suspense>
      <CardWrapper />
    </Suspense>
  ),
};

export const Skeleton: Story = {
  render: () => <CardsSkeleton />,
};
