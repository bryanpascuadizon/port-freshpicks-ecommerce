import NextAuth, { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./db/prisma";
import { compareSync } from "bcrypt-ts-edge";

export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials === null) return null;

        //Find User
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        //Check if sign-in password and user's password match
        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );

          //return user data
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              phone_number: user.phone_number,
            };
          }
        }

        //return null if sign-in password does not match user's password
        return null;
      },
    }),
  ],
  callbacks: {
    //When the session is accessed
    async session({ session, user, trigger, token }: any) {
      //Set user ID from token

      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;

      //If there's a user profile update
      if (trigger === "update") {
        session.user.name = user.name;
      }

      return session;
    },
    //When the jwt is accessed
    async jwt({ session, user, trigger, token }: any) {
      //Assign user fields to token
      if (user) {
        token.id = user.id;
        token.role = user.role;

        //if user has no name, use email
        if (user.name === "NO_NAME") {
          token.name = user.email!.split("@")[0];

          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              name: token.name,
            },
          });
        }
      }

      //If there's a user profile update
      if (session?.user.name && trigger === "update") {
        token.name = session.user.name;
      }

      return token;
    },
    authorized({ request, auth }: any) {
      const protectedPaths = [
        /\/products/,
        /\/cart/,
        /\/user\/(.*)/,
        /\/admin/,
      ];

      const { pathname } = request.nextUrl;

      if (!auth && protectedPaths.some((p) => p.test(pathname))) {
        return false;
      }

      return true; // ✅ always return something
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
