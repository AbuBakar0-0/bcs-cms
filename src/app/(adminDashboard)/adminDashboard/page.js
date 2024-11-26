"use client";
import { IoAddCircleOutline } from "react-icons/io5";
import AdminDashboardLayout from "../adminLayout";
import dynamic from "next/dynamic";

export default function AdminDashboard() {
  // Dynamically import the VerifiedChart with SSR disabled
  const VerifiedChart = dynamic(() => import("./VerifiedChart"), {
    ssr: false, // Ensure this component is only rendered on the client
  });

  const DocumentChart = dynamic(() => import("./DocumentsChart"), {
    ssr: false, // Ensure this component is only rendered on the client
  });

  const PieChart = dynamic(() => import("./pieChart"), {
    ssr: false, // Ensure this component is only rendered on the client
  });

  return (
    <>
      <AdminDashboardLayout barTitle={"Admin Dashboard"}>
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <div className="w-full flex flex-row justify-between items-center gap-4">
            <button className="w-1/5 flex flex-row justify-center px-6 items-center bg-[#004aac] text-white rounded-lg gap-4 h-14">
              <IoAddCircleOutline />
              <span>New Enrollment</span>
            </button>
            <button className="w-1/5 flex flex-row justify-center h-14 px-6 items-center bg-[#00be62] text-white rounded-lg gap-4">
              <IoAddCircleOutline />
              <span>New Enrollment</span>
            </button>

            <button className="w-1/5 flex flex-row justify-center h-14 px-6 items-center bg-gray-300 rounded-lg gap-4">
              <span className="text-lg">0</span>
              <span className="text-sm text-red-500">
                <span className="text-secondary">Documents</span> <br />
                Expiring Today
              </span>
            </button>

            <button className="w-1/5 flex flex-row justify-center h-14 px-6 items-center bg-gray-300 rounded-lg gap-4">
              <span className="text-lg">0</span>
              <span className="text-sm text-red-500">
                <span className="text-secondary">Verifications</span> <br />
                Expiring Today
              </span>
            </button>
          </div>
          <div className="w-full flex flex-row justify-between items-center gap-4">
            <div className="w-[48%] border-2 border-black h-40 rounded-lg flex flex-col justify-start items-start p-4 gap-2 overflow-auto">
              <div className="w-full flex flex-row justify-between items-center">
                <span className="text-lg font-semibold">Notifications</span>
                <span className="text-lg font-semibold text-red-400">(3)</span>
              </div>
              <div className="w-full flex flex-row justify-between items-center rounded-lg bg-gray-300 p-2 text-sm">
                <span>Notification 1</span>
                <button>X</button>
              </div>
              <div className="w-full flex flex-row justify-between items-center rounded-lg bg-gray-300 p-2 text-sm">
                <span>Notification 1</span>
                <button>X</button>
              </div>
              <div className="w-full flex flex-row justify-between items-center rounded-lg bg-gray-300 p-2 text-sm">
                <span>Notification 1</span>
                <button>X</button>
              </div>
              <div className="w-full flex flex-row justify-between items-center rounded-lg bg-gray-300 p-2 text-sm">
                <span>Notification 1</span>
                <button>X</button>
              </div>
            </div>
            <div className="w-[48%] border-2 border-black h-40 rounded-lg flex flex-col justify-start items-start p-4">
              <div className="w-full flex flex-row justify-between items-center">
                <span className="text-lg font-semibold">Tasks</span>
                <button className="text-lg font-semibold text-white bg-green-500 size-6 flex justify-center items-center">
                  +
                </button>
              </div>
            </div>
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
      </AdminDashboardLayout>
    </>
  );
}
