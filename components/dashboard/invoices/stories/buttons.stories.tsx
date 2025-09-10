import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CreateInvoice, DeleteInvoice, UpdateInvoice } from "../buttons";

const meta = {
  title: "Invoices/Buttons",
  parameters: {
    layout: "centered",
  },
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const Create: Story = {
  render: () => <CreateInvoice />,
};

export const Update: Story = {
  render: () => <DeleteInvoice />,
};

export const Delete: Story = {
  render: () => <UpdateInvoice />,
};
