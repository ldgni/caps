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
