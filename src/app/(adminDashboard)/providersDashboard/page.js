"use client";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiEdit, CiSearch } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { FiTrash2, FiUser, FiUserX } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";
import { LiaUserSlashSolid } from "react-icons/lia";
import { BarLoader } from "react-spinners";
import AdminDashboardLayout from "../../(adminDashboard)/adminLayout";
import BulkUploadButton from "@/components/adminDashboard/BulkUpload/BulkUploadButton";

const HoverExpandButton = ({ title, number, color, icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`scale-110 flex items-center justify-center text-white gap-2 text-sm font-medium 
                  transition-all duration-100 ease-in-out ${color}
                  ${
                    isHovered ? "w-40 px-4" : "w-20"
                  } h-10 rounded-full overflow-hidden cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon}
      {isHovered ? title : number}
    </div>
  );
};

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
      const response = await fetch(`/api/providers-dashboard?uuid=${userUuid}`);
      if (!response.ok) throw new Error("Failed to fetch providers");

      const data = await response.json();
      setProviders(data.data);
      setFilteredProviders(data.data); // Set initial filtered providers
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
      <div className="w-full flex flex-row justify-center gap-4 items-center py-4">
        <HoverExpandButton
          number={16}
          title={"Active Profiles"}
          color={"bg-green-400"}
          icon={<FiUser />}
        />
        <HoverExpandButton
          number={18}
          title={"Inactive Enabled"}
          color={"bg-red-400"}
          icon={<FiUserX />}
        />
        <HoverExpandButton
          number={1}
          title={"Terminated"}
          color={"bg-gray-400"}
          icon={<LiaUserSlashSolid />}
        />
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
        <div className="flex justify-center items-center">
          <Link href={"/providersInformation/new_user"}>
            <Button
              title={"Add Provider"}
              icon={<IoAddCircleOutline className="size-6" />}
            />
          </Link>
          <BulkUploadButton />
        </div>
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
                <th className="px-4 py-2 text-left">Cell Phone</th>
                <th className="px-4 py-2 text-left">License ID</th>
                <th className="px-4 py-2 text-left">SSN</th>
                <th className="px-4 py-2 text-left">NPI</th>
                <th className="px-4 py-2 text-left">Tax ID</th>
                <th className="px-4 py-2 text-left">UPIN</th>
                <th className="px-4 py-2 text-left">Actions</th>
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
                    <td className="px-4 py-2 uppercase">
                      {provider.contact.cell_phone}
                    </td>
                    <td className="px-4 py-2 uppercase">
                      {provider.license_id}
                    </td>

                    <td className="px-4 py-2">
                      ***-**-{provider.ssn.split("-")[2] || "Unknown"}
                    </td>
                    <td className="px-4 py-2">
                      {provider.professional_ids.length != 0
                        ? provider.professional_ids[
                            provider?.professional_ids.length - 1
                          ].npi_1
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      {provider.professional_ids.length != 0
                        ? provider.professional_ids[
                            provider?.professional_ids.length - 1
                          ].tax_id
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      {provider.professional_ids.length != 0
                        ? provider.professional_ids[
                            provider?.professional_ids.length - 1
                          ].upin
                        : "N/A"}
                    </td>

                    <td className="px-4 py-2 flex justify-center items-center gap-2">
                      <Link
                        href={`/providerDetail/${provider.uuid}`}
                        className="text-green-400"
                      >
                        <FaEye />
                      </Link>
                      /
                      <Link href={`/providersInformation/${provider.uuid}`}>
                        <CiEdit className="text-blue-400" />
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
                    colSpan="9"
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
