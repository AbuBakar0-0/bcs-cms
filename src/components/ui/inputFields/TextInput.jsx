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
        onChange={onChange}
        name={name}
        minLength={minLength}
        maxLength={maxLength}
    />
);

export default TextInput;
