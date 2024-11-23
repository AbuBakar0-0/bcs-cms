import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

export default function NavBottom({ onSave }) {
	return (
		<div className="w-full flex flex-row justify-around items-center gap-4">
			<div className="w-1/4 flex flex-row justify-center items-center gap-4 px-4 py-3 bg-secondary rounded-lg text-white">
				<FaArrowCircleLeft />
				<span> Save & Go Back</span>
			</div>
			<div
				className="w-1/4 flex flex-row justify-center items-center gap-4 px-4 py-3 bg-secondary rounded-lg text-white"
				onClick={onSave}
			>
				<span>Save</span>
			</div>

			<div
				className="w-1/4 flex flex-row justify-center items-center gap-4 px-4 py-3 bg-secondary rounded-lg text-white"
				onClick={onSave}
			>
				<span>Save & Continue</span>
				<FaArrowCircleRight />
			</div>
		</div>
	);
}
