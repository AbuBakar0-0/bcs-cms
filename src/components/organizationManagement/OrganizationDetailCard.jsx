"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function OrganizationDetailCard() {
  const [organizationDetail, setOrganizationDetail] = useState({});
  const [loading, setLoading] = useState(true); // Default to `true` since data is being fetched

  const sidenavLinks = [
    { title: "Practice Locations", link: "/organizationLocation" },
    { title: "Providers", link: "/organizationProviders" },
    // { title: "Information", link: "" },
    // { title: "Practice Documents", link: "" },
  ];

  const { id } = useParams();

  useEffect(() => {
    const fetchOrganizationData = async () => {
      setLoading(true); // Start loading
      try {
        const orgDetailResponse = await axios.get(
          `/api/get-organization-detail?uuid=${id}`
        );
        setOrganizationDetail(orgDetailResponse.data[0]);
      } catch (error) {
        console.error("Error fetching organization details:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchOrganizationData();
  }, [id]);

  return (
    <div className="w-full flex flex-col bg-secondary rounded-lg gap-4 p-4 text-white">
      {loading ? (
        <div className="text-center"></div> // Replace with a spinner or better UI if needed
      ) : (
        <>
          <div className="w-full flex flex-row justify-between items-center gap-4">
            <div className="w-1/3 flex flex-col justify-start items-start gap-2">
              <h2 className="text-lg font-semibold text-left">
                {organizationDetail?.legal_business_name || "N/A"}
                <br />
                {organizationDetail?.doing_business_name || "N/A"}
              </h2>
              <p>
                Taxonomy Code: {organizationDetail?.taxonomy_code_1 || "N/A"}
              </p>
              <p>NPI 2: {organizationDetail?.npi_2 || "N/A"}</p>
              <p>Tax ID: {organizationDetail?.tax_id || "N/A"}</p>
            </div>

            <div className="w-1/3 flex flex-col justify-start items-start gap-2">
              <p>
                Address:
                {organizationDetail?.service_address?.address_line_1 || "N/A"},
                {organizationDetail?.service_address?.city || "N/A"},
                {organizationDetail?.service_address?.state || "N/A"}
              </p>
              <p>
                Taxonomy Code: {organizationDetail?.taxonomy_code_2 || "N/A"} :
                Blood Bank
              </p>
              <p>
                State: {organizationDetail?.service_address?.state || "N/A"}
              </p>
              <p>
                Zip Code:
                {organizationDetail?.service_address?.zip_code || "N/A"}
              </p>
              <p>
                Email: {organizationDetail?.service_contact?.email || "N/A"}
              </p>
            </div>
          </div>

          <div className="w-full flex flex-row items-center gap-4 mt-4 text-sm bg-secondary text-white">
            {sidenavLinks.map((item, index) => (
              <Link href={`${item.link}/${id}`} key={index}>
                <span className="hover:font-semibold text-center">
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
