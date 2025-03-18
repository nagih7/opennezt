import { Field } from "@chakra-ui/react";
import React from "react";
import { Textarea } from "@chakra-ui/react";

const TextAreaCustom = ({ ...rest }) => {
	const {
		label,
		value,
		required,
		placeholder,
		type,
		name,
		htmlFor,
		height,
		onChange,
		disabled,
	} = rest;

	return (
		<Field.Root invalid>
			<Textarea
				name={name}
				disabled={disabled}
				ps={rest?.ps}
				onChange={onChange}
				value={value}
				height={height}
				type={type || "url"}
				placeholder={placeholder}
				className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md"
			/>
			<Field.HelperText>Max 500 characters.</Field.HelperText>
			<Field.Label
				htmlFor={htmlFor}
				className="text-xs bg-[#ffffff] px-1 border-x-[1px]
                border-gray-200 absolute top-[-8px] left-[10px]">
				{label}
				{required && (
					<span
						style={{
							lineHeight: "1",
							color: "#ef4444",
							fontSize: "14px",
							paddingLeft: "2px",
						}}>
						*
					</span>
				)}
			</Field.Label>
		</Field.Root>
	);
};

export default TextAreaCustom;
