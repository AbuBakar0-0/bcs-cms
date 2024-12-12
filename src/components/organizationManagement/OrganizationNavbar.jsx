"use client";
import Link from "next/link";

const OrganizationNavbar = ({uuid}) => {


    const sidenavLinks = [
        { title: "Providers", link: "/locationDetail" },
        { title: "Information", link: "/orgInfo" },
        { title: "Addresses", link: "/orgLocation" },
        { title: "Practice Documents", link: "/orgDocs" },
    ];

    return (
        <div className="w-full flex flex-row items-center gap-4 mt-4 text-sm bg-secondary text-white">
            {sidenavLinks.map((item, index) => (
                <Link href={`${item.link}/${uuid}`} key={index}>
                    <span
                        className={`hover:font-semibold text-center`}
                    >
                        {item.title}
                    </span>
                </Link>
            ))}
        </div>
    );
};

export default OrganizationNavbar;
