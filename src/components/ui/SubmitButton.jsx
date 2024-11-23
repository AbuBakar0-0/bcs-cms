import React from "react";

export default function SubmitButton({ text }) {
	return (
		<input
			type="submit"
			value={text || "Submit"}
			className="border-4 border-primary rounded-lg px-6 py-2 font-semibold"
		/>
	);
}
