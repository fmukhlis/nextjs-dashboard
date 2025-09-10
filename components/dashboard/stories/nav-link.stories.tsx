import { Meta, StoryObj } from "@storybook/nextjs-vite";
import NavLinks from "../nav-links";

const meta = {
  title: "Dashboard/NavLinks",
  component: NavLinks,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof NavLinks>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DashboardActive: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/dashboard",
      },
    },
  },
};

export const InvoicesActive: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/dashboard/invoices",
      },
    },
  },
};

export const CustomersActive: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/dashboard/customers",
      },
    },
  },
};
