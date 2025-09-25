"use server";

import { AuthError, nextAuthResult } from "@/auth";

export async function authenticate(_: string | undefined, formData: FormData) {
  const { signIn } = nextAuthResult;
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
