import { Meta, StoryObj } from "@storybook/nextjs-vite";
import SideNav from "../sidenav";
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
};
