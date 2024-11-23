"use-client";
import { useEffect, useState } from "react";
import BaseInput from "./BaseInput";
import { format, parse } from "date-fns";

const DateInput = ({
	title,
	required,
	width = "w-1/8",
	value,
	onChange,
	name,
}) => {
	const [clientDate, setClientDate] = useState(null);

	useEffect(() => {
		setClientDate(new Date());
	}, []);
	const handleChange = (e) => {
		const rawValue = e.target.value;

		const parsedDate = parse(rawValue, "yyyy-MM-dd", new Date());

		const formattedValue = format(parsedDate, "MM/dd/yyyy");
		console.log(formattedValue);
		onChange({ target: { name: name, value: formattedValue } });
	};
	const formattedValueForInput = value
		? format(parse(value, "MM/dd/yyyy", new Date()), "yyyy-MM-dd")
		: "";
	if (clientDate === null) {
		return <div>Loading...</div>;
	}
	return (
		<BaseInput
			title={title}
			type="date"
			placeholder="MM/DD/YYYY"
			required={required}
			value={onChange && formattedValueForInput}
			onChange={onChange && handleChange}
			width={width}
			name={name}
		/>
	);
};
export default DateInput;
