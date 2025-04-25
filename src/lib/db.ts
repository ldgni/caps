import { neon } from "@neondatabase/serverless";

// This creates a database connection using the NEON_DATABASE_URL env variable
export const db = neon(process.env.DATABASE_URL!);

// Initialize the database schema if it doesn't exist
export async function initDb() {
  try {
    await db`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await db`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        order_id TEXT,
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    return { success: true };
  } catch (error) {
    console.error("Error initializing database:", error);
    return { success: false, error };
  }
}

// Add a subscriber to the newsletter
export async function addSubscriber(email: string) {
  try {
    const result = await db`
      INSERT INTO newsletter_subscribers (email)
      VALUES (${email})
      ON CONFLICT (email) DO NOTHING
      RETURNING *;
    `;

    return {
      success: true,
      data: result,
      isNewSubscriber: result.length > 0,
    };
  } catch (error) {
    console.error("Error adding subscriber:", error);
    return { success: false, error };
  }
}

// Save a contact message
export async function saveContactMessage(
  firstName: string,
  lastName: string,
  email: string,
  orderId: string,
  message: string,
) {
  try {
    const result = await db`
      INSERT INTO contact_messages (first_name, last_name, email, order_id, message)
      VALUES (${firstName}, ${lastName}, ${email}, ${orderId}, ${message})
      RETURNING *;
    `;

    return {
      success: true,
      data: result[0],
    };
  } catch (error) {
    console.error("Error saving contact message:", error);
    return { success: false, error };
  }
}
