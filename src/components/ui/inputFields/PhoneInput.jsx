import { formatPhoneNumber } from "@/utils/formatters";
import BaseInput from "./BaseInput";

const PhoneInput = ({ title, required, readonly, width, name }) => (
    <BaseInput
        title={title}
        placeholder="(___) ___-____"
        required={required}
        readonly={readonly}
        type="text"
        formatInput={formatPhoneNumber} // Correct formatting function
        width={width}
        name={name}
    />
);

export default PhoneInput;
