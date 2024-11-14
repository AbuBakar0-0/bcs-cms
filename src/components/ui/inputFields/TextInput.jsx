
import BaseInput from "./BaseInput";


const TextInput = ({ title, required, readonly ,width, labelColor="text-black"}) => (
    <BaseInput
        title={title}
        required={required}
        readonly={readonly}
        type="text"
        labelColor={labelColor}
        width={width}
    />
);

export default TextInput;
