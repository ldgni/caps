import { createClient } from "@supabase/supabase-js";

// Create a Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

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
    // Supabase doesn't require manual schema creation in the same way
    // as Neon/Postgres when using the client library.
    // You would typically create your tables in the Supabase dashboard
    // or use migrations. This function is kept for compatibility.

    return { success: true };
  } catch (error) {
    console.error("Error initializing database:", error);
    return { success: false, error };
  }
}

// Add a subscriber to the newsletter
export async function addSubscriber(email: string) {
  try {
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .insert([{ email }])
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data,
      isNewSubscriber: !!data,
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
    const { data, error } = await supabase
      .from("contact_messages")
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email,
          order_id: orderId,
          message,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data,
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
    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          id: orderId,
          customer_first_name: customerFirstName,
          customer_last_name: customerLastName,
          customer_email: customerEmail,
          shipping_address: shippingAddress,
          shipping_city: shippingCity,
          shipping_postal_code: shippingPostalCode,
          shipping_country: shippingCountry,
          items,
          subtotal,
          shipping_cost: shippingCost,
          total,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error saving order:", error);
    return { success: false, error };
  }
}

// Get order by ID
export async function getOrderById(orderId: string) {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (error && error.code !== "PGRST116") throw error; // PGRST116 is "row not found"

    return {
      success: true,
      data: data || null,
    };
  } catch (error) {
    console.error("Error fetching order:", error);
    return { success: false, error };
  }
}
