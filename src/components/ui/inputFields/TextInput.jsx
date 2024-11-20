import BaseInput from "./BaseInput";

const TextInput = ({
	title,
	required,
	readonly,
	width,
	labelColor = "text-black",
	value,
	onChange,
	name,
}) => (
	<BaseInput
		title={title}
		required={required}
		readonly={readonly}
		type="text"
		labelColor={labelColor}
		width={width}
		value={value}
		onChange={onChange}
		name={name}
	/>
);

export default TextInput;
