import { Field, Input } from "@chakra-ui/react";
import React from "react";
import { InputGroup } from "../input-group";

const InputCustom = ({ ...rest }) => {
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
		startElement,
		disabled,
	} = rest;

	return (
		<Field.Root invalid>
			<InputGroup width="full" startElement={startElement}>
				<Input
					name={name}
					disabled={disabled}
					ps={rest?.ps}
					onChange={onChange}
					value={value}
					height={height || 50}
					type={type || "url"}
					placeholder={placeholder}
					className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
				/>
			</InputGroup>
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

export default InputCustom;
