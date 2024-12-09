"use client";
import SubNavbar from "@/components/adminDashboard/SubNavbar";
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import AdminDashboardLayout from "../adminLayout";

// Dynamically import components with SSR disabled
const VerifiedChart = dynamic(() => import("./VerifiedChart"), {
  ssr: false,
});

const DocumentChart = dynamic(() => import("./DocumentsChart"), {
  ssr: false,
});

const PayersChart = dynamic(() => import("./pieChart"), {
  ssr: false,
});

const HrChart = dynamic(() => import("./hrChart"), {
  ssr: false,
});

export default function AdminDashboard() {
  const [documentData, setDocumentData] = useState([]); // State to hold the document data
  const [notifications, setNotifications] = useState([]); // State to hold the notifications
  const [tasks, setTasks] = useState([]); // State to hold the notifications
  const [docsExpiringtoday, setDocsExpiringtoday] = useState(0);
  const [loading, setLoading] = useState(false);
  const [payersData, setPayersData] = useState([]);

  useEffect(() => {
    const uuid = localStorage.getItem("user_uuid");

    const fetchDocumentDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/admin-dashboard?uuid=${uuid}`);
        setDocumentData(response.data);
      } catch (error) {
        console.error("Error fetching document details:", error);
      }
    };

    const fetchNotifications = async () => {
      const response = await axios.get(
        `/api/admin-dashboard/get-notifications?uuid=${uuid}`
      );

      const formattedNotifications = response.data.map((item) => {
        const expiryDate = new Date(item.expiry_date);
        const currentDate = new Date();

        // Calculate the time difference in days
        const timeDifference = Math.ceil(
          (expiryDate - currentDate) / (1000 * 60 * 60 * 24)
        );
        if (timeDifference == 0) {
          setDocsExpiringtoday(docsExpiringtoday + 1);
        }
        const message =
          timeDifference >= 0
            ? `${item.providers_info.first_name} ${
                item.providers_info.middle_initial || ""
              } ${item.providers_info.last_name}'s document "${
                item.title || "Unknown Title"
              }" expires in ${timeDifference} day${
                timeDifference !== 1 ? "s" : ""
              }.`
            : `${item.providers_info.first_name} ${
                item.providers_info.middle_initial || ""
              } ${item.providers_info.last_name}'s document "${
                item.title || "Unknown Title"
              }" expired ${Math.abs(timeDifference)} day${
                Math.abs(timeDifference) !== 1 ? "s" : ""
              } ago.`;

        return message;
      });

      const formattedTasks = response.data.map((item) => {
        const providerInfo = item.providers_info || {};
        const firstName = providerInfo.first_name || "Unknown";
        const middleInitial = providerInfo.middle_initial?.trim() || "";
        const lastName = providerInfo.last_name || "Unknown";

        const message = `Get ${firstName} ${middleInitial} ${lastName}'s document "${item.title}"`;

        return message;
      });

      setNotifications(formattedNotifications);
      setTasks(formattedTasks);
    };

    const fetchPayers = async () => {
      try {
        const response = await axios.get(
          `/api/admin-dashboard/get-payers?uuid=${uuid}`
        );
        setPayersData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching document details:", error);
      }
    };

    fetchDocumentDetails();
    fetchNotifications();
    fetchPayers();
  }, []);

  return (
    <AdminDashboardLayout barTitle={"Admin Dashboard"}>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <div className="w-full flex flex-row justify-between items-center gap-4">
          <SubNavbar />

          <button className="flex flex-row justify-center px-6 items-center bg-gray-300 rounded-lg gap-2 py-2">
            <span className="text-lg">{docsExpiringtoday}</span>
            <span className="text-xs text-red-500">
              <span className="text-secondary">Documents</span> <br />
              Expiring Today
            </span>
          </button>

          <button className="flex flex-row justify-center px-6 items-center bg-gray-300 rounded-lg gap-2 py-2">
            <span className="text-lg">0</span>
            <span className="text-xs text-red-500">
              <span className="text-secondary">Verifications</span> <br />
              Expiring Today
            </span>
          </button>
        </div>

        <div className="w-full flex flex-row justify-between items-center gap-4">
          <div className="w-[48%] border-2 border-black h-40 rounded-lg flex flex-col justify-start items-start p-4 gap-2 overflow-auto">
            <div className="w-full flex flex-row justify-between items-center">
              <span className="text-lg font-semibold">Notifications</span>
              <span className="text-lg font-semibold text-red-400">
                {loading ? <></> : notifications.length}
              </span>
            </div>
            {loading ? (
              <div className="w-full h-full flex justify-center items-center">
                <ClipLoader />
              </div>
            ) : (
              notifications.map((notification, index) => (
                <div
                  key={index}
                  className="w-full flex flex-row justify-between items-center rounded-lg bg-gray-300 p-2 text-sm"
                >
                  <span>{notification}</span>
                </div>
              ))
            )}
          </div>
          <div className="w-[48%] border-2 border-black h-40 rounded-lg flex flex-col justify-start items-start p-4 gap-2 overflow-auto">
            <div className="w-full flex flex-row justify-between items-center">
              <span className="text-lg font-semibold">Tasks</span>
              {/* <button className="text-lg font-semibold text-white bg-green-500 size-6 flex justify-center items-center">
                +
              </button> */}
            </div>
            {loading ? (
              <div className="w-full h-full flex justify-center items-center">
                <ClipLoader />
              </div>
            ) : (
              tasks.map((notification, index) => (
                <div
                  key={index}
                  className="w-full flex flex-row justify-between items-center rounded-lg bg-gray-300 p-2 text-sm"
                >
                  <span>{notification}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="w-full flex flex-row justify-between items-start gap-4">
          <div className="w-[48%] flex flex-col justify-start items-start gap-4">
            <div className="w-full h-auto border-4 border-primary flex flex-col justify-start items-start gap-4 rounded-lg p-4">
              <span className="text-lg font-semibold">Documents</span>
              {loading ? (
                <div className="w-full flex justify-center">
                  <ClipLoader />
                </div>
              ) : (
                <DocumentChart data={documentData} />
              )}
            </div>
            <div className="w-full border-4 border-primary flex flex-col justify-start items-start gap-4 rounded-lg p-4">
              <span className="text-lg font-semibold">Verifications</span>
              <VerifiedChart />
            </div>
          </div>
          <div className="w-[48%] flex flex-col justify-start items-center gap-4">
            <div className="w-full h-96 border-4 border-primary flex flex-col justify-center items-center gap-4 rounded-lg p-4">
              <span className="text-lg font-semibold">Status</span>
              {loading ? (
                <div className="w-full flex justify-center">
                  <ClipLoader />
                </div>
              ) : (
                <PayersChart data={payersData} />
              )}
            </div>
            <div className="w-full border-4 border-primary flex flex-col justify-start items-start gap-4 rounded-lg p-4">
              <span className="text-lg font-semibold">HR Status</span>
              <HrChart />
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
