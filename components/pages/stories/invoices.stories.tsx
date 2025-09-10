import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Invoices from "../invoices";
import DashboardLayout from "@/app/dashboard/layout";
import { mocked } from "storybook/test";
import {
  getFilteredInvoicesDTO,
  getInvoicesPagesDTO,
  mockedFilteredInvoices,
} from "@/data/invoices-dto";
import { InvoicesActive } from "@/components/dashboard/stories/nav-link.stories";

const meta = {
  title: "Pages/Invoices",
  component: Invoices,
  parameters: { layout: "centered" },
  render: (args) => (
    <DashboardLayout>
      <Invoices {...args} />
    </DashboardLayout>
  ),
} satisfies Meta<typeof Invoices>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  async beforeEach() {
    mocked(getFilteredInvoicesDTO).mockResolvedValue([
      mockedFilteredInvoices.alice,
      mockedFilteredInvoices.johnDoe,
    ]);
    mocked(getInvoicesPagesDTO).mockResolvedValue(9);
  },
  args: {
    currentPage: 1,
    query: "",
  },
  parameters: {
    nextjs: InvoicesActive.parameters?.nextjs,
  },
};
