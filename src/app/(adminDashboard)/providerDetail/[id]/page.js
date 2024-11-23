"use client";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useParams } from "next/navigation";
import AdminDashboardLayout from "../../adminLayout";
import Spinner from "@/components/ui/spinner";
import DocumentChart from "../../adminDashboard/DocumentsChart";
import VerifiedChart from "../../adminDashboard/VerifiedChart";
import PieChart from "../../adminDashboard/pieChart";
import { IoAddCircleOutline } from "react-icons/io5";
import ProvidersCard from "@/components/providersDashboard/ProvidersCard";

const ProviderDetail = () => {
  const { id } = useParams(); // Get the provider ID from route params
  
  

  return (
    <AdminDashboardLayout>
      <>
        <ProvidersCard />

        <div className="w-full flex flex-col justify-start items-start gap-4  mt-4">
          <div className="w-full flex flex-row justify-end items-center gap-4">
            <button className="flex flex-row gap-2 justify-center items-center border-4 border-primary rounded-lg px-6 py-2">
              <IoAddCircleOutline />
              <span>Add Provider</span>
            </button>
            <button className="flex flex-row gap-2 justify-center items-center border-4 border-primary rounded-lg px-6 py-2">
              <CiEdit />
              <span>Edit Provider</span>
            </button>
          </div>
          <div className="w-full flex flex-row justify-between items-start gap-4">
            <div className="w-[48%] flex flex-col justify-start items-start gap-4">
              <div className="w-full h-auto border-4 border-primary flex flex-col justify-start items-start gap-4 rounded-lg p-4">
                <span className="text-lg font-semibold">Documents</span>
                <DocumentChart />
              </div>
              <div className="w-full border-4 border-primary flex flex-col justify-start items-start gap-4 rounded-lg p-4">
                <span className="text-lg font-semibold">Verifications</span>
                <VerifiedChart />
              </div>
            </div>
            <div className="w-[48%] flex flex-col justify-start items-center gap-4">
              <div className="w-full h-96 border-4 border-primary flex flex-col justify-center items-center gap-4 rounded-lg p-4">
                <PieChart />
              </div>
            </div>
          </div>
        </div>
      </>
    </AdminDashboardLayout>
  );
};

export default ProviderDetail;
