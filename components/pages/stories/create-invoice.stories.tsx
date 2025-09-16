import { Meta, StoryObj } from "@storybook/nextjs-vite";
import CreateInvoice from "../create-invoice";
import DashboardLayout from "@/app/dashboard/layout";
import { mockedCustomers } from "@/data/customers-dto";

const meta = {
  title: "Pages/CreateInvoice",
  component: CreateInvoice,
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => (
    <DashboardLayout>
      <CreateInvoice {...args} />
    </DashboardLayout>
  ),
} satisfies Meta<typeof CreateInvoice>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    customers: [mockedCustomers.alice, mockedCustomers.johnDoe],
  },
};
