"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import BaseInput from "@/components/ui/inputFields/BaseInput";
import DateInput from "@/components/ui/inputFields/DateInput";
import Dropdown from "@/components/ui/inputFields/DropDown";
import NavBottom from "@/components/ui/NavBottom";
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import {
	documentsList,
	initialFormData,
	providerOptions,
	statusOptions,
} from "./utilis";
import { useDocuments } from "./useDocument";

export default function DocumentPage() {
	const {
		showForm,
		documents,
		formData,
		isEditing,
		loading,
		handleChange,
		handleSubmit,
		handleEdit,
		handleDelete,
		handleView,
		toggleForm,
		resetForm,
	} = useDocuments();

	return (
		<div className="w-full flex flex-col justify-center items-center gap-4 p-4">
			<div className="w-full flex flex-row justify-between items-center">
				<h1 className="text-xl font-semibold">Documents</h1>
				<Button
					title="Add Document"
					icon={<IoAddCircleOutline className="size-6" />}
					onClick={() => toggleForm(true)}
					disabled={loading}
				/>
			</div>

			{showForm && (
				<div className="w-full bg-white rounded-lg shadow-lg p-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Dropdown
							title="Document Type"
							name="title"
							options={documentsList}
							value={formData.title}
							onChange={handleChange}
							width="w-1/2/"
						/>
						<Dropdown
							title="Provider"
							name="provider"
							options={providerOptions}
							value={formData.provider}
							width="w-1/2/"
							onChange={handleChange}
						/>
						<Dropdown
							title="Status"
							name="status"
							options={statusOptions}
							value={formData.status}
							width="w-1/2/"
							onChange={handleChange}
							required
						/>
						<DateInput
							title="Effective Date"
							name="effective_date"
							value={formData.effective_date}
							onChange={handleChange}
							width="w-1/2/"
							required={false}
						/>
						<DateInput
							title="Expiry Date"
							name="expiry_date"
							value={formData.expiry_date}
							onChange={handleChange}
							required={false}
						/>
						<BaseInput
							title="Upload File"
							type="file"
							name="file"
							width="w-1/2/"
							onChange={handleChange}
							accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
						/>
					</div>
					<div className="mt-6 flex justify-end gap-4">
						<Button
							type="button"
							title="Cancel"
							variant="outline"
							onClick={() => {
								setShowForm(false);
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
							{doc.effective_date && (
								<p className="text-sm text-gray-500">
									Effective: {new Date(doc.effective_date).toLocaleDateString()}
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
								onClick={() => handleEdit(doc)}
								className="text-green-600 hover:text-green-800"
							>
								<CiEdit className="size-5" />
							</button>
							<button
								type="button"
								onClick={() => handleDelete(doc)}
								className="text-red-600 hover:text-red-800"
							>
								<MdDeleteOutline className="size-5" />
							</button>
						</div>
					</div>
				))}
			</div>

			<NavBottom />
		</div>
	);
}
