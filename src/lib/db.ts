import { neon } from "@neondatabase/serverless";

// This creates a database connection using the NEON_DATABASE_URL env variable
export const db = neon(process.env.DATABASE_URL!);

// Define types for our order items
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

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

    await db`
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        customer_first_name TEXT NOT NULL,
        customer_last_name TEXT NOT NULL,
        customer_email TEXT NOT NULL,
        shipping_address TEXT NOT NULL,
        shipping_city TEXT NOT NULL,
        shipping_postal_code TEXT NOT NULL,
        shipping_country TEXT NOT NULL,
        items JSONB NOT NULL,
        subtotal DECIMAL NOT NULL,
        shipping_cost DECIMAL NOT NULL,
        total DECIMAL NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
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

// Save an order
export async function saveOrder(
  orderId: string,
  customerFirstName: string,
  customerLastName: string,
  customerEmail: string,
  shippingAddress: string,
  shippingCity: string,
  shippingPostalCode: string,
  shippingCountry: string,
  items: OrderItem[],
  subtotal: number,
  shippingCost: number,
  total: number,
) {
  try {
    const result = await db`
      INSERT INTO orders (
        id, 
        customer_first_name, 
        customer_last_name, 
        customer_email, 
        shipping_address, 
        shipping_city, 
        shipping_postal_code, 
        shipping_country, 
        items, 
        subtotal, 
        shipping_cost, 
        total
      )
      VALUES (
        ${orderId}, 
        ${customerFirstName}, 
        ${customerLastName}, 
        ${customerEmail}, 
        ${shippingAddress}, 
        ${shippingCity}, 
        ${shippingPostalCode}, 
        ${shippingCountry}, 
        ${JSON.stringify(items)}, 
        ${subtotal}, 
        ${shippingCost}, 
        ${total}
      )
      RETURNING *;
    `;

    return {
      success: true,
      data: result[0],
    };
  } catch (error) {
    console.error("Error saving order:", error);
    return { success: false, error };
  }
}

// Get order by ID
export async function getOrderById(orderId: string) {
  try {
    const result = await db`
      SELECT * FROM orders 
      WHERE id = ${orderId}
      LIMIT 1;
    `;

    return {
      success: true,
      data: result[0] || null,
    };
  } catch (error) {
    console.error("Error fetching order:", error);
    return { success: false, error };
  }
}
