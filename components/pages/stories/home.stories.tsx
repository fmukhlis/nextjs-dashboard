import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Home from "../home";

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
