"use client";

import { useEffect, useState } from "react";
import AdminDashboardLayout from "@/app/(adminDashboard)/adminLayout";
import OrganizationCard from "@/components/organizationManagement/OrganizationCard";
import axios from "axios";
import { useParams } from "next/navigation";
import { FaEye, FaUserCircle } from "react-icons/fa";
import Link from "next/link";

export default function OrganizationDetail() {
  const { id: uuid } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/organization-detail?uuid=${uuid}`
        );
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
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">DOB</th>
                      <th className="px-4 py-2 text-left">Cell Phone</th>
                      <th className="px-4 py-2 text-left">Driving License / ID</th>
                      <th className="px-4 py-2 text-left">SSN</th>
                      <th className="px-4 py-2 text-left">NPI</th>
                      <th className="px-4 py-2 text-left">Tax ID</th>
                      <th className="px-4 py-2 text-left">UPIN</th>
                      <th className="px-4 py-2 text-left">Image</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((location, index) =>
                      location.practice_location_providers.map(
                        (provider, subIndex) => (
                          <tr className="border-b" key={`${index}-${subIndex}`}>
                            <td className="p-3">
                              {provider.providers_info.first_name}
                              {provider.providers_info.middle_initial.trim()}
                              {provider.providers_info.last_name} -
                              {provider.providers_info.provider_title}
                            </td>
                            <td className="p-3">
                              {provider.providers_info.dob.split("-")[1] ||
                                "N/A"}
                              -
                              {provider.providers_info.dob.split("-")[2] ||
                                "N/A"}
                              -
                              {provider.providers_info.dob.split("-")[0] ||
                                "N/A"}
                            </td>

                            <td className="px-4 py-2 uppercase">
                              {provider.providers_info.contact.cell_phone}
                            </td>
                            <td className="px-4 py-2 uppercase">
                              {provider.providers_info.license_id}
                            </td>

                            <td className="px-4 py-2">
                              ***-**-{provider.providers_info.ssn.split("-")[2] || "Unknown"}
                            </td>
                            <td className="px-4 py-2">
                              {provider.providers_info.professional_ids.length != 0
                                ? provider.providers_info.professional_ids[
                                    provider.providers_info?.professional_ids.length - 1
                                  ].npi_1
                                : "N/A"}
                            </td>
                            <td className="px-4 py-2">
                              {provider.providers_info.professional_ids.length != 0
                                ? provider.providers_info.professional_ids[
                                    provider.providers_info?.professional_ids.length - 1
                                  ].tax_id
                                : "N/A"}
                            </td>
                            <td className="px-4 py-2">
                              {provider.providers_info.professional_ids.length != 0
                                ? provider.providers_info.professional_ids[
                                    provider.providers_info?.professional_ids.length - 1
                                  ].upin
                                : "N/A"}
                            </td>

                            <td className="p-3">
                              {provider.providers_info.picture_url ? (
                                <img
                                  src={provider.providers_info.picture_url}
                                  alt={`${provider.providers_info.first_name} ${provider.providers_info.last_name}`}
                                  className="w-16 h-16 rounded-full"
                                />
                              ) : (
                                <FaUserCircle className="size-16" />
                              )}
                            </td>
                            <td className="p-3">
                            <Link
                        href={`/providerDetail/${provider.providers_info.uuid}`}
                        className="text-green-400"
                      >
                        <FaEye />
                      </Link>

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
