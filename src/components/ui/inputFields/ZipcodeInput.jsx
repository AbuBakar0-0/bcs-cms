import { formatZip } from "@/utils/formatters";
import BaseInput from "./BaseInput";

const ZipCodeInput = ({ title, required, readonly, width}) => (
    <BaseInput
        title={title}
        required={required}
        readonly={readonly}
        type="text"
        formatInput={formatZip}
        width={width}
    />
);

export default ZipCodeInput;
