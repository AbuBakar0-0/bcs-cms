import Link from "next/link";
import { FaArrowCircleRight } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";

const sidenavLinks = [
  { title: "Admin Dashboard", link: "/adminDashboard" },
  { title: "Providers Dashboard", link: "/providersDashboard" },
  { title: "Organization Management", link: "/organizationManagement" },
  { title: "Document Center", link: "/documentCenter" },
  { title: "Credentialing Status", link: "/credentialingStatus" },
  { title: "Payers", link: "/payers" },
  { title: "User Management", link: "/usersDashboard" },
  { title: "HR Hiring", link: "/hrHiring" },
  { title: "Reporting", link: "" },
  // { title: "Incident Reporting Configuration", link: "" },
  { title: "Help Center", link: "" },
];

export default function AdminDashboardLayout({
  children,
  barTitle = "Providers Dashboard",
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-1/6 text-white bg-secondary">
        <div className="flex flex-col gap-3">
          <Link href={"/"}>
            <img
              src="/assets/BCS Logo billingcaresolutions.com.svg"
              alt="HELLO"
              className="bg-white p-5 h-[7.2rem] w-full"
            />
          </Link>
          <div className="px-5">
            {sidenavLinks.map((item, index) => (
              <Link
                href={item.link}
                key={index}
                className="flex flex-row justify-start items-center gap-2"
              >
                <div className="w-full flex flex-col justify-center items-center gap-3">
                  <div className="w-full flex flex-row justify-start items-center gap-2 pt-2">
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

      <div className="flex flex-col flex-1">
        {/* Top Bar */}
        <header className="w-full h-[7rem] bg-gradient-to-r from-primary to-secondary text-white p-4 flex flex-row justify-between items-center gap-2">
          <div className="flex flex-col justify-center items-start gap-2">
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
            <Link href={"/signin"}>
              <IoLogOutOutline className="size-7" />
            </Link>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 p-5">{children}</main>
      </div>
    </div>
  );
}
