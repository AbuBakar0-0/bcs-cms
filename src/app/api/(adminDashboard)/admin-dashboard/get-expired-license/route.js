import { supabase } from "@/lib/supabase";

export async function GET(request) {
  try {
    // Extract the 'uuid' parameter from the request (optional for filtering)
    const searchParams = request.nextUrl.searchParams;
    const uuid = searchParams.get("uuid");

    // Get the current date and the date 30 days in the future
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 30); // Calculate 30 days from today

    // Fetch all provider info data based on expiry date and uuid (optional filter by uuid)
    const { data: providerInfo, error: providerInfoError } = await supabase
      .from("providers_info")
      .select("uuid, first_name, middle_initial, last_name, expiry_date")
      .is("deleted_at", null)
      .eq("added_by", uuid); // Ensure deleted_at is null

    if (providerInfoError) {
      throw new Error(
        `Failed to retrieve provider info: ${providerInfoError.message}`
      );
    }

    if (!providerInfo || providerInfo.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No provider info found",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Create an array of messages based on the expiry date
    const messages = providerInfo
      .map((provider) => {
        const { first_name, middle_initial, last_name, expiry_date } = provider;
        const expiryDate = new Date(expiry_date);
        const daysUntilExpiry = Math.floor(
          (expiryDate - currentDate) / (1000 * 60 * 60 * 24)
        ); // Difference in days

        // Only return records where expiry is today, within 30 days, or already expired
        if (daysUntilExpiry <= 0 || (daysUntilExpiry > 0 && daysUntilExpiry <= 30)) {
          return {
            name: `${first_name} ${middle_initial.trim()}. ${last_name}`,
            type: "License/ID", // Assuming 'License/ID' as a placeholder, update as necessary
            days: daysUntilExpiry, // Return days as a number
          };
        }

        return null; // Filter out records that don't meet the conditions
      })
      .filter((message) => message); // Filter out null values

    // Return an empty array if no data matches the filter
    if (messages.length === 0) {
      return new Response(
        JSON.stringify([]),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Return the filtered list of messages
    return new Response(
      JSON.stringify(messages),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in GET handler:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to retrieve data",
        details: error.message,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}
