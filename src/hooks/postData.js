import toast from "react-hot-toast";

export default async function submitForm(data, formRef, fetchReferences, url) {

  try {
    // Make a POST request to the API endpoint
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error submitting data:", errorData.message);
      toast.error("Failed to submit data. Please try again.");
      return;
    }

    const result = await response.json();
    toast.success("Form submitted successfully!");

    // Fetch references after successful form submission
    fetchReferences();

    // Reset the form
    formRef.current.reset();
    return result;
    
  } catch (error) {
    console.error("Unexpected error:", error);
    toast.error("An unexpected error occurred. Please try again.");
  } 
}
