"use client";

import HeadingLine from "@/components/ui/HeadingLine";
import DateInput from "@/components/ui/inputFields/DateInput";
import Dropdown from "@/components/ui/inputFields/DropDown";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import TextInput from "@/components/ui/inputFields/TextInput";
import payers from "@/data/payers";
import { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import NavBottom from "@/components/ui/NavBottom";
import Button from "@/components/ui/Button";
import { format, parse } from "date-fns";
import { usePayerSetup } from "./usePrayerSetup";
import { DROPDOWN_OPTIONS } from "./utilis";
import { useProviders } from "@/hooks/useProvider";

export default function PairSetup() {
	const {
		// State
		application,
		payerSetups,
		formData,
		isEditing,
		loading,

		// Handlers
		toggleApplication,
		handleChange,
		handleSubmit,
		handleEdit,
		handleDelete,
	} = usePayerSetup();
	const { providers } = useProviders();
	return (
		<>
			<div className="w-full flex flex-col justify-center items-center gap-4">
				<div className="w-full flex flex-row justify-between items-center">
					<p className="w-full text-lg">Payers Setup</p>
					<Button
						title={"Add"}
						icon={<IoAddCircleOutline className="size-6" />}
						onClick={toggleApplication}
					/>
				</div>

				<div className="w-full flex flex-col justify-center items-center gap-4">
					{application ? (
						<div className="w-full min-h-20 shadow-xl rounded-lg border-l-8 border-primary flex flex-col justify-start items-center gap-4 p-10">
							<div className="w-full flex flex-wrap justify-start gap-4 items-start">
								<div className="w-full flex flex-wrap justify-start gap-4 items-end">
									<Dropdown
										title={"State"}
										options={stateAbbreviations}
										name="state"
										value={formData.state}
										onChange={handleChange}
									/>
									<Dropdown
										title={"Plan Type"}
										options={DROPDOWN_OPTIONS.planTypes}
										name="plan_type"
										onChange={handleChange}
										value={formData.plan_type}
									/>
								</div>
								<HeadingLine title={"Application Statuses"} />
								<div className="w-full flex flex-wrap justify-start gap-4 items-end">
									<Dropdown
										title={"Business"}
										name="business"
										value={formData.business}
										onChange={handleChange}
										options={DROPDOWN_OPTIONS.businesses}
									/>
									<Dropdown
										title={"Provider"}
										options={providers}
										name="provider"
										value={formData.provider}
										onChange={handleChange}
									/>
									<Dropdown
										title={"Payer Name"}
										name="payer_name"
										options={payers}
										value={formData.payer_name}
										onChange={handleChange}
									/>
									<Dropdown
										title={"Status"}
										options={DROPDOWN_OPTIONS.statuses}
										name="status"
										value={formData.status}
										onChange={handleChange}
									/>
									<DateInput
										title={"Application Date"}
										name="application_date"
										value={formData.application_date}
										onChange={handleChange}
									/>
									<TextInput
										title={"Application Notes"}
										name="note"
										width={"w-full"}
										value={formData.note}
										onChange={handleChange}
									/>
								</div>
							</div>
							<Button
								title={isEditing ? "Update" : "Add"}
								onClick={handleSubmit}
								disabled={loading}
							/>
						</div>
					) : (
						<></>
					)}
				</div>

				<div className="w-full flex flex-col gap-4">
					{payerSetups.map((setup) => (
						<div
							key={setup.uuid}
							className="w-full h-24 shadow-xl rounded-lg border-l-8 border-primary flex flex-row justify-between items-center gap-4 p-10"
						>
							<p className="w-1/5">{setup.provider}</p>
							<div className="w-1/3 flex flex-col justify-center items-start">
								<p>{setup.payer_name}</p>
								<p>{setup.status}</p>
								<p>{new Date(setup.application_date).toLocaleDateString()}</p>
							</div>
							<div className="flex flex-row justify-center items-center gap-4">
								<CiEdit
									className="size-6 text-primary cursor-pointer"
									onClick={() => handleEdit(setup)}
								/>
								<MdDeleteOutline
									className="size-6 text-red-400 cursor-pointer"
									onClick={() => handleDelete(setup.uuid)}
								/>
							</div>
						</div>
					))}
				</div>
				<NavBottom />
			</div>
		</>
	);
}
