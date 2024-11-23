import BaseInput from "./BaseInput";

const PasswordInput = ({
	title,
	required,
	readonly,
	width,
	name,
	onChange,
}) => (
	<BaseInput
		title={title}
		placeholder="Enter your password"
		required={required}
		readonly={readonly}
		type="password"
		width={width}
		name={name}
		onChange={onChange}
	/>
);

export default PasswordInput;
