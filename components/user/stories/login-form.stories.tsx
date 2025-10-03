import LoginForm from "../login-form";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { __setNextAuthResult, AuthError } from "@/auth";

const meta = {
  title: "User/LoginForm",
  component: LoginForm,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof LoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Failed: Story = {
  beforeEach() {
    __setNextAuthResult("signIn", () => async () => {
      throw new AuthError("CredentialsSignin");
    });
  },
  play: async ({ canvas, userEvent }) => {
    const emailField = canvas.getByPlaceholderText("Enter your email address");
    await userEvent.type(emailField, "johndoe@example.com");

    const passwordField = canvas.getByPlaceholderText("Enter password");
    await userEvent.type(passwordField, "12345678");

    const button = canvas.getByRole("button", { name: "Log in" });
    await userEvent.click(button);
  },
};
