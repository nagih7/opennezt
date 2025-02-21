import { Field, Input } from "@chakra-ui/react";
import React from "react";

const InputCustom = ({ label, ...rest }) => {
	const { value, required, placeholder, type, htmlFor, height, onChange } =
		rest;

	return (
		<Field.Root invalid>
			<Input
				onChange={onChange}
				value={value}
				height={height || 50}
				type={type || "url"}
				placeholder={placeholder}
				className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
			/>
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

			{/* <Field.ErrorText>This is an error text</Field.ErrorText> */}
		</Field.Root>
	);
};

export default InputCustom;
