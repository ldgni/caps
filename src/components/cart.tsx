"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useCart } from "@/app/cart-context";
import { formatPrice } from "@/lib/utils";

export default function Cart() {
  const { isCartOpen, toggleCart, items, removeFromCart } = useCart();
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const [cartTopPosition, setCartTopPosition] = useState(0);

  useEffect(() => {
    // Function to handle scroll and update cart top position
    const handleScroll = () => {
      // Get header element to calculate its full height including border
      const header = document.querySelector("header");
      const headerHeight = header ? header.offsetHeight : 74;

      const scrollPosition = window.scrollY;

      // If we've scrolled past the header, set cart to top of viewport
      // Otherwise, position it below the visible part of the header
      if (scrollPosition > headerHeight) {
        setCartTopPosition(0);
      } else {
        setCartTopPosition(headerHeight - scrollPosition);
      }
    };

    // Set initial position
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={toggleCart}
        aria-hidden="true"
      />

      {/* Cart panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-3/4 max-w-md transform transition-transform duration-300 sm:w-[350px] md:w-full ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: `${cartTopPosition}px` }}
        aria-label="Shopping cart"
        role="dialog"
        aria-modal="true">
        <div
          className="h-full overflow-y-auto border-l-2 border-[#2e160e] bg-[#efddcc] p-6 shadow-xl"
          onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between border-b border-[#2e160e]/30 pb-4">
            <h2 className="text-2xl font-bold">Cart</h2>
            <button
              onClick={toggleCart}
              className="rounded-full p-1 hover:bg-[#2e160e]/10"
              aria-label="Close cart">
              <X size={20} />
            </button>
          </div>

          <div className="py-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center py-8 text-center text-gray-500">
                <p className="text-lg">Your cart is empty</p>
                <p className="mt-2 text-sm text-[#2e160e]/70">
                  Add some products to your cart
                </p>
              </div>
            ) : (
              <>
                <div className="max-h-[50vh] space-y-4 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between border-b border-[#2e160e]/30 pb-4">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        <p className="mt-1 font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="cursor-pointer text-sm text-red-500 hover:underline"
                        aria-label={`Remove ${item.name} from cart`}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <Link href="/checkout">
                    <button
                      onClick={toggleCart}
                      className="mt-4 w-full cursor-pointer rounded-lg border-2 border-[#2e160e] bg-[#ffc808] px-4 py-2 font-bold text-[#2e160e] shadow-[0_4px_0_0_#2E160E,inset_0_3px_0_0_#FFD337,inset_0_-3px_0_0_#CFA205] transition-all active:translate-y-1 active:shadow-none">
                      Checkout
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
