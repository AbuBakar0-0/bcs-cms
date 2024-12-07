"use client";

import { useEffect, useState } from "react";
import ProvidersCard from "@/components/providersDashboard/ProvidersCard";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CiEdit, CiSearch } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import AdminDashboardLayout from "../../adminLayout";

export default function ProvidersDocument() {
  const { id } = useParams();
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(`/api/providers-document?uuid=${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch documents");
        }
        const data = await response.json();
        setDocuments(data);
        setFilteredDocuments(data); // Initialize filtered documents with all documents
      } catch (error) {
        console.error("Error fetching documents:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDocuments();
    }
  }, [id]);

  // Filter documents based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = documents.filter((document) =>
        document.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDocuments(filtered);
    } else {
      setFilteredDocuments(documents);
    }
  }, [searchQuery, documents]);

  return (
    <AdminDashboardLayout>
      <ProvidersCard id={id} />
      <div className="w-full flex flex-row justify-between items-center gap-4 my-4">
        <div className="w-1/3 flex flex-row justify-start items-center gap-4">
          <input
            type="text"
            className="w-full bg-gray-100 rounded-full px-4 py-2 text-black"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
          />
          <div className="size-10 bg-primary text-white p-2 rounded-full flex justify-center items-center">
            <CiSearch className="size-8" />
          </div>
        </div>

        <div className="w-2/3 flex flex-row justify-end items-center gap-4">
          <Link href={`/document/${id}`}>
            <Button
              title={"Add"}
              icon={<IoAddCircleOutline className="size-6" />}
            />
          </Link>
        </div>
      </div>
      <div className="min-h-screen flex flex-col md:flex-row">
        <main className="flex-1 py-4">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-200 text-left">
                  <tr>
                    <th className="p-3">Document Title</th>
                    <th className="p-3">Effective Date</th>
                    <th className="p-3">Expiration Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="text-center p-4"></td>
                    </tr>
                  ) : filteredDocuments.length > 0 ? (
                    filteredDocuments.map((document, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-3">{document.title}</td>
                        <td className="p-3">
                          {new Intl.DateTimeFormat("en-US").format(
                            new Date(document.effective_date)
                          )}
                        </td>
                        <td className="p-3">
                          {new Intl.DateTimeFormat("en-US").format(
                            new Date(document.expiry_date)
                          )}
                        </td>
                        <td
                          className={`p-3 ${
                            new Date(document.expiry_date) < Date.now()
                              ? "text-red-500"
                              : Math.ceil(
                                  (new Date(document.expiry_date) - Date.now()) /
                                    (1000 * 60 * 60 * 24)
                                ) < 30
                              ? "text-yellow-500"
                              : "text-green-500"
                          }`}
                        >
                          {new Date(document.expiry_date) < Date.now()
                            ? `Expired ${Math.abs(
                                Math.ceil(
                                  (new Date(document.expiry_date) - Date.now()) /
                                    (1000 * 60 * 60 * 24)
                                )
                              )} Days Ago`
                            : Math.ceil(
                                (new Date(document.expiry_date) - Date.now()) /
                                  (1000 * 60 * 60 * 24)
                              ) < 30
                            ? `${Math.ceil(
                                (new Date(document.expiry_date) - Date.now()) /
                                  (1000 * 60 * 60 * 24)
                              )} Days Left to Expire`
                            : "Active"}
                        </td>

                        <td className="p-3 flex flex-row justify-start items-center gap-2">
                          <FaEye className="text-secondary cursor-pointer" /> /
                          <CiEdit className="text-primary cursor-pointer" /> /
                          <MdDeleteOutline className="text-red-400 cursor-pointer" />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center p-4">
                        No documents found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </AdminDashboardLayout>
  );
}
