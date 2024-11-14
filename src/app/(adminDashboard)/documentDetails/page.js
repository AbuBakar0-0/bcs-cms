import React from "react";
import { CiSearch } from "react-icons/ci";
import { CgOptions } from "react-icons/cg";

export default function DocumentDetails() {
  return (
    <>
      <header className="bg-secondary text-white py-4 px-6 rounded-lg">
        <h1 className="text-lg font-bold">2750 - Christina Hospital</h1>
      </header>

      <main className="flex flex-col flex-grow py-6 gap-4">
        <div className="flex flex-wrap justify-around gap-4">
          <div className="bg-red-600 text-white p-6 w-1/3 md:w-1/6 flex flex-col  flex-col-col items-center justify-center rounded-md">
            <p className="text-3xl font-bold">33</p>
            <p>Expired</p>
          </div>
          <div className="bg-yellow-400 text-white p-6 w-1/3 md:w-1/6 flex flex-col items-center justify-center rounded-md">
            <p className="text-3xl font-bold">17</p>
            <p>Expiring</p>
          </div>
          <div className="bg-gray-300 text-gray-800 p-6 w-1/3 md:w-1/6 flex flex-col items-center justify-center rounded-md">
            <p className="text-3xl font-bold">406</p>
            <p>Missing</p>
          </div>
          <div className="bg-green-600 text-white p-6 w-1/3 md:w-1/6 flex flex-col items-center justify-center rounded-md">
            <p className="text-3xl font-bold">67</p>
            <p>Active</p>
          </div>
          <div className="bg-blue-600 text-white p-6 w-1/3 md:w-1/6 flex flex-col items-center justify-center rounded-md">
            <p className="text-3xl font-bold">39</p>
            <p>On File</p>
          </div>
        </div>
        <div className="flex flex-row justify-end items-center gap-4">
          <input
            type="text"
            className="w-1/6 bg-gray-100 rounded-full px-4 py-2 text-black"
            placeholder="Search"
          />
          <div className="size-10 bg-primary text-white p-2 rounded-full flex justify-center items-center">
            <CiSearch className="size-8" />
          </div>
        </div>
        <div className="overflow-x-auto bg-white shadow-lg rounded-md">
          <table className="min-w-full text-left text-sm text-gray-600">
            <thead>
              <tr className="bg-secondary text-white">
                <th className="py-3 px-6 font-semibold">Document Type</th>
                <th className="py-3 px-6 font-semibold">Alias</th>
                <th className="py-3 px-6 font-semibold">Provider</th>
                <th className="py-3 px-6 font-semibold">Expiration Date</th>
                <th className="py-3 px-6 font-semibold">Last Update</th>
                <th className="py-3 px-6 font-semibold">Options</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-6">Board Certification Verification</td>
                <td className="py-3 px-6">-</td>
                <td className="py-3 px-6">Locke Erica</td>
                <td className="py-3 px-6">159 days ago</td>
                <td className="py-3 px-6">08/10/2022</td>
                <td className="py-3 px-6 text-blue-500">
                  <button className="text-blue-500 hover:underline">
                    <CgOptions className="size-5"/>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-center py-4">
          <button className="mx-2 text-blue-500 hover:underline">1</button>
          <button className="mx-2 text-blue-500 hover:underline">2</button>
          <button className="mx-2 text-blue-500 hover:underline">3</button>
          <button className="mx-2 text-blue-500 hover:underline">4</button>
        </div>
      </main>
    </>
  );
}
