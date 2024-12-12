import { supabase } from "@/lib/supabase";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const provider_id = searchParams.get("uuid");

    if (!provider_id) {
      throw new Error("Provider ID is required.");
    }

    // Perform the SQL query with Supabase's 'from' method, including the WHERE conditions
    const { data, error } = await supabase
      .from("web_portals")
      .select("expiry_date, professional_ids(provider_id)") // Selecting the necessary fields
      .eq("type", "caqh") // filter condition
      .eq("professional_ids.provider_id", provider_id); // filter condition

    if (error) {
      throw new Error(error.message);
    }

    // Filter out rows where expiry_date is null
    const validData = data.filter(item => item.expiry_date !== null);

    // If no valid data found, return a "No data found" message
    if (validData.length === 0) {
      return new Response(JSON.stringify({ message: "No data found" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Get the current date and time
    const now = new Date();

    // Calculate the difference between current time and expiry_date
    const result = validData.map(item => {
      const expiryDate = new Date(item.expiry_date);

      // Calculate the difference in milliseconds
      const diffInMilliseconds = expiryDate - now;

      // Calculate the difference in days, hours, minutes
      const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)); // days
      const diffInHours = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // hours
      const diffInMinutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)); // minutes

      return {
        ...item,
        expiry_diff: {
          days: diffInDays,
          hours: diffInHours,
          minutes: diffInMinutes,
        },
      };
    });

    // Return the result with date differences included
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // Return the error message as a JSON response
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
