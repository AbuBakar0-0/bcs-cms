"use client";

import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import ProvidersNavbar from "./ProvidersNavbar";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

const ProvidersCard = ({ id }) => {
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [ssnVisible, setSsnVisible] = useState(false); // Toggle state for SSN visibility

  useEffect(() => {
    // Fetch provider details when the component mounts
    const fetchProviderDetails = async () => {
      try {
        const response = await fetch(`/api/providers/${id}`);
        if (!response.ok) throw new Error("Failed to fetch provider details");

        const data = await response.json();
        console.log(data);
        setProvider(data.provider);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProviderDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <BarLoader />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; // Show error message if something goes wrong
  }

  return (
    <div className="w-full flex flex-col bg-secondary rounded-lg gap-4 p-4 text-white">
      <div className="w-full flex flex-row justify-start items-center gap-4">
        <div className="w-1/3 flex flex-col justify-center items-center gap-2">
          <div className="w-full flex flex-row gap-4">
            {provider.picture_url ? (
              <img
                src={provider.picture_url}
                alt="Provider"
                className="size-28 rounded-full"
              />
            ) : (
              <FaUserCircle className="size-16" />
            )}

            <div className="flex flex-col justify-center items-start gap-1">
              <h2 className="text-lg font-semibold text-center">
                {provider?.first_name} {provider?.middle_initial || ""}{" "}
                {provider?.last_name}
              </h2>
              <p className="text-sm">
                Provider type: {provider?.provider_title || "-"}
              </p>
              <p className="text-sm">Gender: {provider?.gender || "Female"}</p>
            </div>
          </div>
        </div>

        <div className="w-1/5 flex flex-col justify-start items-start gap-2">
          <p>Email: {provider?.contact?.email || "-"}</p>
          <p>Date of Birth: {provider?.dob || "-"}</p>
          <p>Birth City: {provider?.birth_city || "-"}</p>
          <p>Birth Country: {provider?.birth_country || "-"}</p>
        </div>
        <div className="w-1/5 flex flex-col justify-start items-start gap-2">
          <p>License ID: {provider?.license_id || "-"}</p>
          <p>State Issued: {provider?.state_issued || "-"}</p>
          <p>Issue Date: {provider?.issue_date || "-"}</p>
          <p>Expiry Date: {provider?.expiry_date || "-"}</p>
        </div>
        <div className="w-1/5 flex flex-col justify-start items-start gap-2">
          <p className="flex justify-start items-center gap-2">
            SSN:{" "}
            {ssnVisible
              ? provider?.ssn || "-"
              : provider?.ssn?.replace(/.(?=.{4})/g, "*") || "-"}
            <button
              onClick={() => setSsnVisible((prev) => !prev)}
              className="text-sm text-blue-500"
            >
              {ssnVisible ? <FaEyeSlash className="text-white" /> : <FaEye className="text-white" />}
            </button>
          </p>
          <p>NPI-1: {provider?.npi || "-"}</p>
          <p>Cell #: {provider?.contact?.phone || "-"}</p>
        </div>
      </div>
      <ProvidersNavbar id={id} />
    </div>
  );
};

export default ProvidersCard;
