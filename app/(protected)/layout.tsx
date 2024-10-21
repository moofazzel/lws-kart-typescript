import { auth } from "@/auth";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { CartWishlistProvider } from "@/context/CartWishlistProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kart",
  description: "Kart e-commerce app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  console.log("🚀 ~ session:", session);

  return (
    <html lang="en">
      <body className={inter.className}>
        <CartWishlistProvider>
          <Navbar />
          {children}
        </CartWishlistProvider>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
