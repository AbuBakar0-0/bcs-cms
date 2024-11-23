"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProvidersNavbar() {
    const router = useRouter();

    const sidenavLinks = [
        { title: "Dashboard", link: "/providerDetail/123" },
        { title: "Enrollment", link: "/enrollment" },
        { title: "Information", link: "/information" },
        { title: "Verification", link: "/verification" },
        { title: "Exclusions", link: "/exclusion" },
        { title: "Documents", link: "/providersDocument" },
        { title: "Privilege Declineation", link: "/" },
        { title: "Location Setup", link: "/" },
    ];

    return (
        <div className="w-full flex flex-row items-center gap-4 mt-4 text-sm bg-secondary text-white">
            {sidenavLinks.map((item, index) => (
                <Link href={item.link} key={index}>
                    <span className={`hover:font-semibold text-center ${router.pathname === item.link ? 'border-b-2 border-white' : ''}`}>
                        {item.title}
                    </span>
                </Link>
            ))}
        </div>
    );
}
