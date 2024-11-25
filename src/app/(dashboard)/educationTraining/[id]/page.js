"use client";

import Button from "@/components/ui/Button";
import HeadingLine from "@/components/ui/HeadingLine";
import DateInput from "@/components/ui/inputFields/DateInput";
import Dropdown from "@/components/ui/inputFields/DropDown";
import EmailInput from "@/components/ui/inputFields/EmailInput";
import RadioButton from "@/components/ui/inputFields/RadioButtons";
import TextInput from "@/components/ui/inputFields/TextInput";
import NavBottom from "@/components/ui/NavBottom";
import { specialities } from "@/data/specialities";
import { CiEdit } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { useEducationAndTraining } from "./useEducationTraning";
import { degrees, eduOptions } from "./utilis";

function EducationAndTraining() {
	const {
		education,
		training,
		educationEntries,
		trainingEntries,
		newEducationEntry,
		newTrainingEntry,
		editEducationId,
		editTrainingId,
		handleEducation,
		handleTraining,
		handleEducationChange,
		handleTrainingChange,
		addEducationEntry,
		addTrainingEntry,
		deleteEducationEntry,
		deleteTrainingEntry,
		editTrainingEntry,
		editEducationEntry,
	} = useEducationAndTraining();

	return (
		<>
			<div className="w-full flex flex-col justify-center items-center gap-4">
				{/* Education & Professional Training */}
				<HeadingLine title={"Education & Professional Training"} />
				<p className="w-full">
					<span className="text-red-400">*</span>Required all fields are marked
					with red asterik
				</p>

				{/* Education */}
				<div className="w-full flex flex-row justify-between items-center">
					<p className="w-full text-lg">Education</p>
					<Button
						title={"Add"}
						icon={<IoAddCircleOutline className="size-6" />}
						onClick={handleEducation}
					/>
				</div>
				<div className="w-full flex flex-col justify-center items-center gap-4">
					{education ? (
						<div className="w-full min-h-20 shadow-xl rounded-lg border-l-8 border-primary flex flex-col justify-start items-center gap-4 p-10">
							<div className="w-full flex flex-wrap justify-start gap-4 items-start">
								<Dropdown
									title={"Education Type"}
									options={eduOptions}
									name="type"
									value={newEducationEntry.type}
									onChange={handleEducationChange}
								/>
								<TextInput
									title={"Country"}
									name="country"
									value={newEducationEntry.country}
									onChange={handleEducationChange}
								/>
								<TextInput
									title={"State"}
									name="state"
									value={newEducationEntry.state}
									onChange={handleEducationChange}
								/>
								<TextInput
									title={"County"}
									name="county"
									value={newEducationEntry.county}
									onChange={handleEducationChange}
								/>
								<TextInput
									title={"Professional School"}
									name="professional_school"
									value={newEducationEntry.professional_school}
									onChange={handleEducationChange}
								/>
								<Dropdown
									title={"Degree"}
									options={degrees}
									name="degree"
									value={newEducationEntry.degree}
									onChange={handleEducationChange}
								/>

								<DateInput
									title={"Start Date"}
									name="start_date"
									value={newEducationEntry.start_date}
									onChange={handleEducationChange}
								/>
								<DateInput
									title={"End Date"}
									name="end_date"
									value={newEducationEntry.end_date}
									onChange={handleEducationChange}
								/>
							</div>
							<Button title={"Add"} onClick={addEducationEntry} />
						</div>
					) : (
						<></>
					)}
				</div>

				{educationEntries.map((entry) => (
					<div
						key={entry.uuid}
						className="w-full h-24 shadow-xl rounded-lg border-l-8 border-primary flex flex-row justify-between items-center gap-4 p-10"
					>
						<p>{entry.degree}</p>
						<div className="flex flex-col justify-center items-start">
							<p>{entry.professional_school}</p>
							<p>{`${entry.start_date} to ${entry.end_date}`}</p>
							<p>{entry.country}</p>
						</div>
						<div className="flex flex-row justify-center items-center gap-4">
							<CiEdit
								className="size-6 text-primary"
								onClick={() => editEducationEntry(entry.uuid)}
							/>
							<MdDeleteOutline
								className="size-6 text-red-400"
								onClick={() => deleteEducationEntry(entry.uuid)}
							/>
						</div>
					</div>
				))}
				{/* Professional Experience */}
				<div className="w-full flex flex-row justify-between items-center mt-20">
					<p className="w-full text-lg">Professional Training</p>
					<Button
						title={"Add"}
						icon={<IoAddCircleOutline className="size-6" />}
						onClick={handleTraining}
					/>
				</div>
				<div className="w-full flex flex-col justify-center items-center gap-4">
					{training ? (
						<div className="w-full min-h-20 shadow-xl rounded-lg border-l-8 border-primary flex flex-col justify-start items-center gap-4 p-10">
							<div className="w-full flex flex-wrap justify-start gap-4 items-end">
								<Dropdown
									title={"Training Type"}
									options={[
										"Residency",
										"Fellowship",
										"Continuing Education",
										"Specialized Training",
									]}
									name={"training_type"}
									value={newTrainingEntry.training_type}
									onChange={handleTrainingChange}
								/>
								<TextInput
									title={"Country"}
									name="country"
									value={newTrainingEntry.country}
									onChange={handleTrainingChange}
								/>
								<TextInput
									title={"State"}
									name="state"
									value={newTrainingEntry.state}
									onChange={handleTrainingChange}
								/>
								<TextInput
									title={"County"}
									name="county"
									value={newTrainingEntry.county}
									onChange={handleTrainingChange}
								/>
								<TextInput
									title={"Institution / Hospital Name"}
									width={"w-[32%]"}
									name="hospital_name"
									value={newTrainingEntry.hospital_name}
									onChange={handleTrainingChange}
								/>
								<TextInput
									title={"Affiliated University"}
									name="affiliated_university"
									value={newTrainingEntry.affiliated_university}
									onChange={handleTrainingChange}
								/>

								<EmailInput
									title={"Email"}
									name="email"
									value={newTrainingEntry.email}
									onChange={handleTrainingChange}
								/>

								<DateInput
									title={"Start Date"}
									width={"w-[32%]"}
									name="start_date"
									value={newTrainingEntry.start_date}
									onChange={handleTrainingChange}
								/>
								<DateInput
									title={"End Date"}
									name="end_date"
									value={newTrainingEntry.end_date}
									onChange={handleTrainingChange}
								/>
								<TextInput
									title={"Type of Program"}
									name={"type_of_program"}
									value={newTrainingEntry.type_of_program}
									onChange={handleTrainingChange}
								/>
								<TextInput
									title={"Department"}
									name={"department"}
									value={newTrainingEntry.department}
									onChange={handleTrainingChange}
								/>

								<Dropdown
									title={"Speciality"}
									options={specialities}
									name="speciality"
									value={newTrainingEntry.speciality}
									onChange={handleTrainingChange}
								/>
								<RadioButton
									title={"Complete Training Program"}
									options={["Yes", "No"]}
									name="is_completed"
									value={newTrainingEntry.is_completed}
									onChange={handleTrainingChange}
								/>
							</div>
							<Button title={"Add"} onClick={addTrainingEntry} />
						</div>
					) : (
						<></>
					)}
					{trainingEntries.map((entry) => (
						<div
							key={entry.uuid}
							className="w-full h-28 shadow-xl rounded-lg border-l-8 border-primary flex flex-row justify-between items-center gap-4 p-10"
						>
							<p>{entry.training_type}</p>
							<div className="flex flex-col justify-center items-start">
								<p>{entry.hospital_name}</p>
								<p>{entry.speciality}</p>
								<p>{`${entry.start_date} to ${entry.end_date}`}</p>
								<p>{entry.country}</p>
							</div>
							<div className="flex flex-row justify-center items-center gap-4">
								<CiEdit
									className="size-6 text-primary"
									onClick={() => editTrainingEntry(entry.uuid)}
								/>
								<MdDeleteOutline
									className="size-6 text-red-400"
									onClick={() => deleteTrainingEntry(entry.uuid)}
								/>
							</div>
						</div>
					))}
				</div>

				{/* Cultural Training */}
				<div className=""></div>

				<NavBottom />
			</div>
		</>
	);
}

export default EducationAndTraining;
