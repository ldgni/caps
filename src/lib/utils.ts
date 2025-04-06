import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names and Tailwind classes efficiently
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a price with currency symbol
 */
export function formatPrice(price: number, currencyCode = "EUR") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(price);
}

/**
 * Generate a random order ID
 */
export function generateOrderId() {
  return Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
}
