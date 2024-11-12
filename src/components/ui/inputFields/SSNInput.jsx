import { formatSSN } from '@/utils/formatters';
import BaseInput from './BaseInput';

const SSNInput = ({ title="SSN", required, readonly, width }) => (
    <BaseInput
        title={title}
        placeholder="___-__-____"
        required={required}
        readonly={readonly}
        type="text"
        formatInput={formatSSN}
        width={width}
    />
);

export default SSNInput;
