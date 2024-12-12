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

export default function OrganizationLocation() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const locationsResponse = await axios.get(
          `/api/get-organization-location?uuid=${id}`
        );
        setLocations(locationsResponse.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
      setLoading(false);
    };

    fetchLocations();
  }, [id]); // Added `id` as a dependency for proper effect re-execution

  return (
    <AdminDashboardLayout barTitle="Organization Locations">
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
                <th className="px-4 py-2 text-left">Location Name</th>
                <th className="px-4 py-2 text-left">NPI</th>
                <th className="px-4 py-2 text-left">Tax ID</th>
                <th className="px-4 py-2 text-left">PTAN Medicare Number</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {locations.length > 0 ? (
                locations.map((location) => (
                  <tr key={location.uuid} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{location.location_name}</td>
                    <td className="px-4 py-2">{location.npi_2 || "N/A"}</td>
                    <td className="px-4 py-2">{location.tax_id || "N/A"}</td>
                    <td className="px-4 py-2">
                      {location.ptan_medicare_number}
                    </td>
                    <td className="px-4 py-2 flex justify-start items-center gap-2">
                      <Link
                        href={`/locationDetail/${location.uuid}`}
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
                    No locations found.
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
