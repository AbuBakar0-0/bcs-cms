"use client";

import { useEffect, useState } from "react";
import AdminDashboardLayout from "@/app/(adminDashboard)/adminLayout";
import OrganizationCard from "@/components/organizationManagement/OrganizationCard";
import Button from "@/components/ui/Button";
import { CiEdit } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import axios from "axios";
import { useParams } from "next/navigation";

export default function OrganizationDetail() {
  const { id:uuid } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/organization-detail?uuid=${uuid}`); // Replace with your endpoint
        setData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminDashboardLayout barTitle="Organization Management">
      <OrganizationCard />
      <div className="flex flex-row justify-end items-center mt-4 mb-2 gap-4">
        <Button
          title={"Add"}
          icon={<IoAddCircleOutline className="size-6" />}
        />
        <button className="px-4 py-2 border-primary border-4 flex flex-row justify-center items-center gap-2 rounded-lg">
          <CiEdit />
          <span>Edit</span>
        </button>
      </div>
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
                      <th className="p-3">Provider Info</th>
                      <th className="p-3">NPI 2</th>
                      <th className="p-3">Taxonomy Code</th>
                      <th className="p-3">Address</th>
                      <th className="p-3">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr className="border-b" key={index}>
                        <td className="p-3">{item.legal_business_name}</td>
                        <td className="p-3">{item.npi_2}</td>
                        <td className="p-3">{item.taxonomy_code_1}</td>
                        <td className="p-3">{item.service_address.address_line_1} {item.service_address.address_line_2}</td>
                        <td className="p-3">{item.service_contact.cell_phone}</td>
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
