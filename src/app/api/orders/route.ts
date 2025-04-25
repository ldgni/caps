import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { initDb, saveOrder } from "@/lib/db";

// Order validation schema using Zod
const orderSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  shippingInfo: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Please provide a valid email address"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
  }),
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      price: z.number().positive(),
      quantity: z.number().int().positive(),
    }),
  ),
  subtotal: z.number().nonnegative(),
  shippingCost: z.number().nonnegative(),
  total: z.number().positive(),
});

// Initialize the database on first API call
let isDbInitialized = false;

export async function POST(request: NextRequest) {
  try {
    // Initialize database if needed
    if (!isDbInitialized) {
      await initDb();
      isDbInitialized = true;
    }

    // Parse request body
    const body = await request.json();

    // Validate form data
    const result = orderSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid order data",
          errors: result.error.format(),
        },
        { status: 400 },
      );
    }

    // Extract validated data
    const { orderId, shippingInfo, items, subtotal, shippingCost, total } =
      result.data;

    // Save to database
    const dbResult = await saveOrder(
      orderId,
      shippingInfo.firstName,
      shippingInfo.lastName,
      shippingInfo.email,
      shippingInfo.address,
      shippingInfo.city,
      shippingInfo.postalCode,
      shippingInfo.country,
      items,
      subtotal,
      shippingCost,
      total,
    );

    if (!dbResult.success) {
      console.error("Database error:", dbResult.error);
      return NextResponse.json(
        { success: false, message: "Error processing your order" },
        { status: 500 },
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Order created successfully",
      orderId: orderId,
    });
  } catch (error) {
    console.error("Order API error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, message: "Method not supported" },
    { status: 405 },
  );
}
