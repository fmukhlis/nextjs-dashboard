import PaginationServer from "../pagination-server";

import { Suspense } from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PaginationServerSkeleton } from "@/components/dashboard/invoices/skeletons";

const meta = {
  title: "Invoices/PaginationServer",
  component: PaginationServer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PaginationServer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { query: "" },
  render: (args) => (
    <Suspense>
      <PaginationServer {...args} />
    </Suspense>
  ),
};

export const Skeleton: Story = {
  args: { query: "" },
  render: () => <PaginationServerSkeleton />,
};
