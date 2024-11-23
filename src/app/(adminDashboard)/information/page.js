import Link from "next/link";
import React from "react";
import { CiSearch, CiUser } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiCircleInfo } from "react-icons/ci";
import Button from "@/components/ui/Button";
import AdminDashboardLayout from "../adminLayout";
import ProvidersCard from "@/components/providersDashboard/ProvidersCard";

export default function Information() {
  return (
    <AdminDashboardLayout barTitle={"Providers Dashboard"}>
      <ProvidersCard />
      <div className="w-full flex flex-row justify-start items-center gap-4 my-4">
        <span className="border-x-2 border-b-2 border-gray-400 p-2">Provider Info</span>
        <span className="border-x-2 border-b-2 border-gray-400 p-2">Professional Ids</span>
        <span className="border-x-2 border-b-2 border-gray-400 p-2">Education & Training</span>
        <span className="border-x-2 border-b-2 border-gray-400 p-2">Specialities</span>
        <span className="border-x-2 border-b-2 border-gray-400 p-2">Employment Info</span>
      </div>
    </AdminDashboardLayout>
  );
}
