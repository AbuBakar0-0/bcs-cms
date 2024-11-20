import { formatZip } from "@/utils/formatters";
import BaseInput from "./BaseInput";

const ZipCodeInput = ({ title, required, width, value, onChange, name }) => (
	<BaseInput
		title={title}
		required={required}
		type="text"
		formatInput={formatZip}
		width={width}
		value={value}
		onChange={onChange}
		name={name}
	/>
);

export default ZipCodeInput;
