import BaseInput from './BaseInput';

const PasswordInput = ({ title, required, readonly, width }) => (
    <BaseInput
        title={title}
        placeholder="Enter your password"
        required={required}
        readonly={readonly}
        type="password"
        width={width}
    />
);

export default PasswordInput;
