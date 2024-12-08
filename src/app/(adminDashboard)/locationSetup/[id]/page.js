"use client";

import ProvidersCard from "@/components/providersDashboard/ProvidersCard";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import AdminDashboardLayout from "../../adminLayout";

export default function LocationSetup() {
  const { id } = useParams();
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(`/api/location-setup?uuid=${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch locations");
        }
        const data = await response.json();
        setLocations(data);
        setFilteredLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchLocations();
    }
  }, [id]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredLocations(locations);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = locations.filter((location) =>
        location.legal_business_name.toLowerCase().includes(lowercasedQuery) ||
        location.doing_business_name.toLowerCase().includes(lowercasedQuery) ||
        location.npi_2.toLowerCase().includes(lowercasedQuery) ||
        location.tax_id.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredLocations(filtered);
    }
  }, [searchQuery, locations]);

  return (
    <AdminDashboardLayout>
      <ProvidersCard id={id} />
      <div className="w-full flex flex-row justify-between items-center gap-4 my-4">
        <div className="w-1/3 flex flex-row justify-start items-center gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 rounded-full px-4 py-2 text-black"
            placeholder="Search"
          />
          <div className="size-10 bg-primary text-white p-2 rounded-full flex justify-center items-center">
            <CiSearch className="size-8" />
          </div>
        </div>

        <div className="w-2/3 flex flex-row justify-end items-center gap-4">
          <Link href={`/practiceLocation/${id}`}>
            <Button
              title={"Add"}
              icon={<IoAddCircleOutline className="size-6" />}
            />
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        <main className="flex-1 py-4">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-200 text-left">
                  <tr>
                    <th className="p-3">Legal Business Name</th>
                    <th className="p-3">Doing Business Name</th>
                    <th className="p-3">NPI 2</th>
                    <th className="p-3">Tax Id</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="text-center p-4">
                        Loading...
                      </td>
                    </tr>
                  ) : filteredLocations.length > 0 ? (
                    filteredLocations.map((location, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-3">{location.legal_business_name}</td>
                        <td className="p-3">{location.doing_business_name}</td>
                        <td className="p-3">{location.npi_2}</td>
                        <td className="p-3">{location.tax_id}</td>
                        <td className="p-3 flex flex-row justify-start items-center gap-2">
                          <Link href={`/organizationDetail/${location.uuid}`}>
                            <FaEye className="text-secondary cursor-pointer" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center p-4">
                        No locations found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </AdminDashboardLayout>
  );
}
