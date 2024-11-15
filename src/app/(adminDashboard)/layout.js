import Link from "next/link";
import { FaArrowCircleRight } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

const sidenavLinks = [
  { title: "Admin Dashboard", link: "/adminDashboard" },
  { title: "Providers Dashboard", link: "" },
  { title: "Organization Management", link: "" },
  { title: "Practice Location", link: "" },
  { title: "Document Center", link: "" },
  { title: "Credentialing Status", link: "" },
  { title: "Payer", link: "" },
  { title: "User Management", link: "" },
  { title: "HR Hiring", link: "" },
  { title: "Reporting", link: "" },
  { title: "Incident Reporting Configuration", link: "" },
  { title: "Help Center", link: "" },
];

export default function AdminDashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-1/5 bg-secondary text-white">
        <div className="flex flex-col gap-3">
          <Link href={"/"}>
            <img
              src="./assets/BCS Logo billingcaresolutions.com.svg"
              alt=""
              className="bg-white p-5 h-[7.2rem]"
            />
          </Link>
          <div className="px-5">
            {sidenavLinks.map((item, index) => (
              <Link
                href={item.link}
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
        <header className="w-full h-[7.2rem] bg-secondary text-white p-4 flex flex-row justify-between items-center gap-2">
          <div className="flex flex-col justify-center items-start gap-2">
            <h1 className="text-xl font-semibold">Welcome to BCS-CMS Dashboard</h1>
            <p>Let's take a look at your credentials today!</p>
          </div>
          <div className="flex flex-row justify-end items-center gap-4">
            <input
              type="text"
              className="bg-white w-full rounded-full px-4 py-2 text-black"
              placeholder="Search Here..."
            />
            <div className="size-10 bg-primary text-white p-2 rounded-full flex justify-center items-center">
              <CiSearch className="size-8" />
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 p-5">{children}</main>
      </div>
    </div>
  );
}
