import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import SearchInvoice from "../search-invoice";
import { getRouter } from "@storybook/nextjs-vite/navigation.mock";

const meta = {
  title: "Invoices/Search",
  component: SearchInvoice,
  parameters: {
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

export const WithSearchParams: Story = {
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

export const Query: Story = {
  play: async ({ canvas, userEvent }) => {
    const searchInput = canvas.getByPlaceholderText(/Search invoice.../i);
    await userEvent.type(searchInput, "Alice");
    await userEvent.keyboard("{Enter}");
    await expect(getRouter().replace).toHaveBeenCalledWith(
      "/?page=1&query=Alice",
    );
    await userEvent.clear(searchInput);
    await userEvent.keyboard("{Enter}");
    await expect(getRouter().replace).toHaveBeenCalledWith("/?page=1");
  },
};
