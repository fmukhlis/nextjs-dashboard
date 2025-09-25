import Home from "../home";

import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Pages/Home",
  component: Home,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Home>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
