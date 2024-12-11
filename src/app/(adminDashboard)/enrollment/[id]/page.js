"use client";

import ProvidersCard from "@/components/providersDashboard/ProvidersCard";
import { IoAddCircleOutline } from "react-icons/io5";
import AdminDashboardLayout from "../../adminLayout";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function Enrollment() {
  const { id } = useParams();
  const [providerData, setProviderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  // Fetch provider data
  useEffect(() => {
    const fetchProviderData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/enrollment?uuid=${id}`); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch provider data");
        }
        const data = await response.json();
        setProviderData(data);
      } catch (error) {
        console.error("Error fetching provider data:", error);
      }
      setLoading(false);
    };
    if (id) {
      fetchProviderData();
    }
  }, [id]);

  function getColor(status) {
    const statusClasses = {
      Submitted: "text-blue-500", // Blue
      "In-Progress": "text-yellow-500", // Yellow
      Approved: "text-green-500", // Green
      Rejected: "text-red-500", // Red
      "Panel Closed": "text-purple-500", // Purple
      "Missing Information": "text-orange-500", // Orange
    };

    // Return the classes for the given status or default classes
    return statusClasses[status] || "text-gray-500"; // Default: Gray
  }

  // Filter the provider data based on the search query
  const filteredProviderData = providerData?.filter((payer) => {
    return (
      payer.payer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payer.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payer.business.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payer.note.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <AdminDashboardLayout barTitle={"Providers Dashboard"}>
      <ProvidersCard id={id} data={providerData} />
      <div className="w-full flex flex-col justify-start items-start gap-4">
        <div className="w-full flex flex-row justify-between items-center gap-4 mt-4">
          <div className="w-1/3 flex flex-row justify-start items-center gap-4">
            <input
              type="text"
              className="w-full bg-gray-100 rounded-full px-4 py-2 text-black"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            />
            <div className="size-10 bg-primary text-white p-2 rounded-full flex justify-center items-center">
              <CiSearch className="size-8" />
            </div>
          </div>

          <Link href={`/payerSetup/${id}`}>
            <button className="flex flex-row gap-2 justify-center items-center border-4 border-primary rounded-lg px-6 py-2">
              <IoAddCircleOutline />
              <span>Add Payer</span>
            </button>
          </Link>
        </div>

        <div className="w-full min-h-screen flex flex-col md:flex-row">
          <main className="w-full flex-1 py-4">
            <div className="w-full bg-white shadow rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead className="bg-gray-200 text-left">
                    <tr>
                      <th className="p-3">Payer</th>
                      <th className="p-3">Plan Type</th>
                      <th className="p-3">Business</th>
                      <th className="p-3">Application Status</th>
                      <th className="p-3">Application Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={5}></td>
                      </tr>
                    ) : (
                      (filteredProviderData?.length > 0 ? filteredProviderData : providerData)?.map(
                        (payer, index) => (
                          <tr className="border-b" key={index}>
                            <td className="w-1/5 p-3">{payer.payer_name}</td>
                            <td className="w-1/5 p-3">{payer.plan_type}</td>
                            <td className="w-1/5 p-3">{payer.business}</td>
                            <td className={`w-1/5 p-3 ${getColor(payer.status)}`}>
                              {payer.status}
                            </td>
                            <td className="w-1/5 p-3">{payer.note}</td>
                          </tr>
                        )
                      ) || (
                        <tr>
                          <td
                            colSpan="3"
                            className="text-center p-3 text-gray-500"
                          >
                            No data available
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
