import BaseInput from "./BaseInput";

const EmailInput = ({
	title,
	required,
	readonly=false,
	width,
	value,
	onChange,
	name,
}) => (
	<BaseInput
		title={title}
		placeholder="yourname@example.com"
		required={required}
		readonly={readonly}
		type="email"
		width={width}
		value={value}
		onChange={onChange}
		name={name}
	/>
);

export default EmailInput;
