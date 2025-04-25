import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { initDb, saveContactMessage } from "@/lib/db";

// Contact form validation schema using Zod
const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please provide a valid email address"),
  orderId: z.string().optional(),
  message: z.string().min(1, "Message is required"),
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
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid form data",
          errors: result.error.format(),
        },
        { status: 400 },
      );
    }

    // Extract validated data
    const { firstName, lastName, email, orderId = "", message } = result.data;

    // Save to database
    const dbResult = await saveContactMessage(
      firstName,
      lastName,
      email,
      orderId,
      message,
    );

    if (!dbResult.success) {
      console.error("Database error:", dbResult.error);
      return NextResponse.json(
        { success: false, message: "Error saving your message" },
        { status: 500 },
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
