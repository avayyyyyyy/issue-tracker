import NextAuth, { NextAuthOptions } from "next-auth";
import { Options } from "@/utils/authOptions";

const handler = NextAuth(Options);

export {handler as GET, handler as POST}
