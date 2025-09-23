import Google from "next-auth/providers/google";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    authorized: async ({ auth, request }) => {
      if (request.nextUrl.pathname.startsWith("/dashboard")) {
        return !!auth;
      }
      return true;
    },
  },
});
