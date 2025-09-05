import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import SearchInvoice from "../search-invoice";

const meta = {
  title: "Invoices/SearchInvoice",
  component: SearchInvoice,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    layout: "centered",
  },
} satisfies Meta<typeof SearchInvoice>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const searchInput = canvas.getByPlaceholderText(/Search invoice.../i);
    await expect(searchInput).toHaveValue("");
  },
};

export const Query: Story = {
  parameters: {
    nextjs: {
      navigation: {
        query: {
          query: "John",
        },
      },
    },
  },
  play: async ({ canvas }) => {
    const searchInput = canvas.getByPlaceholderText(/Search invoice.../i);
    await expect(searchInput).toHaveValue("John");
  },
};
