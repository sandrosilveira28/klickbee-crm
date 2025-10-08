import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // our Prisma user id
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
  }
}
