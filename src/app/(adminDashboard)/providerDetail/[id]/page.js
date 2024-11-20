"use client";

import ProvidersNavbar from "@/components/adminDashboard/ProvidersNavbar";
import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { useParams } from "next/navigation";

const ProviderDetail = () => {
	const { id } = useParams(); // Get the provider ID from route params
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

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className="">
			<div className="flex space-x-4 p-4 bg-secondary rounded-lg text-white">
				<div className="w-[12.5%] flex flex-col items-center">
					<CiUser className="border-2 border-white rounded-full size-20 p-2" />
					<h2 className="text-lg font-semibold text-center">
						{provider?.first_name} {provider?.middle_initial || ""} {provider?.last_name}
					</h2>
					<p className="text-sm">Provider type: {provider?.provider_title || "-"}</p>
					<p className="text-sm">Gender: {provider?.gender || "-"}</p>
				</div>

				<div className="flex-grow">
					<h3 className="font-semibold">Provider Information</h3>
					<p>Date of Birth: {provider?.dob || "-"}</p>
					<p>SSN: {provider?.ssn || "-"}</p>
					<p>License ID: {provider?.license_id || "-"}</p>
					<p>State Issued: {provider?.state_issued || "-"}</p>
					<p>Issue Date: {provider?.issue_date || "-"}</p>
					<p>Expiry Date: {provider?.expiry_date || "-"}</p>
				</div>
			</div>

			<ProvidersNavbar />
		</div>
	);
};

export default ProviderDetail;
