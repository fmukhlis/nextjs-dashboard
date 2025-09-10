import { Meta, StoryObj } from "@storybook/nextjs-vite";
import InvoicesTable from "../table";
import { Suspense } from "react";
import { mocked } from "storybook/test";
import {
  getFilteredInvoicesDTO,
  mockedFilteredInvoices,
} from "@/data/invoices-dto";
import { InvoicesTableSkeleton } from "@/components/dashboard/invoices/skeletons";

const meta = {
  title: "Invoices/InvoicesTable",
  component: InvoicesTable,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof InvoicesTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  async beforeEach() {
    mocked(getFilteredInvoicesDTO).mockResolvedValue([
      mockedFilteredInvoices.alice,
      mockedFilteredInvoices.johnDoe,
    ]);
  },
  args: {
    currentPage: 1,
    query: "",
  },
  render: (args) => (
    <Suspense>
      <InvoicesTable {...args} />
    </Suspense>
  ),
};

export const NoData: Story = {
  async beforeEach() {
    mocked(getFilteredInvoicesDTO).mockResolvedValue([]);
  },
  args: {
    currentPage: 1,
    query: "",
  },
  render: (args) => (
    <Suspense>
      <InvoicesTable {...args} />
    </Suspense>
  ),
};

export const Skeleton: Story = {
  args: {
    currentPage: 1,
    query: "",
  },
  render: () => <InvoicesTableSkeleton />,
};
