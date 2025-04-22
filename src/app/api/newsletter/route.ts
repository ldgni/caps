import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { addSubscriber, initDb } from "@/lib/db";

// Email validation schema using Zod
const newsletterSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
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

    // Validate email
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Invalid email address" },
        { status: 400 },
      );
    }

    // Add to database
    const { email } = result.data;
    const dbResult = await addSubscriber(email);

    if (!dbResult.success) {
      console.error("Database error:", dbResult.error);
      return NextResponse.json(
        { success: false, message: "Error saving your email" },
        { status: 500 },
      );
    }

    // Return appropriate response based on whether this is a new subscription
    if (dbResult.isNewSubscriber) {
      return NextResponse.json({
        success: true,
        message: "Thank you for subscribing to our newsletter!",
      });
    } else {
      return NextResponse.json({
        success: true,
        message: "You are already subscribed to our newsletter.",
      });
    }
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
