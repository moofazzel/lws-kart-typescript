// import { getToken } from "next-auth/jwt";
// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";

import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";

// const secret = process.env.secret;

// export async function middleware(req: NextRequest) {
//   const token = await getToken({ req, secret });
//   console.log("🚀 ~ token:", token);

//   // If no token is found, redirect to the login page
//   if (!token) {
//     const requestedPage = req.nextUrl.pathname; // Get the URL the user was trying to access
//     const url = req.nextUrl.clone();
//     url.pathname = "/login"; // Redirect to login
//     url.searchParams.set("callbackUrl", requestedPage); // Save original path for redirect after login
//     return NextResponse.redirect(url);
//   }

//   // Allow access to the route if token is valid
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/account/:path*", "/wishlist/:path*", "/cart/:path*"],
// };

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isAuthentication = !!req.auth;
  console.log("🚀 ~ isAuthentication:", isAuthentication);

  if (!isAuthentication) {
    const requestedPage = req.nextUrl.pathname; // Get the URL the user was trying to access
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login"; // Redirect to login
    loginUrl.searchParams.set("callbackUrl", requestedPage); // Save original path for redirect after login
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/account/:path*", "/wishlist/:path*", "/cart/:path*"],
};
