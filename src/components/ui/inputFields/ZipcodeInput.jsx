import { formatZip } from "@/utils/formatters";
import BaseInput from "./BaseInput";

const ZipCodeInput = ({ title, required, width}) => (
    <BaseInput
        title={title}
        required={required}
        type="text"
        formatInput={formatZip}
        width={width}
    />
);

export default ZipCodeInput;
