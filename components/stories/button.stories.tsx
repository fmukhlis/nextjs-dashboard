import { Button } from "../button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Utilities/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};
