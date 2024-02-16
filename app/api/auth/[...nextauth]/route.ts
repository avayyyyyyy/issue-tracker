import NextAuth, { getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/prisma/client"
import { getSession } from "next-auth/react"
 
const handler = NextAuth({
    adapter: PrismaAdapter(prisma)
    ,
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret:process.env.GITHUB_CLIENT_SECRET!
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session:{
        strategy:"jwt"
    }
})


export { handler as GET, handler as POST }
export const getAuthSession = () => {
  return getSession(handler);
};