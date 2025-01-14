"use client";

import { useUserData } from "@/context/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowCircleRight } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

const sidenavLinks = [
  { title: "Admin Dashboard", link: "/adminDashboard", permission: "admin_dashboard" },
  { title: "Providers Dashboard", link: "/providersDashboard", permission: "provider_dashboard" },
  { title: "Organization Management", link: "/organizationManagement", permission: "organization_management" },
  { title: "Document Center", link: "/documentCenter", permission: "document_center" },
  { title: "Credentialing Status", link: "/credentialingStatus", permission: "credentialing_status" },
  { title: "Payers", link: "/payers", permission: "payers" },
  { title: "User Management", link: "/usersDashboard", permission: "user_management" },
  { title: "HR Hiring", link: "/hrHiring", permission: "hr_hiring" },
  { title: "Reporting", link: "/reporting", permission: "reporting" },
  { title: "Help Center", link: "/helpCenter", permission: "help_center" },
];

export default function AdminDashboardLayout({
  children,
  barTitle = "Providers Dashboard",
}) {
  const router = useRouter();

  const { userData } = useUserData();

  const handleLogout = () => {
    localStorage.removeItem("userData");
    router.push("/signin");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-1/6 text-white bg-secondary">
        <div className="flex flex-col gap-3">
          <Link href={"/"}>
            <img
              src="/assets/BCS Logo billingcaresolutions.com.svg"
              alt="HELLO"
              className="bg-white p-3 h-[5rem] w-full"
            />
          </Link>
          <div className="px-5">
            {sidenavLinks.map((link) => {
              if (userData[link.permission]) {
                return (
                  <Link
                    key={link.title}
                    href={link.link}
                    className="flex flex-row justify-start items-center gap-2"
                  >
                    <div className="w-full flex flex-col justify-center items-center gap-3">
                      <div className="w-full flex flex-row justify-start items-center gap-2 pt-2">
                        <FaArrowCircleRight />
                        <span>{link.title}</span>
                      </div>
                      <div className="bg-primary w-full h-[2px]"></div>
                    </div>
                  </Link>
                );
              }
              return null;
            })}
          </div>
        </div>
      </aside>

      <div className="flex flex-col flex-1">
        {/* Top Bar */}
        <header className="w-full h-[5rem] bg-gradient-to-r from-primary to-secondary text-white p-4 flex flex-row justify-between items-center gap-1">
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-xl font-semibold">
              {barTitle != "" ? barTitle : "Welcome to BCS-CMS Dashboard"}
            </h1>
            <p>Let's take a look at your credentials today!</p>
          </div>
          <div className="flex flex-row justify-end items-center gap-4">
            {/* <input
              type="text"
              className="bg-white w-full rounded-full px-4 py-2 text-black"
              placeholder="Search Here..."
            />
            <div className="size-10 bg-primary text-white p-2 rounded-full flex justify-center items-center">
              <CiSearch className="size-8" />
            </div> */}
            <button onClick={() => handleLogout()}>
              <IoLogOutOutline className="size-7" />
            </button>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 p-5">{children}</main>
      </div>
    </div>
  );
}
