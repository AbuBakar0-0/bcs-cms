"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import AdminDashboardLayout from "./../../adminLayout";
import axios from "axios";
import { BarLoader } from "react-spinners";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          params: { added_by: userUuid },
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

  return (
    <AdminDashboardLayout barTitle="Organization Management">
      <div className="w-full flex flex-col justify-start items-start gap-4">
        <div className="w-full flex flex-row justify-end items-center">
          <button className="px-4 py-3 bg-secondary flex flex-row justify-center items-center gap-4 text-white rounded-lg">
            Add
          </button>
        </div>
      </div>
      <div className="min-h-screen flex flex-col md:flex-row">
        <main className="flex-1 py-4">
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex justify-center"><BarLoader/></div>
              ) : error ? (
                <div className="p-4 text-center text-gray-500">No Locations Found</div>
              ) : data.length === 0 ? (
                <div className="p-4 text-center">No data available.</div>
              ) : (
                <table className="w-full table-auto">
                  <thead className="bg-gray-200 text-left">
                    <tr>
                      <th className="p-3">Provider Name</th>
                      <th className="p-3">Legal Business Name</th>
                      <th className="p-3">NPI 2</th>
                      <th className="p-3">Taxonomy Code</th>
                      <th className="p-3">Address</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr className="border-b" key={index}>
                        <td className="p-3">{item.providers_info.last_name} {item.providers_info.middle_initial} {item.providers_info.first_name}</td>
                        <td className="p-3">{item.legal_business_name}</td>
                        <td className="p-3">{item.npi_2}</td>
                        <td className="p-3">{item.taxonomy_code_1}</td>
                        <td className="p-3">{item.service_address.address_line_1} {item.service_address.address_line_2}</td>
                        <td className="p-3">{item.service_contact.cell_phone}</td>
                        <td className="p-3 flex flex-row justify-start items-center gap-2">
                          <Link href={`/organizationDetail/${item.uuid}`}>
                            <FaEye className="text-secondary" />
                          </Link>{" "}
                          /
                          <CiEdit className="text-primary" /> /
                          <MdDeleteOutline className="text-red-400" />
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
