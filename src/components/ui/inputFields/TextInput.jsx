import BaseInput from "./BaseInput";

const TextInput = ({
    title,
    type="text",
    required,
    readonly,
    width,
    labelColor = "text-black",
    value,
    onChange,
    name,
    is_number=false,
    minLength,
    maxLength,
}) => (
    <BaseInput
        title={title}
        required={required}
        readonly={readonly}
        type={type}
        labelColor={labelColor}
        width={width}
        value={value}
        is_number={is_number}
        onChange={onChange}
        name={name}
        minLength={minLength}
        maxLength={maxLength}
    />
);

export default TextInput;
