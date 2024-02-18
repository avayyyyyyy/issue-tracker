import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import Credentials from "next-auth/providers/credentials";


 export const Options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        Email: { type: "email", placeholder: "Enter your email here" },
        Password: { type: "password", placeholder: "Your Password here" },
      },
      async authorize(credentials, req) {
        if (!credentials?.Email || !credentials?.Password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.Email,
          },
        });
        if (!user) {
          return null;
        }
        if (credentials.Password === user.password) {
          return user;
        }
        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
const handler = NextAuth(Options);
export {handler as GET, handler as POST}
