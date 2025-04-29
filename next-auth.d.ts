import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** Default user properties */
      name?: string | null;
      email?: string | null;
      image?: string | null;
      /** Custom properties */
      role?: string;
      id?: string;
      phone_number?: string;
      gender?: string;
    };
  }

  interface User {
    /** Custom user properties returned from your adapter or credentials callback */
    role?: string;
    id?: string;
  }
}
