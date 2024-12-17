"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import BaseInput from "@/components/ui/inputFields/BaseInput";
import DateInput from "@/components/ui/inputFields/DateInput";
import Dropdown from "@/components/ui/inputFields/DropDown";
import NavBottom from "@/components/ui/NavBottom";
import { useProviders } from "@/hooks/useProvider";
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { useDocuments } from "./useDocument";
import { documentsList, statusOptions } from "./utilis";
import TextInput from "@/components/ui/inputFields/TextInput";
import toast from "react-hot-toast";
import RadioButton from "@/components/ui/inputFields/RadioButtons";

export default function DocumentPage() {
  const {
    showForm,
    showOrganizationForm,
    documents,
    formData,
    isEditing,
    loading,
    organizationList,

    handleEditOrganization,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleView,
    toggleForm,
    toggleOrganizationForm,
    resetForm,
  } = useDocuments();

  const { providers } = useProviders();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reason, setReason] = useState("");
  const [selectedDoc, setSelectedDoc] = useState(null);

  const handleDeleteClick = (doc) => {
    setShowDeleteModal(true);
    setSelectedDoc(doc);
  };

  const handleConfirmDelete = () => {
    if (selectedDoc) {
      if (reason != "") {
        handleDelete({ ...selectedDoc, reason });

        setShowDeleteModal(false);
        setReason("");
        setSelectedDoc(null);
      } else {
        toast.error("Please Specify the reason");
      }
    }
  };

  

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 p-4">
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="text-xl font-semibold">Documents</h1>
        <div className="w-max flex gap-4">
          <Button
          width="w-max"
            title="Add Provider Document"
            icon={<IoAddCircleOutline className="size-6" />}
            onClick={() => toggleForm(true)}
            disabled={loading}
          />
          <Button
            width="w-max"
            title="Add Organization Document"
            icon={<IoAddCircleOutline className="size-6" />}
            onClick={() => toggleOrganizationForm(true)}
            disabled={loading}
          />
        </div>
      </div>

      {showForm && (
        <div className="w-full bg-white rounded-lg shadow-lg p-6">
          <div className="w-full flex flex-wrap justify-between items-center">
          <input type="hidden" value={formData.type='provider'} />
            <Dropdown
              title="Document Type"
              name="title"
              options={documentsList}
              value={formData.title}
              onChange={handleChange}
              width="w-[48%]"
            />
            <Dropdown
              disabled={isEditing}
              title="Provider"
              name="provider"
              options={providers}
              value={formData.provider}
              width="w-[48%]"
              onChange={handleChange}
            />
            <Dropdown
              title="Status"
              name="status"
              options={statusOptions}
              value={formData.status}
              width="w-[48%]"
              onChange={handleChange}
            />
            <div
              className={`${
                formData.status == "Missing" ||
                formData.status == "Requested Provider"
                  ? "hidden"
                  : "flex w-[48%]"
              }`}
            >
              <DateInput
                title="Effective Date"
                required={
                  formData.status !== "Missing" &&
                  formData.status !== "Requested Provider"
                }
                name="effective_date"
                value={formData.effective_date}
                onChange={handleChange}
                width="w-full"
              />
            </div>

            <div
              className={`${
                formData.status == "Missing" ||
                formData.status == "Requested Provider"
                  ? "hidden"
                  : "flex w-full justify-between "
              }`}
            >
              <DateInput
                title="Expiry Date"
                name="expiry_date"
                value={formData.expiry_date}
                width="w-[48%]"
                onChange={handleChange}
                required={
                  formData.status !== "Missing" &&
                  formData.status !== "Requested Provider"
                }
              />
              <BaseInput
                required={
                  formData.status !== "Missing" &&
                  formData.status !== "Requested Provider"
                }
                title="Upload File"
                type="file"
                name="file"
                width="w-[48%]"
                onChange={handleChange}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <Button
              type="button"
              title="Cancel"
              variant="outline"
              onClick={() => {
                toggleForm(false);
                resetForm();
              }}
            />
            <Button
              type="submit"
              onClick={handleSubmit}
              title={isEditing ? "Update" : "Save"}
              disabled={loading}
            />
          </div>
        </div>
      )}

      {showOrganizationForm && (
        <div className="w-full bg-white rounded-lg shadow-lg p-6">
          <div className="w-full flex flex-wrap justify-between items-center">
            <input type="hidden" value={formData.type='organization'} />
            <Dropdown
              title="Document Type"
              name="title"
              options={documentsList}
              value={formData.title}
              onChange={handleChange}
              width="w-[48%]"
            />
            <Dropdown
              title="Organization Name"
              name="organization"
              options={organizationList}
              value={formData.organization}
              onChange={handleChange}
              width="w-[48%]"
            />
            <Dropdown
              title="Status"
              name="status"
              options={statusOptions}
              value={formData.status}
              width="w-[48%]"
              onChange={handleChange}
            />
            <div
              className={`${
                formData.status == "Missing" ||
                formData.status == "Requested Provider"
                  ? "hidden"
                  : "flex w-[48%]"
              }`}
            >
              <DateInput
                title="Effective Date"
                required={
                  formData.status !== "Missing" &&
                  formData.status !== "Requested Provider"
                }
                name="effective_date"
                value={formData.effective_date}
                onChange={handleChange}
                width="w-full"
              />
            </div>

            <div
              className={`${
                formData.status == "Missing" ||
                formData.status == "Requested Provider"
                  ? "hidden"
                  : "flex w-full justify-between "
              }`}
            >
              <DateInput
                title="Expiry Date"
                name="expiry_date"
                value={formData.expiry_date}
                width="w-[48%]"
                onChange={handleChange}
                required={
                  formData.status !== "Missing" &&
                  formData.status !== "Requested Provider"
                }
              />
              <BaseInput
                required={
                  formData.status !== "Missing" &&
                  formData.status !== "Requested Provider"
                }
                title="Upload File"
                type="file"
                name="file"
                width="w-[48%]"
                onChange={handleChange}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <Button
              type="button"
              title="Cancel"
              variant="outline"
              onClick={() => {
                toggleForm(false);
                resetForm();
              }}
            />
            <Button
              type="submit"
              onClick={handleSubmit}
              title={isEditing ? "Update" : "Save"}
              disabled={loading}
            />
          </div>
        </div>
      )}

      <div className="w-full grid gap-4 mt-6">
        {documents.map((doc) => (
          <div
            key={doc.uuid}
            className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-medium">{doc.title}</h3>
              <p className="text-sm text-gray-600">{doc.provider}</p>
              <p className="text-sm text-gray-500">
                Status: <span className="font-medium">{doc.status}</span>
              </p>
              <p className="text-sm text-gray-500">
                Name:
                <span className="font-medium">
                  {doc.providers_info?.first_name}
                  {doc.providers_info?.middle_initial}
                  {doc.providers_info?.last_name}
                </span>
                <span className="font-medium">
                  {doc.practice_profiles?.legal_business_name}
                </span>
              </p>
              {doc.effective_date && (
                <p className="text-sm text-gray-500">
                  Effective: {new Date(doc.effective_date).toLocaleDateString()}
                </p>
              )}
              {doc.expiry_date && (
                <p className="text-sm text-gray-500">
                  Expiry Date: {new Date(doc.expiry_date).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleView(doc)}
                className="text-blue-600 hover:text-blue-800"
              >
                <FaEye className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => doc.type=='provider'?handleEdit(doc):handleEditOrganization(doc)}
                className="text-green-600 hover:text-green-800"
              >
                <CiEdit className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => handleDeleteClick(doc)}
                className="text-red-600 hover:text-red-800"
              >
                <MdDeleteOutline className="size-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <TextInput
              width={"w-full"}
              title="Reason for deletion"
              name="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason"
            />
            <div className="mt-6 flex justify-end gap-4">
              <Button
                title="Cancel"
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
                className="bg-secondary text-white"
              />
              <Button
                title="Confirm"
                onClick={handleConfirmDelete}
                disabled={!reason}
                className="bg-primary text-white"
              />
            </div>
          </div>
        </div>
      )}

      <NavBottom />
    </div>
  );
}
