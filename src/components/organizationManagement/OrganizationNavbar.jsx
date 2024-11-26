"use client";
import Link from "next/link";

const OrganizationNavbar = () => {


    const sidenavLinks = [
        { title: "Information", link: "/orgInfo" },
        { title: "Practice Ids", link: "/orgIds" },
        { title: "Practice Location", link: "/orgLocation" },
        { title: "Practice Documents", link: "/orgDocs" },

    ];

    return (
        <div className="w-full flex flex-row items-center gap-4 mt-4 text-sm bg-secondary text-white">
            {sidenavLinks.map((item, index) => (
                <Link href={`${item.link}`} key={index}>
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
