import { Meta, StoryObj } from "@storybook/nextjs-vite";
import InvoiceStatus from "../status";

const meta = {
  title: "Invoices/InvoiceStatus",
  component: InvoiceStatus,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof InvoiceStatus>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Paid: Story = {
  args: {
    status: "paid",
  },
};

export const Pending: Story = {
  args: {
    status: "pending",
  },
};
