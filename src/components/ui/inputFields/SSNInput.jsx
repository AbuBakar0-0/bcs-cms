import { formatSSN } from "@/utils/formatters";
import BaseInput from "./BaseInput";

const SSNInput = ({
	title = "SSN",
	required,
	readonly,
	width,
	value,
	onChange,
	name,
}) => (
	<BaseInput
		title={title}
		placeholder="___-__-____"
		required={required}
		readonly={readonly}
		type="text"
		formatInput={formatSSN}
		width={width}
		name="ssn"
		value={value}
		onChange={onChange}
	/>
);

export default SSNInput;
