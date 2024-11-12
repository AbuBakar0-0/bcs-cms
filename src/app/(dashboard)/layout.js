import Link from "next/link";
import { FaArrowCircleRight } from "react-icons/fa";

const sidenavLinks = [
  {
    title: "Providers Information",
    link: "/providersInformation",
  },
  {
    title: "Professional IDs",
    link: "/professionalIds",
  },
  {
    title: "Education & Training",
    link: "/educationTraining",
  },
  {
    title: "Specialities",
    link: "/specialities",
  },
  {
    title: "Practice Locations",
    link: "/practiceLocations",
  },
  {
    title: "Hospital Affiliations",
    link: "/hospitalAffiliations",
  },
  {
    title: "Credentialing Contracts",
    link: "/credentialingContracts",
  },
  {
    title: "Employment Information",
    link: "/employmentInformation",
  },
  {
    title: "Professional References",
    link: "/professionalReferences",
  },
  {
    title: "Disclosures",
    link: "/disclosures",
  },
];

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-1/5 bg-gray-800 text-white p-5">
        <div className="flex flex-col gap-3">
          {sidenavLinks.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className="flex flex-row justify-start items-center gap-4"
            >
              <FaArrowCircleRight />
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-5">
        {children}
      </main>
    </div>
  );
}
