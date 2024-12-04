"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Correct import for Next.js
import OrganizationNavbar from "./OrganizationNavbar";
import { BarLoader } from "react-spinners";

const OrganizationCard = () => {
    const { id: uuid } = useParams(); // Extract `uuid` from URL params using `useParams`
    const [organizationData, setOrganizationData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from the API endpoint using `uuid`
                const response = await fetch(`/api/organization-card?uuid=${uuid}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch organization data");
                }
                const data = await response.json();
                setOrganizationData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (uuid) {
            fetchData(); // Fetch data when `uuid` is available
        }
    }, [uuid]);

    if (loading) {
        return <div className="flex justify-center"><BarLoader/></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!organizationData) {
        return <div>No organization data found.</div>;
    }

    return (
        <div className="w-full flex flex-col bg-secondary rounded-lg gap-4 p-4 text-white">
            <div className="w-full flex flex-row justify-between items-center gap-4">
                <div className="w-1/3 flex flex-col justify-start items-start gap-2">
                    <h2 className="text-lg font-semibold text-left">
                        {organizationData.legal_business_name}
                        <br />
                        {organizationData.doing_business_name}
                    </h2>
                    <p>Taxonomy Code: {organizationData.taxonomy_code_1}</p>
                    <p>NPI 2: {organizationData.npi_2}</p>
                    <p>Tax ID: {organizationData.tax_id}</p>
                </div>

                <div className="w-1/3 flex flex-col justify-start items-start gap-2">
                    <p>
                        Address: {organizationData.service_address.address_line_1},{" "}
                        {organizationData.service_address.city},{" "}
                        {organizationData.service_address.state}
                    </p>
                    <p>
                        Taxonomy Code: {organizationData.taxonomy_code_2} : Blood Bank
                    </p>
                    <p>State: {organizationData.service_address.state}</p>
                    <p>Zip Code: {organizationData.service_address.zip_code}</p>
                    <p>Email: {organizationData.service_contact.email}</p>
                </div>
            </div>
            <OrganizationNavbar uuid={uuid}/>
        </div>
    );
};

export default OrganizationCard;
