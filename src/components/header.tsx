"use client";

import { ArrowBigUpDash, MessageSquareText, ShoppingCart } from "lucide-react";
import Link from "next/link";

import { useCart } from "@/app/cart-context";

export default function Header() {
  const { toggleCart, items } = useCart();
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className="border-b-2 border-[#2e160e]">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold transition-opacity hover:opacity-75">
          <ArrowBigUpDash />
          Caps
        </Link>
        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <Link
                href="/contact"
                className="flex items-center gap-2 rounded-md border-2 border-[#2e160e] bg-[#f9f2eb] px-3 py-2 shadow-[0_4px_0_0_#2E160E,inset_0_3px_0_0_#FFFEF9,inset_0_-3px_0_0_#EBD5BF] transition-all active:translate-y-1 active:shadow-none">
                <MessageSquareText />
                <span className="hidden font-semibold md:inline">Contact</span>
              </Link>
            </li>
            <li>
              <button
                onClick={toggleCart}
                className="relative flex cursor-pointer items-center gap-2 rounded-md border-2 border-[#2e160e] bg-[#f9f2eb] px-3 py-2 shadow-[0_4px_0_0_#2E160E,inset_0_3px_0_0_#FFFEF9,inset_0_-3px_0_0_#EBD5BF] transition-all active:translate-y-1 active:shadow-none"
                aria-label="Open cart">
                <ShoppingCart />
                <span className="hidden font-semibold md:inline">Cart</span>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full border border-black bg-[#ef414a] text-xs text-white">
                    {itemCount}
                  </span>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
