import "next-auth";

declare module "next-auth" {
  interface Session {
    callbackUrl?: string;
    id: string;
    email: string;
    fullName: string;
    role: string;
    callbackUrl?: string;
  }

  interface User {
    id: string;
    fullName: string;
    role: string;
  }

  interface JWT {
    id: string;
    fullName: string;
    role: string;
    callbackUrl?: string;
  }
}
