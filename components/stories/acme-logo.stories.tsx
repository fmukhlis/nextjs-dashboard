import { Meta, StoryObj } from "@storybook/nextjs-vite";
import AcmeLogo from "../acme-logo";

const meta = {
  title: "Utilities/AcmeLogo",
  component: AcmeLogo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AcmeLogo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="bg-gray-500 p-1">
      <AcmeLogo />
    </div>
  ),
};
