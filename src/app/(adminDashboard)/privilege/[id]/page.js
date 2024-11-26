import ProvidersCard from "@/components/providersDashboard/ProvidersCard";
import AdminDashboardLayout from "../../adminLayout";

export default function Privilege() {
  return (
    <AdminDashboardLayout barTitle={"Providers Dashboard"}>
      <ProvidersCard />

    </AdminDashboardLayout>
  );
}
