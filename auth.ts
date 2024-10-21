import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { authConfig } from "./auth.config";
import dbConnect from "./lib/mongodb";
import { User } from "./model/user-model";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (credentials === null) return null;

        await dbConnect();
        const foundUser = await User.findOne({ email: credentials.email });
        if (!foundUser) {
          throw new Error("Incorrect email");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          foundUser.password
        );
        if (!isValidPassword) {
          throw new Error("Incorrect password");
        }

        return foundUser;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      //  Show user consent page for show more info
      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code",
      //   },
      // },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect();

      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        const newUser = new User({
          fullName: user.name,
          email: user.email,
          role: "customer",
        });
        await newUser.save();
      } else {
        existingUser.fullName = user.name;
        await existingUser.save();
      }

      return true;
    },

    async jwt({ token, user, account }) {
      if (account) {
        token.callbackUrl = account.callbackUrl || "/";
      }
      if (user) {
        token.id = user.id;
        token.fullName = user.fullName;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.fullName = token.fullName as string;
      session.user.role = token.role as string;
      session.callbackUrl = token.callbackUrl || "/"; // Default redirect to home if no callbackUrl is passed
      return session;
    },
  },
});
