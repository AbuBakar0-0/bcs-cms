import { formatPhoneNumber } from "@/utils/formatters";
import BaseInput from "./BaseInput";

const PhoneInput = ({
	title,
	required,
	readonly,
	width,
	value,
	onChange,
	name,
}) => (
	<BaseInput
		title={title}
		placeholder="(___) ___-____"
		required={required}
		readonly={readonly}
		type="text"
		formatInput={formatPhoneNumber}
		width={width}
		value={value}
		onChange={onChange}
		name={name}
	/>
);

export default PhoneInput;
