"use client";
import Chatbot from "@/components/Chatbot";
import AdminDashboardLayout from "../adminLayout";

function HelpCenter() {
  return (
    <AdminDashboardLayout barTitle="Help Center">
        <Chatbot/>
    </AdminDashboardLayout>

  );
}

export default HelpCenter;
