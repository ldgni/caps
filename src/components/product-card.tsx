"use client";

import {
  Keyboard,
  MapPinHouse,
  Minus,
  Package,
  Plus,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { useCart } from "@/app/cart-context";
import { Product } from "@/app/page";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  reversed?: boolean;
}

export function ProductCard({ product, reversed = false }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
    };

    addToCart(cartItem);

    toast.success("Added to cart!", {
      description: `${quantity} x ${product.name} — ${formatPrice(product.price * quantity)}`,
    });
  };

  return (
    <section className="border-b-2 border-[#2e160e]">
      <div className="space-y-4 p-6 sm:p-8">
        <div className="flex justify-center">
          <div className="flex items-center rounded-full bg-[#2e160e] px-3 py-2">
            <Keyboard className="text-white" />
          </div>
          <span className="rounded-full border-2 border-[#2e160e] px-3 py-2 font-semibold">
            {product.section.toString().padStart(2, "0")}
          </span>
        </div>
        <h1 className="mb-12 text-center text-4xl font-bold uppercase md:mb-16">
          {product.name}
        </h1>
        <div className="relative">
          <Image
            src={product.image}
            alt={product.name}
            width={1920}
            height={1200}
            className="max-h-[32rem] rounded-lg border-2 border-[#2e160e] object-cover"
            priority
          />
          <Link
            href={`#product-${product.section}`}
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
        <div
          className={`flex flex-col gap-8 ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} lg:gap-12`}>
          <div className="flex flex-col justify-between space-y-4 lg:w-1/2">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold uppercase">
                {product.section === 1 ? "First keyboard" : "Second keyboard"}
              </h2>
              {product.description.map((paragraph, idx) => (
                <p key={idx} className="text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="flex flex-col gap-2 text-sm sm:flex-row">
              <span className="inline-flex items-center gap-2 rounded-lg border-2 border-[#2e160e] bg-[#ebd5bf] px-3 py-2 font-semibold">
                <Package />
                Shipped within 24/48 hours
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border-2 border-[#2e160e] bg-[#ebd5bf] px-3 py-2 font-semibold">
                <MapPinHouse />
                Sent from Switzerland
              </span>
            </div>
          </div>
          <div
            id={`product-${product.section}`}
            className="flex items-start rounded-lg border-2 border-[#2e160e] p-6 lg:mt-0 lg:w-1/2">
            <div className="flex h-full w-full flex-col justify-between gap-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <div className="text-2xl font-bold text-[#2e160e]">
                  {formatPrice(product.price)}
                </div>
                <div className="border-t-2 border-dotted border-[#2e160e] pt-4">
                  <ul className="list-inside list-disc space-y-2 text-gray-700">
                    {product.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
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
    </section>
  );
}
