"use client";

import Button from "@/components/ui/Button";
import HeadingLine from "@/components/ui/HeadingLine";
import DateInput from "@/components/ui/inputFields/DateInput";
import Dropdown from "@/components/ui/inputFields/DropDown";
import TextInput from "@/components/ui/inputFields/TextInput";
import NavBottom from "@/components/ui/NavBottom";
import payers from "@/data/payers";
import { stateAbbreviations } from "@/data/stateAbbreviations";
import { useProviders } from "@/hooks/useProvider";
import { CiEdit } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { usePayerSetup } from "./usePrayerSetup";
import { DROPDOWN_OPTIONS } from "./utilis";

export default function PairSetup() {
	const {
		// State
		application,
		payerSetups,
		formData,
		profiles,
		isEditing,
		loading,

		// Handlers
		toggleApplication,
		handleLegalBusinessName,
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
										onChange={handleLegalBusinessName}
										options={profiles}
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
										required={false}
										options={DROPDOWN_OPTIONS.statuses}
										name="status"
										value={formData.status}
										onChange={handleChange}
									/>
									<DateInput
										title={"Application Date"}
										name="application_date"
										required={false}
										value={formData.application_date}
										onChange={handleChange}
									/>
									<TextInput
										title={"Application Notes"}
										name="note"
										required={false}
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
							<div className="w-1/5">
							<p>{setup.provider}</p>
							<p> State: {setup.state}</p>
							</div>
							<div className="w-1/3 flex flex-col justify-center items-start">
								<p>{setup.payer_name}</p>
								<p>{setup.status}</p>
								<p>{new Date(setup.application_date).toLocaleDateString()}</p>
							</div>
							<div className="w-1/4">
								<p className="truncate max-w-96">{setup.note}</p>
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
