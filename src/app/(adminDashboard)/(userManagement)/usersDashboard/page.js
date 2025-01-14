"use client";

import React, { useEffect, useState } from "react";
import AdminDashboardLayout from "./../../adminLayout";
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
import axios from "axios";
import { BarLoader } from "react-spinners";
import toast from "react-hot-toast";

export default function page() {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const uuid = localStorage.getItem("user_uuid");
      if (!uuid) {
        console.error("User UUID not found in localStorage.");
        return;
      }

      const response = await axios.get(`/api/user-management?uuid=${uuid}`);
      setData(response.data); // Correctly accessing the data
      
      setLoading(false);
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async ({ userid }) => {
    try {
      const response = await axios.delete(
        `/api/user-management?uuid=${userid}`
      );
      toast.success("User Deleted");
      await fetchUsers();
    } catch (error) {
      toast.error("Error Deleting Data");
      console.error(
        "Error fetching users:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <AdminDashboardLayout barTitle="User Management">
      <div className="w-full flex flex-col justify-start items-start gap-4">
        <div className="w-full flex flex-row justify-end items-center">
          <Link href="/userManagement/new_user">
            <button className="px-4 py-3 bg-secondary flex flex-row justify-center items-center gap-4 text-white rounded-lg">
              Add
            </button>
          </Link>
        </div>
      </div>
      {loading ? (
        <div className="w-full flex justify-center">
          <BarLoader />
        </div>
      ) : (
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
                      <th className="p-3">Phone</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr className="border-b" key={index}>
                        <td className="p-3">{item.first_name}</td>
                        <td className="p-3">{item.last_name}</td>
                        <td className="p-3">{item.email}</td>
                        <td className="p-3">{item.phone}</td>
                        <td className="p-3 flex flex-row justify-start items-center gap-2">
                          <Link
                            href={`/userManagement/${item.uuid}`}
                            className="hover:cursor-pointer"
                          >
                            <CiEdit className="text-primary" />
                          </Link>
                          /
                          <button
                            className="hover:cursor-pointer"
                            onClick={() => handleDelete({ userid: item.uuid })}
                          >
                            <MdDeleteOutline className="text-red-400" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      )}
    </AdminDashboardLayout>
  );
}
