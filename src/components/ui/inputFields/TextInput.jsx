
import BaseInput from "./BaseInput";


const TextInput = ({ title, required, readonly ,width}) => (
    <BaseInput
        title={title}
        required={required}
        readonly={readonly}
        type="text"
        width={width}
    />
);

export default TextInput;
