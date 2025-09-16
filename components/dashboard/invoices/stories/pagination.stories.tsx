import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Pagination from "../pagination";

const meta = {
  title: "Invoices/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalPages: 9,
  },
};

export const InMiddle: Story = {
  args: {
    totalPages: 9,
  },
  parameters: {
    nextjs: {
      navigation: {
        query: {
          page: 5,
        },
      },
    },
  },
};

export const EdgeCase: Story = {
  args: {
    totalPages: 1,
  },
};
