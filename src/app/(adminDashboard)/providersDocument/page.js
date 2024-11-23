import ProvidersNavbar from "@/components/providersDashboard/ProvidersNavbar";
import Link from "next/link";
import React from "react";
import { CiSearch, CiUser } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiCircleInfo } from "react-icons/ci";
import Button from "@/components/ui/Button";
import AdminDashboardLayout from "../adminLayout";
import ProvidersCard from "@/components/providersDashboard/ProvidersCard";

export default function ProvidersDocument() {
  return (
    <AdminDashboardLayout>
      <ProvidersCard />
      <div className="w-full flex flex-row justify-between items-center gap-4 my-4">
        <div className="w-1/3 flex flex-row justify-start items-center gap-4">
          <input
            type="text"
            className="w-full bg-gray-100 rounded-full px-4 py-2 text-black"
            placeholder="Search"
          />
          <div className="size-10 bg-primary text-white p-2 rounded-full flex justify-center items-center">
            <CiSearch className="size-8" />
          </div>
        </div>

        <div className="w-2/3 flex flex-row justify-end items-center gap-4">
          <Button
            title={"Add"}
            icon={<IoAddCircleOutline className="size-6" />}
          />

          <Link
            href={"/documentDetails"}
            className="bg-secondary px-4 py-3 rounded-lg text-white flex flex-row justify-center items-center gap-4"
          >
            <CiCircleInfo className="size-6" />
            <p>Details</p>
          </Link>
        </div>
      </div>
      <div className="min-h-screen flex flex-col md:flex-row">
        <main className="flex-1 py-4">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-200 text-left">
                  <tr>
                    <th className="p-3">Document Type</th>
                    <th className="p-3">Alias</th>
                    <th className="p-3">Expiration Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3">Appointment Application</td>
                    <td className="p-3">-</td>
                    <td className="p-3">09/29/2023</td>
                    <td className="p-3 text-red-500">Expired 159 Days Ago</td>
                    <td className="p-3">...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </AdminDashboardLayout>
  );
}
