import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      fullName: string;
    };
  }

  interface User {
    id: string;
    email: string;
    fullName: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    fullName: string;
  }
}
