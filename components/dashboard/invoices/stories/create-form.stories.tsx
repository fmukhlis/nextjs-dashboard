import Form from "../create-form";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCustomers } from "@/data/customers-dto";

const meta = {
  title: "Invoices/CreateInvoiceForm",
  component: Form,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    customers: [mockedCustomers.alice, mockedCustomers.johnDoe],
  },
};
