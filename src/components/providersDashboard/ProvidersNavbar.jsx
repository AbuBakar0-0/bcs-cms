"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProvidersNavbar = ({ id }) => {
    const router = useRouter();

    const sidenavLinks = [
        { title: "Dashboard", link: "/providerDetail/" },
        { title: "Enrollment", link: "/enrollment/" },
        { title: "Information", link: "/providersInformation" },
        { title: "Verification", link: "/verification" },
        { title: "Credentialing Status", link: "/credentialingStatus" },
        { title: "Documents", link: "/providersDocument" },
        { title: "Privilege Declineation", link: "/privilege" },
        { title: "Location Setup", link: "/locationSetup" },
    ];

    return (
        <div className="w-full flex flex-row items-center gap-4 mt-4 text-sm bg-secondary text-white">
            {sidenavLinks.map((item, index) => (
                <Link href={item.title=="Credentialing Status"?`${item.link}`:`${item.link}/${id}`} key={index}>
                    <span
                        className={`hover:font-semibold text-center ${
                            router.pathname === `${item.link}${id}` ? "border-b-2 border-white" : ""
                        }`}
                    >
                        {item.title}
                    </span>
                </Link>
            ))}
        </div>
    );
};

export default ProvidersNavbar;
