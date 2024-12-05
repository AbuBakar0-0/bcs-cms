"use client";

import { useEffect, useState } from "react";
import AdminDashboardLayout from "@/app/(adminDashboard)/adminLayout";
import OrganizationCard from "@/components/organizationManagement/OrganizationCard";
import { useParams } from "next/navigation";
import axios from "axios";

export default function OrgInfo() {
  const [data, setData] = useState([]); // State for holding API data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  const { id: uuid } = useParams();

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/org-info`, {
          params: { uuid }, // Passing the `uuid` as a query parameter
        });
        setData(response.data); // Assuming the API returns data directly
      } catch (err) {
        setError(err.response?.data?.error || err.message);
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
                <p className="p-4"></p>
              ) : error ? (
                <p className="p-4 text-red-500">{error}</p>
              ) : data.length > 0 ? (
                <table className="w-full table-auto">
                  <thead className="bg-gray-200 text-left">
                    <tr>
                      <th className="p-3 w-1/2">Field Name</th>
                      <th className="p-3">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-[1px] border-gray-200">
                      <td className="p-3">Legal Business Name</td>
                      <td className="p-3">{data[0].legal_business_name}</td>
                    </tr>
                    <tr className="border-[1px] border-gray-200">
                      <td className="p-3">Doing Business Name</td>
                      <td className="p-3">{data[0].doing_business_name}</td>
                    </tr>
                    <tr className="border-[1px] border-gray-200">
                      <td className="p-3">NPI 2</td>
                      <td className="p-3">{data[0].npi_2}</td>
                    </tr>
                    <tr className="border-[1px] border-gray-200">
                      <td className="p-3">Tax ID</td>
                      <td className="p-3">{data[0].tax_id}</td>
                    </tr>
                    <tr className="border-[1px] border-gray-200">
                      <td className="p-3">Taxonomy Code 1</td>
                      <td className="p-3">{data[0].taxonomy_code_1}</td>
                    </tr>
                    <tr className="border-[1px] border-gray-200">
                      <td className="p-3">Taxonomy Code 2</td>
                      <td className="p-3">{data[0].taxonomy_code_2}</td>
                    </tr>
                    <tr className="border-[1px] border-gray-200">
                      <td className="p-3">PTAN Medicare Number</td>
                      <td className="p-3">{data[0].ptan_medicare_number}</td>
                    </tr>
                    <tr className="border-[1px] border-gray-200">
                      <td className="p-3">Medicaid Number</td>
                      <td className="p-3">{data[0].medicaid_number}</td>
                    </tr>
                    <tr className="border-[1px] border-gray-200">
                      <td className="p-3">Practice Contact</td>
                      <td className="p-3">{data[0].practice_contact.cell_phone}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p className="p-4">No data found.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </AdminDashboardLayout>
  );
}
