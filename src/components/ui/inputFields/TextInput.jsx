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
    minLength,
    maxLength,
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
        minLength={minLength}
        maxLength={maxLength}
    />
);

export default TextInput;
