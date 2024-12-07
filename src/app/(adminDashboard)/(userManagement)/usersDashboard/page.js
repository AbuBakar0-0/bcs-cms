import React from "react";
import AdminDashboardLayout from "./../../adminLayout";
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";

export default function page() {
  const data = [
    {
      first_name: "Adnan Qamar",
      last_name: "Qamar",
      email: "aqamar@billingcaresolutions.com",
    },
    {
      first_name: "Linh ",
      last_name: "Tran",
      email: "linhtrah@gmail.com",
    },
  ];

  return (
    <AdminDashboardLayout barTitle="Organization Management">
      <div className="w-full flex flex-col justify-start items-start gap-4">
        <div className="w-full flex flex-row justify-end items-center">
          <Link href="/userManagement">
          <button className="px-4 py-3 bg-secondary flex flex-row justify-center items-center gap-4 text-white rounded-lg">
            Add
          </button>
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
                    <th className="p-3">First Name</th>
                    <th className="p-3">Last Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr className="border-b" key={index}>
                      <td className="p-3">{item.first_name}</td>
                      <td className="p-3">{item.last_name}</td>
                      <td className="p-3">{item.email}</td>
                      <td className="p-3 flex flex-row justify-start items-center gap-2">
                        <Link href="/organizationDetail">
                          <FaEye className="text-secondary" />
                        </Link>
                        /
                        <CiEdit className="text-primary" /> /
                        <MdDeleteOutline className="text-red-400" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </AdminDashboardLayout>
  );
}
