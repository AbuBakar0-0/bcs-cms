import Dropdown from "@/components/ui/inputFields/DropDown";
import TextInput from "@/components/ui/inputFields/TextInput";
import Link from "next/link";
import React from "react";
import { CiUser } from "react-icons/ci";
import { CiCircleQuestion } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";

export default function page() {
  return (
    <>
      <div className="w-full flex flex-row justify-between items-center">
        <Dropdown
          title={"Filter"}
          options={["All"]}
          width="w-1/6"
          required={false}
        />
        <button className="bg-secondary px-4 py-3 rounded-lg text-white flex flex-row justify-center items-center gap-4">
          <IoAddCircleOutline className="size-6" />
          <p>Add Provider</p>
        </button>
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
          Actions <CiCircleQuestion className="size-6" />
        </span>
      </div>

      <div className="w-full flex flex-row items-center justify-between gap-4 p-4 rounded-lg shadow-md rounded-b-md overflow-x-auto">
        <Link href={"/providerDetail"} className="w-full">
          <div className="w-full flex flex-row justify-between items-center gap-4 p-4 border-b">
            <div className="w-1/3 flex flex-row items-center gap-4">
              <CiUser className="border-2 border-secondary rounded-full size-20 p-2" />
              <div>
                <p className="font-bold text-lg">Anderson, Jay C - MD</p>
                <p className="text-gray-500">Internal Medicine</p>
                <p className="text-xs text-gray-400">NPI 1694933927</p>
              </div>
            </div>

            <div className="w-1/5 flex justify-center items-center">
              Internal Medicine
            </div>

            <div className="w-1/6 flex justify-center items-center">
              No alerts
            </div>

            <div className="w-1/5 flex flex-row justify-center items-center gap-2">
              <button className="text-blue-500 hover:text-blue-700">✉️</button>
              <button className="text-blue-500 hover:text-blue-700">👤</button>
              <button className="text-blue-500 hover:text-blue-700">✏️</button>
              <button className="text-yellow-500 hover:text-yellow-700">
                ⚠️
              </button>
              <button className="text-green-500 hover:text-green-700">
                ✔️
              </button>
              <button className="text-red-500 hover:text-red-700">🔄</button>
            </div>
          </div>
        </Link>
      </div>

      <div className="flex justify-between items-center p-4 border-t bg-white">
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          ❮
        </button>
        <span>1 - 89 of 89 items</span>
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          ❯
        </button>
      </div>
    </>
  );
}
