"use client";

import { Keyboard, Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { useCart } from "@/app/cart-context";

export default function HomePage() {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    const product = {
      id: "retro-vhs-keyboard",
      name: "Retro VHS Keyboard",
      price: 99.99,
      quantity: quantity,
    };

    addToCart(product);

    // Show toast notification with product details
    toast.success("Added to cart!", {
      description: `${quantity} x Retro VHS Keyboard — €${(99.99 * quantity).toFixed(2)}`,
    });
  };

  return (
    <main>
      <div className="container mx-auto space-y-4 border-b-2 border-[#2e160e] p-4 md:border-x-2">
        <div className="flex justify-center">
          <div className="flex items-center rounded-full bg-[#2e160e] px-3 py-2">
            <Keyboard className="text-white" />
          </div>
          <span className="rounded-full border-2 border-[#2e160e] px-3 py-2 font-semibold">
            01
          </span>
        </div>
        <h1 className="mb-12 text-center text-4xl font-bold uppercase md:mb-16">
          Retro VHS Keyboard
        </h1>
        <div className="relative">
          <Image
            src="/images/keyboard.jpg"
            alt="Keyboard"
            width={1920}
            height={1200}
            className="max-h-[32rem] rounded-lg border-2 border-[#2e160e] object-cover"
            priority
          />
          <Link
            href="#product-1"
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-105">
            <Image
              src="/images/buy-now.png"
              alt="Buy Now"
              width={200}
              height={100}
              className="size-24 object-contain md:size-32"
            />
          </Link>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          <div className="space-y-4 lg:w-1/2">
            <h2 className="text-xl font-semibold uppercase">First keyboard</h2>
            <p className="text-gray-700">
              Our very first keyboard is a retro VHS keyboard. It is a
              mechanical keyboard with a unique design inspired by the classic
              VHS tapes. The keyboard features a vintage aesthetic with a modern
              twist, making it perfect for both retro enthusiasts and modern
              gamers alike.
            </p>
            <p className="text-gray-700">
              The design pays homage to the iconic VHS era with its color scheme
              and texture patterns. Each keyboard is meticulously crafted to
              deliver both performance and nostalgia.
            </p>
            <p className="text-gray-700">
              We&apos;ve combined cutting-edge keyboard technology with retro
              aesthetics to create a truly unique typing experience that stands
              out from conventional keyboards on the market.
            </p>
            <p className="text-gray-700">
              Whether you&apos;re a content creator, programmer, or just someone
              who appreciates fine keyboards, our Retro VHS Keyboard delivers
              exceptional tactile feedback, durability, and style that will make
              it the centerpiece of your desk setup.
            </p>
          </div>

          <div
            id="product-1"
            className="rounded-lg border-2 border-[#2e160e] p-6 lg:mt-0 lg:w-1/2">
            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Retro VHS Keyboard</h3>
                <div className="text-2xl font-bold text-[#2e160e]">99,99€</div>

                <div className="border-t-2 border-dotted border-[#2e160e] pt-4">
                  <ul className="list-inside list-disc space-y-2 text-gray-700">
                    <li>Durable aluminum frame with vintage finish</li>
                    <li>ANSI/ISO layout options available</li>
                    <li>Hot-swappable MX compatible switches</li>
                    <li>Double-shot PBT keycaps with retro colors</li>
                    <li>USB-C detachable cable with coiled design</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center">
                  <span className="mr-4 font-medium">Quantity:</span>
                  <div className="flex items-center">
                    <button
                      onClick={handleDecreaseQuantity}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-l border border-[#2e160e] bg-gray-100 hover:bg-gray-200"
                      aria-label="Decrease quantity">
                      <Minus size={16} />
                    </button>
                    <div className="flex h-8 min-w-[3rem] items-center justify-center border-y border-[#2e160e] px-2">
                      {quantity}
                    </div>
                    <button
                      onClick={handleIncreaseQuantity}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-r border border-[#2e160e] bg-gray-100 hover:bg-gray-200"
                      aria-label="Increase quantity">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[#2e160e] px-6 py-3 text-white transition-colors hover:bg-[#3d1c11]">
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
