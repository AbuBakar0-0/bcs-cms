"use client";
import AdminDashboardLayout from "../adminLayout";
import dynamic from "next/dynamic";
import SubNavbar from "@/components/adminDashboard/SubNavbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import dayjs from "dayjs";

// Dynamically import components with SSR disabled
const VerifiedChart = dynamic(() => import("./VerifiedChart"), {
  ssr: false,
});

const DocumentChart = dynamic(() => import("./DocumentsChart"), {
  ssr: false,
});

const StatusChart = dynamic(() => import("./pieChart"), {
  ssr: false,
});

const HrChart = dynamic(() => import("./hrChart"), {
  ssr: false,
});

export default function AdminDashboard() {
  const [documentData, setDocumentData] = useState([]); // State to hold the document data
  const [notifications, setNotifications] = useState([]); // State to hold the notifications
  const [tasks, setTasks] = useState([]); // State to hold the notifications

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const uuid = localStorage.getItem("user_uuid");

    const fetchDocumentDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/admin-dashboard?uuid=${uuid}`);
        setDocumentData(response.data);

        // Generate notifications
        const newNotifications = response.data.map((doc) => {
          const expiryDate = dayjs(doc.expiry_date);
          const currentDate = dayjs();
          const daysLeft = expiryDate.diff(currentDate, "day");
          const { first_name, middle_initial, last_name } =
            doc.providers_info || {};
          return `${first_name} ${
            middle_initial || ""
          } ${last_name}'s document "${
            doc.title
          }" expires in ${daysLeft} day(s)`;
        });
        setNotifications(newNotifications);
      } catch (error) {
        console.error("Error fetching document details:", error);
      }
    };

    const fetchNotifications = () => {
      axios
        .get(`/api/admin-dashboard/get-notifications?uuid=${uuid}`)
        .then((response) => {
          const formattedNotifications = response.data.map((item) => {
            const providerInfo = item.providers_info || {};
            const timeRemaining = dayjs(item.expiry_date).diff(dayjs(), "days");

            const message =
              timeRemaining >= 0
                ? `${providerInfo.first_name} ${
                    providerInfo.middle_initial?.trim() || ""
                  } ${providerInfo.last_name}'s document "${
                    item.title
                  }" expires in ${timeRemaining} day${
                    timeRemaining !== 1 ? "s" : ""
                  }.`
                : `${providerInfo.first_name} ${
                    providerInfo.middle_initial?.trim() || ""
                  } ${providerInfo.last_name}'s document "${
                    item.title
                  }" expired ${Math.abs(timeRemaining)} day${
                    Math.abs(timeRemaining) !== 1 ? "s" : ""
                  } ago.`;

            return message;
          });

          const formattedTasks = response.data.map((item) => {
            const providerInfo = item.providers_info || {};
            const message = `Need to obtain ${providerInfo.first_name} ${
              providerInfo.middle_initial?.trim() || ""
            } ${providerInfo.last_name}'s document "${item.title}`;

            return message;
          });

          setNotifications(formattedNotifications);
          setTasks(formattedTasks);
          setLoading(false);
        })
        .catch((error) => console.error("Error fetching data:", error));
    };

    fetchDocumentDetails();
    fetchNotifications();
  }, []);

  return (
    <AdminDashboardLayout barTitle={"Admin Dashboard"}>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <div className="w-full flex flex-row justify-between items-center gap-4">
          <SubNavbar />

          <button className="flex flex-row justify-center px-6 items-center bg-gray-300 rounded-lg gap-2 py-2">
            <span className="text-lg">0</span>
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
                {notifications.length}
              </span>
            </div>
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="w-full flex flex-row justify-between items-center rounded-lg bg-gray-300 p-2 text-sm"
              >
                <span>{notification}</span>
              </div>
            ))}
          </div>
          <div className="w-[48%] border-2 border-black h-40 rounded-lg flex flex-col justify-start items-start p-4 gap-2">
            <div className="w-full flex flex-row justify-between items-center">
              <span className="text-lg font-semibold">Tasks</span>
              <button className="text-lg font-semibold text-white bg-green-500 size-6 flex justify-center items-center">
                +
              </button>
            </div>
            {tasks.map((task, index) => (
              <div
                key={index}
                className="w-full flex flex-row justify-between items-center rounded-lg bg-gray-300 p-2 text-sm"
              >
                <span>{task}</span>
              </div>
            ))}
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
              <StatusChart />
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
