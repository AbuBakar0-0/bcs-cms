import Link from "next/link";

export default function SubNavbar() {

    const links = [
        {
          title: "Dashboard",
          link: "/adminDashboard",
        },
        {
          title: "Organization",
          link: "/organizationManagement",
        },
        {
          title: "Providers",
          link: "/providersDashboard",
        },
        {
          title: "Payers",
          link: "/payers",
        },
        {
          title: "Credentialing Status",
          link: "/credentialingStatus",
        },
        {
          title: "Documents",
          link: "/documentCenter",
        },
        {
          title: "HR Setup",
          link: "/hrHiring",
        },
        {
          title: "User Setup",
          link: "/usersDashboard",
        },
        {
          title: "Reporting",
          link: "/reporting",
        },
      ];

    return (
        <div className="w-5/6 px-4 py-3 flex flex-row justify-between items-center gap-1 bg-secondary text-white rounded-lg">
            {links.map((item, index) => (
                <Link
                    href={item.link}
                    key={index}
                    className="text-sm text-center hover:cursor-pointer"
                >
                    {item.title}
                </Link>
            ))}
        </div>
    )
}
