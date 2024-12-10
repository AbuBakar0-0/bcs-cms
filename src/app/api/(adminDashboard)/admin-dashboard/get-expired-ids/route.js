import { supabase } from "@/lib/supabase";

export async function GET(request) {
  try {
    // Extract the 'uuid' parameter from the request (optional for filtering)
    const searchParams = request.nextUrl.searchParams;
    const uuid = searchParams.get("uuid");

    // Get the current date
    const currentDate = new Date();

    // Fetch the professional IDs
    const { data: professionalIds, error: professionalIdsError } = await supabase
      .from('professional_ids')
      .select('uuid, provider_id')
      .is('deleted_at', null);  // Ensure that deleted_at is NULL (not deleted)

    if (professionalIdsError) {
      throw new Error(`Failed to retrieve professional_ids: ${professionalIdsError.message}`);
    }

    if (!professionalIds || professionalIds.length === 0) {
      return new Response(
        JSON.stringify([]),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Fetch the providers info based on provider_id
    const providerIds = professionalIds.map((pi) => pi.provider_id); // Extract provider_ids to filter by
    const { data: providerInfo, error: providerInfoError } = await supabase
      .from('providers_info')
      .select('uuid, first_name, middle_initial, last_name')
      .in('uuid', providerIds)
      .eq("added_by", uuid)  // Get only the relevant providers
      .is('deleted_at', null);

    if (providerInfoError) {
      throw new Error(`Failed to retrieve providers_info: ${providerInfoError.message}`);
    }

    // Fetch the info numbers data with expiry date condition
    const { data: infoNumbers, error: infoNumbersError } = await supabase
      .from('info_numbers')
      .select('professional_id, expiry_date, type')
      .is('deleted_at', null);

    if (infoNumbersError) {
      throw new Error(`Failed to retrieve info_numbers: ${infoNumbersError.message}`);
    }

    // Generate the list of objects for each provider's info numbers
    const result = professionalIds.flatMap((pi) => {
      const provider = providerInfo.find(p => p.uuid === pi.provider_id); // Find the matching provider
      const info = infoNumbers.filter(inb => inb.professional_id === pi.uuid); // Find the matching info numbers

      // Format the response for info numbers
      return info.map(inb => {
        const expiryDate = new Date(inb.expiry_date);
        const timeDiff = expiryDate - currentDate;
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24)); // Calculate the difference in days

        // Only include records that are expired, expiring today, or expiring in the next 30 days
        if (daysDiff <= 0 || (daysDiff > 0 && daysDiff <= 30)) {
          return {
            name: `${provider.first_name} ${provider.middle_initial.trim()} ${provider.last_name}`,
            type: inb.type,
            days: daysDiff,  // Return days as a number without any message
          };
        }

        return null; // Filter out records that don't meet the conditions
      }).filter(message => message); // Filter out null values
    });

    // Return an empty array if no data matches the filter
    if (result.length === 0) {
      return new Response(
        JSON.stringify([]),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Return the list of formatted objects
    return new Response(
      JSON.stringify(result),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in GET handler:", error);
    return new Response(
      JSON.stringify({
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
