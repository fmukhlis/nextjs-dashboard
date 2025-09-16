import EditInvoice from "../edit-invoice";
import DashboardLayout from "@/app/dashboard/layout";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCustomers } from "@/data/customers-dto";

const meta = {
  title: "Pages/EditInvoice",
  component: EditInvoice,
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => (
    <DashboardLayout>
      <EditInvoice {...args} />
    </DashboardLayout>
  ),
} satisfies Meta<typeof EditInvoice>;

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
