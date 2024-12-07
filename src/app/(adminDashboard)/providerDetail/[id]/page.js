"use client";
import ProvidersCard from "@/components/providersDashboard/ProvidersCard";
import { useParams } from "next/navigation";
import { CiEdit } from "react-icons/ci";
import AdminDashboardLayout from "../../adminLayout";
import dynamic from "next/dynamic";
import Link from "next/link";

const ProviderDetail = () => {
  const { id } = useParams(); // Get the provider ID from route params

  const VerifiedChart = dynamic(() => import("../../adminDashboard/VerifiedChart"), {
    ssr: false, // Ensure this component is only rendered on the client
  });

  const DocumentChart = dynamic(() => import("../../adminDashboard/DocumentsChart"), {
    ssr: false, // Ensure this component is only rendered on the client
  });

  const PieChart = dynamic(() => import("../../adminDashboard/pieChart"), {
    ssr: false, // Ensure this component is only rendered on the client
  });

  
  return (
    <AdminDashboardLayout>
      <>
        <ProvidersCard id={id}/>

        <div className="w-full flex flex-col justify-start items-start gap-4  mt-4">
          <div className="w-full flex flex-row justify-end items-center gap-4">
            <Link href={`/providersInformation/${id}`}>
            <button className="flex flex-row gap-2 justify-center items-center border-4 border-primary rounded-lg px-6 py-2">
              <CiEdit />
              <span>Edit Provider</span>
            </button>
            </Link>
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
