import ProvidersNavbar from "@/components/providersDashboard/ProvidersNavbar";
import Link from "next/link";
import React from "react";
import { CiEdit, CiSearch, CiUser } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiCircleInfo } from "react-icons/ci";
import Button from "@/components/ui/Button";
import ProvidersCard from "@/components/providersDashboard/ProvidersCard";
import AdminDashboardLayout from "../../adminLayout";
import { FaEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

export default function LocationSetup() {
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
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        <main className="flex-1 py-4">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-200 text-left">
                  <tr>
                    <th className="p-3">Location Name</th>
                    <th className="p-3">Address</th>
                    <th className="p-3">City</th>
                    <th className="p-3">State</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3">CHN</td>
                    <td className="p-3">10851 SCARSDALE BLVD STE 200</td>
                    <td className="p-3">Houston</td>
                    <td className="p-3">TX</td>
                    <td className="p-3 flex flex-row justify-start items-center gap-2">
                      <FaEye className="text-secondary" /> /
                      <CiEdit className="text-primary" /> /
                      <MdDeleteOutline className="text-red-400" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">BCS</td>
                    <td className="p-3">30 N GOULD, ST, STE R</td>
                    <td className="p-3">Sheridan</td>
                    <td className="p-3">WY</td>
                    <td className="p-3 flex flex-row justify-start items-center gap-2">
                      <FaEye className="text-secondary" /> /
                      <CiEdit className="text-primary" /> /
                      <MdDeleteOutline className="text-red-400" />
                    </td>
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
