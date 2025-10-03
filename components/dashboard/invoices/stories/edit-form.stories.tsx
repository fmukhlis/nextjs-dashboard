import { mockedCustomers } from "@/data/customers-dto";
import EditInvoiceForm from "../edit-form";

import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Invoices/EditInvoiceForm",
  component: EditInvoiceForm,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof EditInvoiceForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    customers: [mockedCustomers.alice, mockedCustomers.johnDoe],
    invoice: {
      amount: 100,
      customer_id: "1",
      id: "1",
      status: "paid",
    },
  },
};
