"use client";

import { Keyboard, Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { useCart } from "@/app/cart-context";

export default function HomePage() {
  const [quantity1, setQuantity1] = useState(1);
  const [quantity2, setQuantity2] = useState(1);
  const { addToCart } = useCart();

  const handleDecreaseQuantity1 = () => {
    setQuantity1((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncreaseQuantity1 = () => {
    setQuantity1((prev) => prev + 1);
  };

  const handleDecreaseQuantity2 = () => {
    setQuantity2((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncreaseQuantity2 = () => {
    setQuantity2((prev) => prev + 1);
  };

  const handleAddToCart1 = () => {
    const product = {
      id: "retro-vhs-keyboard",
      name: "Retro VHS Keyboard",
      price: 99.99,
      quantity: quantity1,
    };

    addToCart(product);

    // Show toast notification with product details
    toast.success("Added to cart!", {
      description: `${quantity1} x Retro VHS Keyboard — €${(99.99 * quantity1).toFixed(2)}`,
    });
  };

  const handleAddToCart2 = () => {
    const product = {
      id: "8bit-mechanical-keyboard",
      name: "8-Bit Mechanical Keyboard",
      price: 119.99,
      quantity: quantity2,
    };

    addToCart(product);

    // Show toast notification with product details
    toast.success("Added to cart!", {
      description: `${quantity2} x 8-Bit Mechanical Keyboard — €${(119.99 * quantity2).toFixed(2)}`,
    });
  };

  return (
    <main>
      <div className="container mx-auto border-[#2e160e] md:border-x-2">
        {/* First Product - VHS Keyboard */}
        <section className="border-b-2 border-[#2e160e]">
          <div className="space-y-4 p-4 pb-8">
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
                src="/images/keyboard-vhs.jpg"
                alt="Retro VHS Keyboard"
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
                <h2 className="text-xl font-semibold uppercase">
                  First keyboard
                </h2>
                <p className="text-gray-700">
                  Our very first keyboard is a retro VHS keyboard. It is a
                  mechanical keyboard with a unique design inspired by the
                  classic VHS tapes. The keyboard features a vintage aesthetic
                  with a modern twist, making it perfect for both retro
                  enthusiasts and modern gamers alike.
                </p>
                <p className="text-gray-700">
                  The design pays homage to the iconic VHS era with its color
                  scheme and texture patterns. Each keyboard is meticulously
                  crafted to deliver both performance and nostalgia.
                </p>
                <p className="text-gray-700">
                  We&apos;ve combined cutting-edge keyboard technology with
                  retro aesthetics to create a truly unique typing experience
                  that stands out from conventional keyboards on the market.
                </p>
                <p className="text-gray-700">
                  Whether you&apos;re a content creator, programmer, or just
                  someone who appreciates fine keyboards, our Retro VHS Keyboard
                  delivers exceptional tactile feedback, durability, and style
                  that will make it the centerpiece of your desk setup.
                </p>
              </div>
              <div
                id="product-1"
                className="rounded-lg border-2 border-[#2e160e] p-6 lg:mt-0 lg:w-1/2">
                <div className="flex flex-col gap-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Retro VHS Keyboard</h3>
                    <div className="text-2xl font-bold text-[#2e160e]">
                      99,99€
                    </div>
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
                          onClick={handleDecreaseQuantity1}
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-l border border-[#2e160e] bg-gray-100 hover:bg-gray-200"
                          aria-label="Decrease quantity">
                          <Minus size={16} />
                        </button>
                        <div className="flex h-8 min-w-[3rem] items-center justify-center border-y border-[#2e160e] px-2">
                          {quantity1}
                        </div>
                        <button
                          onClick={handleIncreaseQuantity1}
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-r border border-[#2e160e] bg-gray-100 hover:bg-gray-200"
                          aria-label="Increase quantity">
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={handleAddToCart1}
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[#2e160e] px-6 py-3 text-white transition-colors hover:bg-[#3d1c11]">
                      <ShoppingCart size={20} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Second Product - 8-Bit Keyboard */}
        <section>
          <div className="space-y-4 p-4">
            <div className="flex justify-center">
              <div className="flex items-center rounded-full bg-[#2e160e] px-3 py-2">
                <Keyboard className="text-white" />
              </div>
              <span className="rounded-full border-2 border-[#2e160e] px-3 py-2 font-semibold">
                02
              </span>
            </div>
            <h1 className="mb-12 text-center text-4xl font-bold uppercase md:mb-16">
              8-Bit Mechanical Keyboard
            </h1>
            <div className="relative">
              <Image
                src="/images/keyboard-8bit.jpg"
                alt="8-Bit Mechanical Keyboard"
                width={1920}
                height={1200}
                className="max-h-[32rem] rounded-lg border-2 border-[#2e160e] object-cover"
                priority
              />
              <Link
                href="#product-2"
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
            <div className="flex flex-col gap-8 lg:flex-row-reverse lg:gap-12">
              <div className="space-y-4 lg:w-1/2">
                <h2 className="text-xl font-semibold uppercase">
                  Second keyboard
                </h2>
                <p className="text-gray-700">
                  Introducing our 8-Bit Mechanical Keyboard, a nostalgic tribute
                  to the golden age of gaming. This keyboard combines the
                  tactile satisfaction of modern mechanical switches with a
                  design inspired by classic 8-bit gaming systems from the
                  1980s.
                </p>
                <p className="text-gray-700">
                  Each key press delivers that satisfying click reminiscent of
                  the controllers and computers that defined an era of gaming
                  history. The pixel-art inspired keycaps and vibrant color
                  scheme instantly transport you back to the days of
                  sprite-based graphics and chiptune soundtracks.
                </p>
                <p className="text-gray-700">
                  We&apos;ve carefully balanced retro aesthetics with modern
                  functionality, creating a keyboard that&apos;s not just a
                  visual statement but a high-performance typing and gaming
                  tool. The custom LED lighting can be programmed to display
                  pixel-art patterns or react to your keystrokes.
                </p>
                <p className="text-gray-700">
                  Perfect for gamers, developers with a fondness for retro
                  computing, or anyone who appreciates the distinctive visual
                  style of early digital culture. The 8-Bit Mechanical Keyboard
                  isn&apos;t just a peripheral—it&apos;s a piece of computing
                  history reimagined for the modern desk.
                </p>
              </div>
              <div
                id="product-2"
                className="rounded-lg border-2 border-[#2e160e] p-6 lg:mt-0 lg:w-1/2">
                <div className="flex flex-col gap-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">
                      8-Bit Mechanical Keyboard
                    </h3>
                    <div className="text-2xl font-bold text-[#2e160e]">
                      119,99€
                    </div>
                    <div className="border-t-2 border-dotted border-[#2e160e] pt-4">
                      <ul className="list-inside list-disc space-y-2 text-gray-700">
                        <li>Retro pixel-art inspired keycap design</li>
                        <li>
                          RGB backlighting with programmable 8-bit patterns
                        </li>
                        <li>Clicky blue mechanical switches</li>
                        <li>N-key rollover for gaming performance</li>
                        <li>
                          Durable construction with classic console-inspired
                          colors
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center">
                      <span className="mr-4 font-medium">Quantity:</span>
                      <div className="flex items-center">
                        <button
                          onClick={handleDecreaseQuantity2}
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-l border border-[#2e160e] bg-gray-100 hover:bg-gray-200"
                          aria-label="Decrease quantity">
                          <Minus size={16} />
                        </button>
                        <div className="flex h-8 min-w-[3rem] items-center justify-center border-y border-[#2e160e] px-2">
                          {quantity2}
                        </div>
                        <button
                          onClick={handleIncreaseQuantity2}
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-r border border-[#2e160e] bg-gray-100 hover:bg-gray-200"
                          aria-label="Increase quantity">
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={handleAddToCart2}
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[#2e160e] px-6 py-3 text-white transition-colors hover:bg-[#3d1c11]">
                      <ShoppingCart size={20} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
