import React from "react";
import {
	SelectContent,
	SelectItem,
	SelectRoot,
	SelectTrigger,
	SelectValueText,
} from "../select";

const SelectCustom = ({ ...rest }) => {
	const {
		collection,
		onChange,
		height,
		placeholder,
		label,
		required,
		htmlFor,
		multiple,
		canChange,
		value,
	} = rest;
	return (
		<div>
			<SelectRoot
				value={value}
				multiple={multiple || false}
				height={height || 50}
				onValueChange={onChange}
				width={"100%"}
				className="relative w-full border-[1px] outline-none border-gray-200 rounded-md flex justify-center "
				collection={collection}
				size="sm">
				<SelectTrigger>
					<SelectValueText className="p-[6px]" placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent
					style={{ zIndex: 9999 }}
					width={"100%"}
					className="w-full">
					{collection?.items?.map((item) => (
						<SelectItem
							className="p-[12px] w-full outline-none  rounded-md"
							item={item}
							key={item.value}>
							{item.label}
						</SelectItem>
					))}
				</SelectContent>
				<label
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
				</label>
			</SelectRoot>
			{canChange && (
				<p className="mt-[11px] mb-0 flex justify-end">
					<button className="bg-[#f07a3a] text-xs font-medium py-1 px-[6px] text-[#ffffff] rounded-sm">
						CHANGE
					</button>
				</p>
			)}
		</div>
	);
};

export default SelectCustom;
