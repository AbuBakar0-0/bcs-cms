import { formatDOB } from "@/utils/formatters";
import BaseInput from "./BaseInput";

const DateInput = ({ title, required, width }) => (
    <BaseInput
        title={title}
        type="date"
        placeholder="MM/DD/YYYY"
        required={required}
        formatInput={formatDOB}
        width={width}
    />
);

export default DateInput;
