"use client";
import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/inputFields/DropDown";
import TextInput from "@/components/ui/inputFields/TextInput";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function Page() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch providers function
  const fetchProviders = async () => {
    try {
      const response = await fetch("/api/adminDashboard/get-providers");
      if (!response.ok) throw new Error("Failed to fetch providers");

      const data = await response.json();
      setProviders(data.providers);
    } catch (error) {
      console.error("Error fetching providers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center">
        <Dropdown
          title={"Filter"}
          options={["All"]}
          width="w-1/6"
          required={false}
        />
        <Link href={"/providersInformation"}>
          <Button
            title={"Add Provider"}
            icon={<IoAddCircleOutline className="size-6" />}
          />
        </Link>
      </div>
      <div className="w-full flex flex-row items-center justify-between gap-4 bg-secondary p-4 rounded-lg my-5">
        <TextInput
          title={"Search Name, Speciality or NPI"}
          required={false}
          width={"w-1/3"}
          labelColor={"text-white"}
        />
        <TextInput
          title={"Tags"}
          required={false}
          width={"w-1/5"}
          labelColor={"text-white"}
        />
        <TextInput
          title={"Compliance"}
          required={false}
          width={"w-1/6"}
          labelColor={"text-white"}
        />
        <span className="w-1/5 flex flex-row justify-center items-center gap-4 text-white">
          Actions
        </span>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading providers...</p>
      ) : providers.length > 0 ? (
        providers.map((provider) => (
          <div className="w-full flex flex-row items-center justify-between gap-4 p-4 border-b" key={provider.uuid}>
            <Link href={"/providersInformation"} className="w-1/3">
              <div className="w-full flex flex-row items-center gap-4">
                <CiUser className="border-2 border-secondary rounded-full size-20 p-2" />
                <div>
                  <p className="font-bold text-lg">
                    {provider.last_name}, {provider.first_name}{" "}
                    {provider.middle_initial} - {provider.provider_title}
                  </p>
                  <p className="text-gray-500">
                    {provider.speciality || "N/A"}
                  </p>
                  <p className="text-xs text-gray-400">
                    NPI {provider.ssn || "Unknown"}
                  </p>
                </div>
              </div>
            </Link>
            <div className="w-1/5 flex justify-center items-center">
              {provider.license_id || "Unknown"}
            </div>

            <div className="w-1/6 flex justify-center items-center">
              {provider.compliance || "No alerts"}
            </div>

            <div className="w-1/5 flex flex-row justify-center items-center gap-2">
              <button className="text-blue-500 hover:text-blue-700">
                <FiEdit2 />
              </button>
              <button className="text-red-500 hover:text-red-700">
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No providers found.</p>
      )}

      <div className="flex justify-between items-center p-4 border-t bg-white">
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          ❮
        </button>
        <span>{providers.length} items</span>
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          ❯
        </button>
      </div>
    </>
  );
}
