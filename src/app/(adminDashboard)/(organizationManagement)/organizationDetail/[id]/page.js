"use client";

import { useEffect, useState } from "react";
import AdminDashboardLayout from "@/app/(adminDashboard)/adminLayout";
import OrganizationCard from "@/components/organizationManagement/OrganizationCard";
import axios from "axios";
import { useParams } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";

export default function OrganizationDetail() {
  const { id: uuid } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/organization-detail?uuid=${uuid}`);
        setData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [uuid]);

  return (
    <AdminDashboardLayout barTitle="Organization Management">
      <OrganizationCard />
      <div className="min-h-screen flex flex-col md:flex-row">
        <main className="flex-1 py-4">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-4 text-center"></div>
              ) : error ? (
                <div className="p-4 text-center text-red-500">{error}</div>
              ) : (
                <table className="w-full table-auto">
                  <thead className="bg-gray-200 text-left">
                    <tr>
                      <th className="p-3">Name</th>
                      <th className="p-3">Gender</th>
                      <th className="p-3">Birth City</th>
                      <th className="p-3">Provider Title</th>
                      <th className="p-3">License Id</th>
                      <th className="p-3">Picture</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((location, index) =>
                      location.practice_location_providers.map(
                        (provider, subIndex) => (
                          <tr className="border-b" key={`${index}-${subIndex}`}>
                            <td className="p-3">
                              {provider.providers_info.first_name}{" "}
                              {provider.providers_info.middle_initial.trim()}{" "}
                              {provider.providers_info.last_name}
                            </td>
                            <td className="p-3">
                              {provider.providers_info.gender}
                            </td>
                            <td className="p-3">
                              {provider.providers_info.birth_city}
                            </td>
                            <td className="p-3">
                              {provider.providers_info.provider_title}
                            </td>
                            <td className="p-3">
                              {provider.providers_info.license_id}
                            </td>
                            <td className="p-3">
                              {provider.providers_info.picture_url ? (
                                <img
                                  src={provider.providers_info.picture_url}
                                  alt={`${provider.providers_info.first_name} ${provider.providers_info.last_name}`}
                                  className="w-16 h-16 rounded-full"
                                />
                              ) : (
                                <FaUserCircle className="size-16"/>
                              )}
                            </td>
                          </tr>
                        )
                      )
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>
    </AdminDashboardLayout>
  );
}
