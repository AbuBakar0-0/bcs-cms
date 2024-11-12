import BaseInput from "./BaseInput";

const EmailInput = ({ title, required, readonly, width}) => (
    <BaseInput
        title={title}
        placeholder="yourname@example.com"
        required={required}
        readonly={readonly}
        type="email"
        width={width}
    />
);

export default EmailInput;
