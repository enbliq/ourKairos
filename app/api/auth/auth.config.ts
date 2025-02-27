import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.email === "user@example.com" &&
          credentials?.password === "password"
        ) {
          return { id: "1", email: credentials.email, isAdmin: false };
        }
        if (
          credentials?.email === "admin@example.com" &&
          credentials?.password === "password"
        ) {
          return { id: "1", email: credentials.email, isAdmin: true };
        }

        return null;
      },
    }),
  ],

  pages: {
    signIn: "/enter",
    error: "/error",
  },

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
  },
};
