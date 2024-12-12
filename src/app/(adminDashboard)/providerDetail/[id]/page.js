"use client";
import ProvidersCard from "@/components/providersDashboard/ProvidersCard";
import { useParams } from "next/navigation";
import { CiEdit } from "react-icons/ci";
import AdminDashboardLayout from "../../adminLayout";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import axios from "axios";

const ProviderDetail = () => {
  const { id: uuid } = useParams(); // Get the provider ID from route params

  const VerifiedChart = dynamic(
    () => import("../../adminDashboard/VerifiedChart"),
    {
      ssr: false, // Ensure this component is only rendered on the client
    }
  );

  const DocumentChart = dynamic(
    () => import("../../adminDashboard/DocumentsChart"),
    {
      ssr: false, // Ensure this component is only rendered on the client
    }
  );

  const PieChart = dynamic(() => import("../../adminDashboard/pieChart"), {
    ssr: false, // Ensure this component is only rendered on the client
  });

  const [documentData, setDocumentData] = useState([]); // State to hold the document data
  const [loading, setLoading] = useState(false);
  const [payersData, setPayersData] = useState([]);
  const [caqhExpiry, setCaqhExpiry] = useState();

  useEffect(() => {
    const fetchDocumentDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/provider-detail?uuid=${uuid}`);

        setDocumentData(response.data);
      } catch (error) {
        console.error("Error fetching document details:", error);
      }
    };

    const fetchPayers = async () => {
      try {
        const response = await axios.get(
          `/api/provider-detail/get-payer?uuid=${uuid}`
        );
        setPayersData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching document details:", error);
      }
    };

    const fetchCAQHExpiry = async () => {
      try {
        const response = await axios.get(`/api/get-caqh-expiry?uuid=${uuid}`);
        setCaqhExpiry(response.data[response.data.length - 1]);
      } catch (error) {
        console.error("Error fetching document details:", error);
      }
    };

    fetchDocumentDetails();
    fetchPayers();
    fetchCAQHExpiry();
  }, []);

  return (
    <AdminDashboardLayout>
      <>
        <ProvidersCard id={uuid} />

        <div className="w-full flex flex-col justify-start items-start gap-4  mt-4">
          <div className="w-full flex flex-row justify-between items-center gap-4">
            {loading ? (
              <></>
            ) : (
              <>
                <div className="w-1/2 border-2 border-secondary rounded-lg p-2">
                  {caqhExpiry?.professional_ids == null
                    ? "No Expiry Found"
                    : () => {
                        const expiryDate = new Date(caqhExpiry?.expiry_date);
                        const currentDate = new Date();
                        const timeDifference = expiryDate - currentDate;

                        // Calculate the difference in days
                        const daysLeft = Math.ceil(
                          timeDifference / (1000 * 3600 * 24)
                        );

                        if (daysLeft < 0) {
                          return (
                            <span className="text-red-400">
                              CAQH Expired {daysLeft * -1} days ago
                            </span>
                          );
                        } else {
                          return (
                            <span
                              className={`${
                                daysLeft < 10
                                  ? "text-orange-400"
                                  : "text-primary"
                              } font-semibold`}
                            >
                              {daysLeft} days{" "}
                              <span className="text-black">
                                left until CAQH expiry
                              </span>
                            </span>
                          );
                        }
                      }}
                </div>
              </>
            )}

            <Link href={`/providersInformation/${uuid}`}>
              <button className="flex flex-row gap-2 justify-center items-center border-4 border-primary rounded-lg px-6 py-2">
                <CiEdit />
                <span>Edit Provider</span>
              </button>
            </Link>
          </div>
          <div className="w-full flex flex-row justify-between items-start gap-4">
            <div className="w-[60%] flex flex-col justify-start items-start gap-4">
              <div className="w-full h-auto border-4 border-primary flex flex-col justify-start items-start gap-4 rounded-lg p-4">
                <span className="text-lg font-semibold">Documents</span>
                {loading ? (
                  <div className="w-full h-full flex justify-center items-center ">
                    <ClipLoader />
                  </div>
                ) : (
                  <DocumentChart data={documentData} />
                )}
              </div>
              <div className="w-full border-4 border-primary flex flex-col justify-start items-start gap-4 rounded-lg p-4">
                <span className="text-lg font-semibold">Verifications</span>
                <VerifiedChart />
              </div>
            </div>
            <div className="w-[48%] flex flex-col justify-start items-center gap-4">
              <div className="w-full h-auto border-4 border-primary flex flex-col justify-center items-center gap-4 rounded-lg p-4">
                <span className="text-lg font-semibold">
                  Payers Credentialing Status
                </span>
                {loading ? (
                  <div className="w-full h-full flex justify-center items-center ">
                    <ClipLoader />
                  </div>
                ) : (
                  <PieChart data={payersData} />
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </AdminDashboardLayout>
  );
};

export default ProviderDetail;
