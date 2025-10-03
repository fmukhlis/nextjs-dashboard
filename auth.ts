import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { NextResponse } from "next/server";
import { SignInSchema } from "./features/user/schema";
import { getUserByEmail } from "./features/user/dal/query";

export const nextAuthResult = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const parsedCredentials = SignInSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUserByEmail(email);

          if (user) {
            const isPasswordsMatch = await bcrypt.compare(
              password,
              user.password,
            );

            if (isPasswordsMatch) {
              return user;
            }
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth, request }) => {
      if (request.nextUrl.pathname.startsWith("/dashboard")) {
        return !!auth;
      }
      if (request.nextUrl.pathname === "/signin" && !!auth) {
        return NextResponse.redirect(new URL("/", request.nextUrl.origin));
      }
      return true;
    },
  },
  pages: {
    signIn: "/signin",
  },
});

export { AuthError } from "next-auth";

// For testing-only
type NextAuthResultKey = keyof typeof nextAuthResult;

export function __setNextAuthResult<T extends NextAuthResultKey>(
  key: T,
  callback: (prev: (typeof nextAuthResult)[T]) => (typeof nextAuthResult)[T],
) {
  throw new Error(
    "This function is for testing only and should not be invoked outside tests.",
  );
  callback(nextAuthResult[key]);
}
