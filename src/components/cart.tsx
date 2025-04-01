"use client";

import { useEffect, useState } from "react";

import { useCart } from "@/app/cart-context";

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
      <div
        className={`fixed inset-0 z-40 ${
          isCartOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={toggleCart}
      />
      <div
        className={`fixed inset-y-0 right-0 z-50 w-3/4 max-w-md transform transition-transform duration-300 sm:w-[350px] md:w-full ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: `${cartTopPosition}px` }}>
        <div
          className="h-full overflow-y-auto border-l-2 border-[#2e160e] bg-[#efddcc] p-6 shadow-xl"
          onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between pb-4">
            <h2 className="text-2xl font-bold">Cart</h2>
          </div>

          <div className="py-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center text-gray-500">
                <p className="text-lg">Your cart is empty</p>
                <p className="mt-2">Add some products to your cart</p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between border-b border-[#2e160e] pb-4">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        <p className="mt-1 font-medium">
                          €{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="cursor-pointer text-sm text-red-500 hover:underline">
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                  <button className="mt-4 w-full cursor-pointer rounded-lg border-2 border-[#2e160e] bg-[#ffc808] px-4 py-2 font-bold text-[#2e160e] shadow-[0_4px_0_0_#2E160E,inset_0_3px_0_0_#FFD337,inset_0_-3px_0_0_#CFA205] transition-all active:translate-y-1 active:shadow-none">
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
