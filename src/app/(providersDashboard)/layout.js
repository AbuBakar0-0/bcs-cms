"use client";

import { sidenavLinks } from "@/data/sideNavLinks";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

export default function DashboardLayout({ children }) {
  const { id } = useParams();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Set initial loading state to true

  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/providers/${id}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data.provider); // Set the fetched data into the state
        } else {
          setUserData({first_name:"Welcome",middle_initial:"to",last_name:"BCS-CMS"}); // Set the fetched data into the state
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false once the fetch is complete
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-1/6 bg-secondary text-white">
        <div className="flex flex-col gap-3">
          <Link href={"/"}>
            <img
              src="/assets/BCS Logo billingcaresolutions.com.svg"
              alt="BCS Logo"
              className="bg-white p-2 h-[5rem] w-full"
            />
          </Link>
          <div className="px-5">
            <Link href={"/adminDashboard"}>
              <div className="w-full flex flex-col justify-center items-center gap-3">
                <div className="w-full flex flex-row justify-start items-center gap-4 pt-2">
                  <FaArrowCircleRight />
                  <span>Admin Dashboard</span>
                </div>
                <div className="bg-primary w-full h-[2px]"></div>
              </div>
            </Link>
            {sidenavLinks.map((item, index) => (
              <Link
                href={`${item.link}/${id}`}
                key={index}
                className="flex flex-row justify-start items-center gap-4"
              >
                <div className="w-full flex flex-col justify-center items-center gap-3">
                  <div className="w-full flex flex-row justify-start items-center gap-4 pt-2">
                    <FaArrowCircleRight />
                    <span>{item.title}</span>
                  </div>
                  <div className="bg-primary w-full h-[2px]"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {/* Main content area with top bar */}
      <div className="flex flex-col flex-1">
        {/* Top Bar */}
        <header className="w-full h-[5rem] bg-secondary text-white p-4 flex flex-row justify-between items-center gap-2">
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-xl font-semibold">
              {loading
                ? "Welcome to BCS-CMS"
                : `${userData.first_name} ${userData.middle_initial || ""} ${userData.last_name}`}
            </h1>
            <p>Let's take a look at your credentials today!</p>
          </div>
          <Link href={"/signin"}>
            <FiLogOut className="size-6" />
          </Link>
        </header>

        {/* Main content area */}
        <main className="flex-1 p-5">{children}</main>
      </div>
    </div>
  );
}
