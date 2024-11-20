import { useState } from "react";
import axios from "axios";

export const useSubmitForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitForm = async (url, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(url, data);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data || "An error occurred");
      throw err;
    }
  };

  return { submitForm, loading, error };
};
