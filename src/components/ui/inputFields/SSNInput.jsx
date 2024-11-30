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
  minLength = 11, // SSN format: ___-__-____, which is 11 characters
  maxLength = 11, // SSN format: ___-__-____, which is 11 characters
}) => (
  <BaseInput
    title={title}
    placeholder="___-__-____"
    required={required}
    readonly={readonly}
    type="text"
    formatInput={formatSSN}
    width={width}
    name={name || "ssn"}
    value={value}
    onChange={onChange}
    minLength={minLength}
    maxLength={maxLength}
  />
);

export default SSNInput;
