"use client";
import { useState, useEffect } from "react";

export const useProviders = () => {
	const [providers, setProviders] = useState(["Select Provider"]);
	const [providersData, setProvidersData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProviders = async () => {
			try {
				setLoading(true);
				const response = await fetch("/api/providers-info");
				if (!response.ok) {
					throw new Error("Failed to fetch providers");
				}
				const { provider: data } = await response.json();

				if (!Array.isArray(data)) {
					throw new Error("Invalid data format received from server");
				}

				const dropdownOptions = [
					"Select Provider",
					...data.map(
						(provider) => `${provider.first_name} ${provider.last_name}`
					),
				];

				setProviders(dropdownOptions);
				setProvidersData(data);
			} catch (err) {
				setError(err.message);
				console.error("Error fetching providers:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchProviders();
	}, []);

	const getProviderByName = (fullName) => {
		if (fullName === "Select Provider") return null;
		return providersData.find(
			(provider) => `${provider.first_name} ${provider.last_name}` === fullName
		);
	};

	const getProviderByUuid = (uuid) => {
		return providersData.find((provider) => provider.uuid === uuid);
	};

	return {
		providers,
		providersData,
		getProviderByName,
		getProviderByUuid,
		loading,
		error,
	};
};
