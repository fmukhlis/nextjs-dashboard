import SignIn from "../sign-in";

import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Pages/Signin",
  component: SignIn,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SignIn>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
