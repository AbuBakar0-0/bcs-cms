import { formatPhoneNumber } from "@/utils/formatters";
import BaseInput from "./BaseInput";

const PhoneInput = ({ title, required, readonly, width }) => (
    <BaseInput
        title={title}
        placeholder="(___) ___-____"
        required={required}
        readonly={readonly}
        type="text"
        formatInput={formatPhoneNumber}
        width={width}
    />
);

export default PhoneInput;
