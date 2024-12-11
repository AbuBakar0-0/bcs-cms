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
  const [docsExpiringWeek, setDocsExpiringWeek] = useState(0);
  const [loading, setLoading] = useState(false);
  const [payersData, setPayersData] = useState([]);

  function formatNotification(data) {
    let notifications = [];
    data.forEach((item) => {
      const { name, type, days } = item;
      let notificationMessage = "";
      let isExpiringToday = false;
      let isExpiringWeek = false;
      if (days === 0) {
        notificationMessage = `${name}'s ${type} is expiring today.`;
        isExpiringToday = true; // Mark as expiring today
      } 
      else if (days > 0) {
        if (days <= 7) {
          isExpiringWeek = true;
          setDocsExpiringWeek((prev) => prev + 1);
        }
        notificationMessage = `${name}'s ${type} is expiring in ${days} days.`;
      } 
      else if (days < 31 && days > -31) {
        console.log(days);
        notificationMessage = `${name}'s ${type} expired ${Math.abs(
          days
        )} days ago.`;
      }

      notifications.push({
        message: notificationMessage,
        isExpiringToday,
        isExpiringWeek, // Add this property to track if it's expiring today
      });
    });

    // Sort notifications: Place expiring today at the top
    notifications.sort(
      (a, b) => (b.isExpiringToday ? 1 : 0) - (a.isExpiringToday ? 1 : 0)
    );

    return notifications;
  }

  function formatTasks(data) {
    let tasks = [];
    data.forEach((item) => {
      const { name, type, days } = item;
      let taskMessage = "";
      let isExpiringToday = false;
      let isExpiringWeek = false;

      if (days === 0) {
        taskMessage = `Update ${name}'s ${type}`;
        isExpiringToday = true; // Mark as expiring today
      } else if (days > 0) {
        if (days <= 7) {
          isExpiringWeek = true;
        }
        taskMessage = `Update ${name}'s ${type}`;
      } else if (days < 31) {
        taskMessage = `Update ${name}'s ${type}`;
      }

      tasks.push({
        message: taskMessage,
        isExpiringToday,
        isExpiringWeek,
      });
    });

    // Sort notifications: Place expiring today at the top
    tasks.sort(
      (a, b) => (b.isExpiringToday ? 1 : 0) - (a.isExpiringToday ? 1 : 0)
    );

    return tasks;
  }

  useEffect(() => {
    const uuid = localStorage.getItem("user_uuid");

    const fetchDocumentDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/admin-dashboard?uuid=${uuid}`);
        setDocumentData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching document details:", error);
      }
    };

    const fetchExpiredLicense = async () => {
      try {
        const response = await axios.get(
          `/api/admin-dashboard/get-expired-license?uuid=${uuid}`
        );
        const formattedNotifications = formatNotification(response.data);

        setNotifications((prevNotifications) => [
          ...prevNotifications,
          ...formattedNotifications,
        ]);

        const formattedTasks = formatTasks(response.data);
        setTasks((prevTasks) => [...prevTasks, ...formattedTasks]);
      } catch (error) {
        console.error("Error fetching expired licenses:", error);
      }
    };

    const fetchExpiredIds = async () => {
      try {
        const response = await axios.get(
          `/api/admin-dashboard/get-expired-ids?uuid=${uuid}`
        );
        const formattedNotifications = formatNotification(response.data);
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          ...formattedNotifications,
        ]);

        const formattedTasks = formatTasks(response.data);
        setTasks((prevTasks) => [...prevTasks, ...formattedTasks]);
      } catch (error) {
        console.error("Error fetching expired IDs:", error);
      }
    };

    const fetchExpiredDocuments = async () => {
      try {
        const response = await axios.get(
          `/api/admin-dashboard/get-expired-documents?uuid=${uuid}`
        );
        const formattedNotifications = formatNotification(response.data);
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          ...formattedNotifications,
        ]);

        const formattedTasks = formatTasks(response.data);
        setTasks((prevTasks) => [...prevTasks, ...formattedTasks]);
      } catch (error) {
        console.error("Error fetching expired documents:", error);
      }
    };

    const fetchPayers = async () => {
      try {
        const response = await axios.get(
          `/api/admin-dashboard/get-payers?uuid=${uuid}`
        );
        setPayersData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payers:", error);
      }
    };

    fetchDocumentDetails();
    fetchExpiredDocuments();
    fetchExpiredIds();
    fetchExpiredLicense();
    fetchPayers();
  }, []);

  return (
    <AdminDashboardLayout barTitle={"Admin Dashboard"}>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <div className="w-full flex flex-row justify-between items-center gap-4">
          <SubNavbar />

          <button className="flex flex-row justify-center px-6 items-center bg-gray-300 rounded-lg gap-2 py-2">
            <span className="text-lg">{docsExpiringWeek}</span>
            <span className="text-xs text-red-500">
              <span className="text-secondary">Documents</span> <br />
              Expiring in a Week
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
                  className={`uppercase w-full flex flex-row justify-between items-center rounded-lg p-2 text-sm ${
                    notification.isExpiringToday
                      ? "bg-red-400 text-white"
                      : "bg-gray-300"
                  }
                  ${
                    notification.isExpiringWeek
                      ? "bg-yellow-400 text-white"
                      : "bg-gray-300"
                  }
                  `}
                >
                  <span>{notification.message}</span>
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
              tasks.map((task, index) => (
                <div
                  key={index}
                  className={`uppercase w-full flex flex-row justify-between items-center rounded-lg p-2 text-sm ${
                    task.isExpiringToday
                      ? "bg-red-400 text-white"
                      : "bg-gray-300"
                  }
                  ${
                    task.isExpiringWeek
                      ? "bg-yellow-400 text-white"
                      : "bg-gray-300"
                  }
                  `}
                >
                  <span>{task.message}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="w-full flex flex-row justify-between items-start gap-4">
          <div className="w-[60%] flex flex-col justify-start items-start gap-4">
            <div className="w-full h-auto border-4 border-primary flex flex-col justify-start items-start gap-4 rounded-lg p-2">
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
              <span className="text-lg font-semibold">Payers Status</span>
              {loading ? (
                <div className="w-full flex justify-center">
                  <ClipLoader />
                </div>
              ) : (
                <PayersChart data={payersData} />
              )}
            </div>
            <div className="w-full h-72 border-4 border-primary flex flex-col justify-center items-center gap-4 rounded-lg p-4">
              <span className="text-lg font-semibold">HR Status</span>
              <HrChart />
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
