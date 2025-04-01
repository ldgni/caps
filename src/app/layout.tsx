import "./globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { CartProvider } from "@/app/cart-context";
import Cart from "@/components/cart";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Limited Edition Keyboards",
  description: "Your one-stop shop for limited edition keyboards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-y-scroll">
      <body
        className={`${geist.className} bg-[#f2e3d4] text-[#2e160e]`}
        style={{ "--header-height": "74px" } as React.CSSProperties}>
        <CartProvider>
          <Header />
          <Cart />
          {children}
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
