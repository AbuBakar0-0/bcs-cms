"use client";

import Button from "@/components/ui/Button";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { BarLoader } from "react-spinners";
import AdminDashboardLayout from "../adminLayout";

export default function Reporting() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uuid, setUuid] = useState();

  const [filters, setFilters] = useState({
    planType: [],
    business: [],
    payerName: [],
    status: [],
  });

  const [dropdownOpen, setDropdownOpen] = useState({
    planType: false,
    business: false,
    payerName: false,
    status: false,
  });

  const dropdownRefs = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      setUuid(localStorage.getItem("user_uuid"));
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/payers?uuid=${localStorage.getItem("user_uuid")}`
        );
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Close all dropdowns if clicked outside
    const handleClickOutside = (event) => {
      const clickedOutside = Object.values(dropdownRefs.current).every(
        (ref) => ref && !ref.contains(event.target)
      );
      if (clickedOutside) {
        setDropdownOpen({
          planType: false,
          business: false,
          payerName: false,
          status: false,
        });
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const getColor = (status) => {
    const statusClasses = {
      Submitted: "text-blue-500",
      "In-Progress": "text-yellow-500",
      Approved: "text-green-500",
      Rejected: "text-red-500",
      "Panel Closed": "text-purple-500",
      "Missing Information": "text-orange-500",
    };

    return statusClasses[status] || "bg-gray-500 text-white";
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const updated = [...prev[key]];
      if (updated.includes(value)) {
        return { ...prev, [key]: updated.filter((item) => item !== value) };
      } else {
        updated.push(value);
        return { ...prev, [key]: updated };
      }
    });
  };

  const toggleDropdown = (key) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    // Close other dropdowns when one is clicked
    Object.keys(dropdownOpen).forEach((item) => {
      if (item !== key) setDropdownOpen((prev) => ({ ...prev, [item]: false }));
    });
  };

  const renderDocuments = () => {
    const filteredDocs = data.filter((doc) => {
      const providerFullName = `${doc.providers_info?.first_name || ""} ${
        doc.providers_info?.last_name || ""
      }`;

      return (
        (!filters.planType.length || filters.planType.includes(doc.plan_type)) &&
        (!filters.business.length || filters.business.includes(doc.business)) &&
        (!filters.payerName.length || filters.payerName.includes(doc.payer_name)) &&
        (!filters.status.length || filters.status.includes(doc.status))
      );
    });

    return filteredDocs.map((doc, index) => (
      <tr className="border-b" key={index}>
        <td className="p-3">{doc.plan_type}</td>
        <td className="p-3">{doc.business}</td>
        <td className="p-3">
          {doc.providers_info?.first_name} {doc.providers_info?.middle_initial}{" "}
          {doc.providers_info?.last_name}
        </td>
        <td className="p-3">{doc.payer_name}</td>
        <td className={`p-3 ${getColor(doc.status)}`}>{doc.status}</td>
        <td className="p-3">{doc.application_date}</td>
        <td className="p-3">{doc.note}</td>
      </tr>
    ));
  };

  const renderDropdown = (key, options) => {
    return (
      <div className="relative" ref={(el) => (dropdownRefs.current[key] = el)}>
        <button
          onClick={() => toggleDropdown(key)}
          className="bg-gray-100 rounded px-4 py-2"
        >
          {key.charAt(0).toUpperCase() + key.slice(1)} Filters
        </button>
        {dropdownOpen[key] && (
          <div className="absolute bg-white border rounded shadow p-4 mt-2 z-10">
            {options.map((option, idx) => (
              <div key={idx} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={filters[key].includes(option)}
                  onChange={() => handleFilterChange(key, option)}
                  className="mr-2"
                />
                <label>{option}</label>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <AdminDashboardLayout barTitle="Payers">
      <div className="flex flex-row justify-between items-center mt-4 mb-4 gap-4">
        <div className="flex flex-wrap gap-4">
          {renderDropdown(
            "planType",
            Array.from(new Set(data.map((doc) => doc.plan_type)))
          )}
          {renderDropdown(
            "business",
            Array.from(new Set(data.map((doc) => doc.business)))
          )}
          {renderDropdown(
            "payerName",
            Array.from(new Set(data.map((doc) => doc.payer_name)))
          )}
          {renderDropdown(
            "status",
            Array.from(new Set(data.map((doc) => doc.status)))
          )}
        </div>

        <Link href={`/payerSetup/${uuid}`}>
          <Button
            title={"Add"}
            icon={<IoAddCircleOutline className="size-6" />}
          />
        </Link>
      </div>

      <div className="min-h-screen flex flex-col md:flex-row">
        <main className="flex-1 py-4">
          {loading ? (
            <div className="w-full flex justify-center items-center">
              <BarLoader />
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead className="bg-gray-200 text-left">
                    <tr>
                      <th className="p-3">Plan Type</th>
                      <th className="p-3">Business</th>
                      <th className="p-3">Provider Name</th>
                      <th className="p-3">Payer Name</th>
                      <th className="p-3">Application Status</th>
                      <th className="p-3">Application Date</th>
                      <th className="p-3">Application Details</th>
                    </tr>
                  </thead>
                  <tbody>{renderDocuments()}</tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </AdminDashboardLayout>
  );
}
