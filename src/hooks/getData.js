import toast from "react-hot-toast";

export default async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching data:", errorData.message);
      return;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    toast.error(`Failed to fetch data. Please try again.`);
    console.error("Unexpected error fetching data:", error);
  } 
}
