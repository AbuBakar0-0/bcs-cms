import Link from "next/link";


export default function ProvidersNavbar() {

    const sidenavLinks = [
        { title: "Providers Information", link: "/providersInformation" },
        { title: "Professional IDs", link: "/professionalIds" },
        { title: "Education & Training", link: "/educationTraining" },
        { title: "Specialities", link: "/specialities" },
        { title: "Practice Profile", link: "/practiceProfile" },
        { title: "Practice Location", link: "/practiceLocation" },
        { title: "Hospital Affiliations", link: "/hospitalAffiliations" },
        { title: "Payer Setup", link: "/payerSetup" },
        { title: "Credentialing Contracts", link: "/credentialingContracts" },
        { title: "Employment Information", link: "/employmentInformation" },
        { title: "Professional References", link: "/professionalReferences" },
        { title: "Document", link: "/providersDocument" },
    ];

    return (
        <div className="w-full flex flex-row gap-4 mt-4 text-sm font-semibold">
            {sidenavLinks.map((item, index) => (
                <Link href={item.link} className="text-center hover:text-secondary" key={index}>
                    {item.title}
                </Link>
            ))}
        </div>
    )
}
