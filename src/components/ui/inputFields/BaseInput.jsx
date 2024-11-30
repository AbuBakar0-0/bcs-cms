"use client";


const BaseInput = ({
	title,
	required = true,
	readonly = false,
	type,
	formatInput,
	width = "w-1/5",
	labelColor = "text-black",
	value,
	onChange,
	name,
	placeholder,
	minLength = 0,
	maxLength = 100,
}) => {
	const handleInputChange = (e) => {
		if (type === "file") {
			onChange({
				target: {
					name: name || title.toLowerCase(),
					value: e.target.files[0],
				},
			});
		} else {
			let inputValue = e.target.value;
			if (formatInput) {
				inputValue = formatInput(inputValue);
			}
			if (onChange) {
				onChange({
					target: {
						name: name || title.toLowerCase(),
						value: inputValue,
					},
				});
			}
		}
	};

	return (
		<div className={width}>
			<label className={`block mb-2 text-sm font-medium ${labelColor}`}>
				{title} {required ? <span className="text-red-500">*</span> : null}
			</label>
			<input
				type={type}
				className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-semibold"
				value={value}
				placeholder={placeholder}
				onChange={handleInputChange}
				required={required}
				readOnly={false}
				name={name}
				minLength={minLength}
				maxLength={maxLength}
			/>
		</div>
	);
};

export default BaseInput;
