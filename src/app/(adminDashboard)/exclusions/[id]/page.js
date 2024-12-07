"use client";

import ProvidersCard from "@/components/providersDashboard/ProvidersCard";
import AdminDashboardLayout from "../../adminLayout";
import { useParams } from "next/navigation";

export default function Exclusions() {
  const {id} = useParams();
  return (
    <AdminDashboardLayout barTitle={"Providers Dashboard"}>
      <ProvidersCard id={id}/>

    </AdminDashboardLayout>
  );
}
