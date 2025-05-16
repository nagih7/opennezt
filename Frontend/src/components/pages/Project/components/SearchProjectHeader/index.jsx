import { IconlySearch } from "components/UI/Iconly";
import React from "react";

const SearchProjectHeader = () => {
	return (
		<div className="p-8 bg-[#ffffff] rounded-md">
			<div className="flex justify-between items-center border-[1px] rounded-md caret-[#2f65b9] bg-[#f8f9fa] pl-[15px]">
				<input
					type="text"
					placeholder="Search Projects..."
					className="bg-[#f8f9fa] outline-none h-8 w-full rounded-md text-xs font-medium text-black"
				/>
				<button className="flex items-center justify-center bg-[#2f65b9] rounded-md w-11 h-10">
					<IconlySearch
						size={14}
						color={"#ffffff"}
						className="text-gray-400"
					/>
				</button>
			</div>
		</div>
	);
};

export default SearchProjectHeader;
