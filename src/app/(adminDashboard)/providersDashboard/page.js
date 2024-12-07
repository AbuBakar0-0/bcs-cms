"use client";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { FiTrash2, FiUserX } from "react-icons/fi";
import { IoAddCircleOutline, IoSearch } from "react-icons/io5";
import { LiaUserSlashSolid } from "react-icons/lia";
import { BarLoader } from "react-spinners";
import AdminDashboardLayout from "../../(adminDashboard)/adminLayout";
import { CiSearch } from "react-icons/ci";

export default function ProvidersDashboard() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProviders, setFilteredProviders] = useState([]);

  const fetchProviders = async () => {
    const userUuid = localStorage.getItem("user_uuid");

    if (!userUuid) {
      console.error("User UUID is not found in localStorage");
      return;
    }

    try {
      const response = await fetch(`/api/providersDashboard?uuid=${userUuid}`);
      if (!response.ok) throw new Error("Failed to fetch providers");

      const data = await response.json();
      setProviders(data.providers);
      setFilteredProviders(data.providers); // Set initial filtered providers
    } catch (error) {
      console.error("Error fetching providers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter providers based on search query
    const filtered = providers.filter(
      (provider) =>
        provider.first_name.toLowerCase().includes(query) ||
        provider.last_name.toLowerCase().includes(query) ||
        (provider.provider_title || "").toLowerCase().includes(query) ||
        (provider.ssn || "").toLowerCase().includes(query) ||
        (provider.license_id || "").toLowerCase().includes(query) ||
        (provider.dob || "").toLowerCase().includes(query)
    );

    setFilteredProviders(filtered);
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <AdminDashboardLayout barTitle={"Provider Dashboard"}>
      <div className="w-full flex flex-row justify-between items-center gap-4 py-4">
        <div className="w-[20%] flex flex-col justify-center items-start border-2 border-primary rounded-lg p-4">
          <div className="w-full flex flex-row justify-between items-center gap-4">
            <div className="w-1/2 flex flex-row justify-between items-center gap-2">
              <FaRegCircleUser className="size-16 text-gray-500" />
              <p>Active Profiles</p>
            </div>
            <div>
              <span className="text-6xl text-green-400">16</span>
            </div>
          </div>
        </div>

        <div className="w-[20%] flex flex-col justify-center items-start border-2 border-secondary rounded-lg p-4">
          <div className="w-full flex flex-row justify-between items-center gap-4">
            <div className="w-1/2 flex flex-row justify-between items-center gap-2">
              <FiUserX className="size-16 text-gray-500" />
              <p>Not Enabled</p>
            </div>
            <div>
              <span className="text-6xl text-red-400">162</span>
            </div>
          </div>
        </div>

        <div className="w-[20%] flex flex-col justify-center items-start border-2 border-primary rounded-lg p-4">
          <div className="w-full flex flex-row justify-between items-center gap-4">
            <div className="w-1/2 flex flex-row justify-between items-center gap-2">
              <LiaUserSlashSolid className="size-16 text-gray-500" />
              <p>Terminated Profiles</p>
            </div>
            <div>
              <span className="text-6xl text-green-400">16</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-row justify-between items-center mb-4">
        <div className="w-1/3 flex flex-row justify-start items-center gap-4">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full bg-gray-100 rounded-full px-4 py-2 text-black"
          />
          <div className="size-10 bg-primary text-white p-2 rounded-full flex justify-center items-center">
            <CiSearch className="size-8" />
          </div>
        </div>
        <Link href={"/providersInformation/new_user"}>
          <Button
            title={"Add Provider"}
            icon={<IoAddCircleOutline className="size-6" />}
          />
        </Link>
      </div>

      {loading ? (
        <div className="w-full flex flex-col justify-center items-center">
          <BarLoader />
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">DOB</th>
                <th className="px-4 py-2 text-left">SSN</th>
                <th className="px-4 py-2 text-left">License ID</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProviders.length > 0 ? (
                filteredProviders.map((provider) => (
                  <tr key={provider.uuid} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">
                      <Link
                        href={`/providerDetail/${provider.uuid}`}
                        className=""
                      >
                        {provider.last_name}, {provider.first_name}
                        {provider.middle_initial} - {provider.provider_title}
                      </Link>
                    </td>
                    <td className="px-4 py-2">
                      {provider.dob.split("-")[1] || "N/A"}-
                      {provider.dob.split("-")[2] || "N/A"}-
                      {provider.dob.split("-")[0] || "N/A"}
                    </td>
                    <td className="px-4 py-2">{provider.ssn || "Unknown"}</td>
                    <td className="px-4 py-2">
                      {provider.license_id || "Unknown"}
                    </td>
                    <td className="px-4 py-2 flex justify-center items-center gap-2">
                      <Link
                        href={`/providerDetail/${provider.uuid}`}
                        className="text-green-400"
                      >
                        <FaEye />
                      </Link>
                      /
                      <button className="text-red-500 hover:text-red-700">
                        <FiTrash2 />
                      </button>
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
        </div>
      )}

      {/* <div className="flex justify-between items-center p-4 border-t bg-white">
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          ❮
        </button>
        <span>{filteredProviders.length} items</span>
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          ❯
        </button>
      </div> */}
    </AdminDashboardLayout>
  );
}
