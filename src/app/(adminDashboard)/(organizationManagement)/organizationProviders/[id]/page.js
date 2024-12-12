"use client";

import { useEffect, useState } from "react";
import AdminDashboardLayout from "../../../adminLayout";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import OrganizationDetailCard from "@/components/organizationManagement/OrganizationDetailCard";
import { FaEye } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BarLoader } from "react-spinners";

export default function OrganizationProviders() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true);
      try {
        const providersResponse = await axios.get(
          `/api/get-organization-providers?uuid=${id}`
        );
        setProviders(providersResponse.data);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
      setLoading(false);
    };

    fetchProviders();
  }, [id]); // Added `id` as a dependency for proper effect re-execution

  return (
    <AdminDashboardLayout barTitle="Organization Providers">
      {loading ? (
        <div className="flex justify-center">
          <BarLoader />
        </div>
      ) : (
        <>
          <OrganizationDetailCard />
          <table className="w-full table-auto border-collapse mt-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Provider Name</th>
                <th className="px-4 py-2 text-left">Gender</th>
                <th className="px-4 py-2 text-left">DOB</th>
                <th className="px-4 py-2 text-left">License ID</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {providers.length > 0 ? (
                providers.map((provider) => (
                  <tr key={provider.uuid} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">
                      {provider.providers_info.first_name} {provider.providers_info.last_name}
                    </td>
                    <td className="px-4 py-2">{provider.providers_info.gender}</td>
                    <td className="px-4 py-2">{provider.providers_info.dob}</td>
                    <td className="px-4 py-2">{provider.providers_info.license_id}</td>
                    <td className="px-4 py-2 flex justify-start items-center gap-2">
                      <Link
                        href={`/providerDetail/${provider.uuid}`}
                        className="text-green-400"
                      >
                        <FaEye />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    No providers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </AdminDashboardLayout>
  );
}
