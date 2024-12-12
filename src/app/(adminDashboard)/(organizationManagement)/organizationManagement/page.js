"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CiEdit, CiSearch } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import AdminDashboardLayout from "./../../adminLayout";
import axios from "axios";
import { BarLoader } from "react-spinners";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    // Retrieve `added_by` from localStorage
    const userUuid = localStorage.getItem("user_uuid");

    if (!userUuid) {
      setError("User UUID is not available in localStorage.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get("/api/organization-management", {
          params: { uuid: userUuid },
        });
        setData(response.data); // Assumes `data` is inside `response.data`
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data based on search query
  const filteredData = data.filter((item) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      item.legal_business_name.toLowerCase().includes(searchLower) ||
      item.doing_business_name.toLowerCase().includes(searchLower) ||
      item.npi_2.toLowerCase().includes(searchLower) ||
      item.taxonomy_code_1.toLowerCase().includes(searchLower) ||
      item.service_address.address_line_1.toLowerCase().includes(searchLower) ||
      item.service_address.address_line_2.toLowerCase().includes(searchLower) ||
      item.service_contact.cell_phone.toLowerCase().includes(searchLower)
    );
  });

  return (
    <AdminDashboardLayout barTitle="Organization Management">
      <div className="w-full flex flex-col justify-start items-start gap-4">
        <div className="w-1/3 flex flex-row justify-start items-center gap-4">
          <input
            type="text"
            className="w-full bg-gray-100 rounded-full px-4 py-2 text-black"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          />
          <div className="size-10 bg-primary text-white p-2 rounded-full flex justify-center items-center">
            <CiSearch className="size-8" />
          </div>
        </div>
      </div>
      <div className="min-h-screen flex flex-col md:flex-row">
        <main className="flex-1 py-4">
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex justify-center">
                  <BarLoader />
                </div>
              ) : error ? (
                <div className="p-4 text-center text-gray-500">No Locations Found</div>
              ) : filteredData.length === 0 ? (
                <div className="p-4 text-center">No data available.</div>
              ) : (
                <table className="w-full table-auto">
                  <thead className="bg-gray-200 text-left">
                    <tr>
                      <th className="p-3">Legal Business Name</th>
                      <th className="p-3">Doing Business Name</th>
                      <th className="p-3">NPI 2</th>
                      <th className="p-3">Taxonomy Code</th>
                      <th className="p-3">Address</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                      <tr className="border-b" key={index}>
                        <td className="p-3">{item.legal_business_name}</td>
                        <td className="p-3">{item.doing_business_name}</td>
                        <td className="p-3">{item.npi_2}</td>
                        <td className="p-3">{item.taxonomy_code_1}</td>
                        <td className="p-3">
                          {item.service_address.address_line_1} {item.service_address.address_line_2}
                        </td>
                        <td className="p-3">{item.service_contact.cell_phone}</td>
                        <td className="p-3 flex flex-row justify-start items-center gap-2">
                          <Link href={`/organizationLocation/${item.uuid}`}>
                            <FaEye className="text-secondary" />
                          </Link>
                          {/* /
                          <CiEdit className="text-primary" /> / <MdDeleteOutline className="text-red-400" /> */}
                        </td>
                      </tr>
                    ))}
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
