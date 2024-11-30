import BaseInput from "./BaseInput";

const PasswordInput = ({
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
    placeholder="Enter your password"
    required={required}
    readonly={readonly}
    type="password"
    width={width}
    value={value}
    onChange={onChange}
    name={name}
  />
);

export default PasswordInput;
