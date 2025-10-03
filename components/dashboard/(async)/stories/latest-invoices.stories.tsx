import LatestInvoices from "../latest-invoices";

import { mocked } from "storybook/test";
import { Suspense } from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { getLatestInvoicesDTO } from "@/data/invoices-dto";
import { LatestInvoicesSkeleton } from "../../skeletons";

const meta = {
  title: "Dashboard/LatestInvoices",
  component: LatestInvoices,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LatestInvoices>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  async beforeEach() {
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
  render: () => (
    <Suspense>
      <LatestInvoices />
    </Suspense>
  ),
};

export const NoData: Story = {
  async beforeEach() {
    mocked(getLatestInvoicesDTO).mockResolvedValue([]);
  },
  render: () => (
    <Suspense>
      <LatestInvoices />
    </Suspense>
  ),
};

export const Skeleton: Story = {
  render: () => <LatestInvoicesSkeleton />,
};
