"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import OrganizationCard from "@/components/organizationManagement/OrganizationCard";
import Button from "@/components/ui/Button";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import AdminDashboardLayout from "@/app/(adminDashboard)/adminLayout";
import { useParams } from "next/navigation";

export default function OrgLocation() {
  const [data, setData] = useState([]); // State for holding API data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  const { id: uuid } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/org-location?uuid=${uuid}`); // Replace with your actual API endpoint
        setData(response.data); // Assuming the API returns an array of location objects
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminDashboardLayout barTitle="Organization Management">
      <OrganizationCard />
      {/* <div className="flex flex-row justify-end items-center mt-4 mb-2 gap-4">
        <Button
          title={"Add"}
          icon={<IoAddCircleOutline className="size-6" />}
        />
        <button className="px-4 py-2 border-primary border-4 flex flex-row justify-center items-center gap-2 rounded-lg">
          <CiEdit />
          <span>Edit</span>
        </button>
      </div> */}
      <div className="min-h-screen flex flex-col md:flex-row">
        <main className="flex-1 py-4">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              {loading ? (
                <p className="p-4"></p>
              ) : error ? (
                <p className="p-4 text-red-500">{error}</p>
              ) : (
                <table className="w-full table-auto">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-3">Address Type</th>
                      <th className="p-3">Address Line 1</th>
                      <th className="p-3">Address Line 2</th>
                      <th className="p-3">City</th>
                      <th className="p-3">State</th>
                      <th className="p-3">Zip</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ? (
                      <>
                      <tr className="border-b">
                        <td className="p-3">Service</td>
                        <td className="p-3">{data[0].service_address.address_line_1}</td>
                        <td className="p-3">{data[0].service_address.address_line_2}</td>
                        <td className="p-3">{data[0].service_address.city}</td>
                        <td className="p-3">{data[0].service_address.state}</td>
                        <td className="p-3">{data[0].service_address.zip_code}</td>
                        <td className="p-3">{data[0].service_contact.cell_phone}</td>
                        <td className="p-3">{data[0].service_contact.email}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">Mailing</td>
                        <td className="p-3">{data[0].mailing_address.address_line_1}</td>
                        <td className="p-3">{data[0].mailing_address.address_line_2}</td>
                        <td className="p-3">{data[0].mailing_address.city}</td>
                        <td className="p-3">{data[0].mailing_address.state}</td>
                        <td className="p-3">{data[0].mailing_address.zip_code}</td>
                        <td className="p-3">{data[0].mailing_contact.home_phone}</td>
                        <td className="p-3">{data[0].mailing_contact.email}</td>
                      </tr>
                      <tr className="border-b">
                      <td className="p-3">Correspondance</td>
                      <td className="p-3">{data[0].correspondence_address.address_line_1}</td>
                      <td className="p-3">{data[0].correspondence_address.address_line_2}</td>
                      <td className="p-3">{data[0].correspondence_address.city}</td>
                      <td className="p-3">{data[0].correspondence_address.state}</td>
                      <td className="p-3">{data[0].correspondence_address.zip_code}</td>
                      <td className="p-3">{data[0].correspondence_contact.home_phone}</td>
                      <td className="p-3">{data[0].correspondence_contact.email}</td>
                    </tr>
                    </>
                    ) : (
                      <tr>
                        <td colSpan="8" className="p-3 text-center">
                          No data available
                        </td>
                      </tr>
                    )}
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
