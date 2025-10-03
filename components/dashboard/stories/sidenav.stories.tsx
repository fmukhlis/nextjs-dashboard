import SideNav from "../sidenav";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DashboardActive } from "./nav-link.stories";

const meta = {
  title: "Dashboard/SideNav",
  component: SideNav,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof SideNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    nextjs: DashboardActive.parameters?.nextjs,
  },
  play: async ({ canvas, userEvent }) => {
    const signOutButton = canvas.getByRole("button", { name: /Sign Out/i });
    await userEvent.click(signOutButton);
  },
};
