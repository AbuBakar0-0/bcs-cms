"use client";

import { useEffect, useState } from 'react';
import ProvidersNavbar from './ProvidersNavbar';
import { ClipLoader } from "react-spinners";

const ProvidersCard = ({ id = "2d72b894-f3e2-4f13-9c2a-05b6852befbf" }) => {  // Accept id as a prop
    const [provider, setProvider] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        // Fetch provider details when the component mounts
        const fetchProviderDetails = async () => {
            try {
                const response = await fetch(`/api/providers/${id}`);
                if (!response.ok) throw new Error("Failed to fetch provider details");

                const data = await response.json();
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
        return <ClipLoader />; // Show loading spinner while fetching
    }

    if (error) {
        return <div className="text-red-500">{error}</div>; // Show error message if something goes wrong
    }

    return (
        <div className="w-full flex flex-col bg-secondary rounded-lg gap-4 p-4 text-white">
            <div className="w-full flex flex-row justify-start items-center gap-4">
                <div className="w-1/3 flex flex-col justify-start items-start gap-2">
                    <h2 className="text-lg font-semibold text-center">
                        {provider?.first_name} {provider?.middle_initial || ""}{" "}
                        {provider?.last_name}
                    </h2>
                    <p className="text-sm">
                        Provider type: {provider?.provider_title || "-"}
                    </p>
                    <p className="text-sm">Gender: {provider?.gender || "Female"}</p>
                </div>
                <div className="w-1/4 flex flex-col justify-start items-start gap-2">
                    <p>NPI-1: 1902948326</p>
                    <p>Cell #: 281-727-0701</p>
                    <p>Email: Lttran@sfachc.org</p>
                    <p>Date of Birth: {provider?.dob || "-"}</p>
                    <p>SSN: {provider?.ssn || "-"}</p>
                </div>
                <div className="w-1/4 flex flex-col justify-start items-start gap-2">
                    <p>Address: 6809 Adella Court</p>
                    <p>License ID: {provider?.license_id || "-"}</p>
                    <p>State Issued: {provider?.state_issued || "-"}</p>
                    <p>Issue Date: {provider?.issue_date || "-"}</p>
                    <p>Expiry Date: {provider?.expiry_date || "-"}</p>
                </div>
            </div>
            <ProvidersNavbar id={id} />
        </div>
    );
};

export default ProvidersCard;
