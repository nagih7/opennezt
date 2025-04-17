import { IconlyCategory } from "components/UI/Iconly";
import React from "react";
import { useSelector } from "react-redux";

const RecruitTalentsHeader = () => {
	const { talents, formRecruitTalents, paginationRecruitTalents } =
		useSelector((state) => state.talent);

	return (
		<div className="flex justify-between items-center w-full bg-[#ffffff] rounded-md p-[16px] mb-8">
			<p className="mb-0">
				Showing{" "}
				{(paginationRecruitTalents.currentPage - 1) *
					paginationRecruitTalents.perPage +
					1}
				-
				{(paginationRecruitTalents.currentPage - 1) *
					paginationRecruitTalents.perPage +
					talents.length}{" "}
				{""}
				of {paginationRecruitTalents.totalRecord} results
			</p>
			<div className="flex items-center">
				<div className="px-[13px] py-[10px]">
					<ul className="flex items-center gap-2 pl-0 m-0">
						<li>
							<a href="#">
								<IconlyCategory size={20} color={"#6f7f92"} />
							</a>
						</li>
						<li>
							<a href="#">
								<IconlyCategory size={20} color={"#6f7f92"} />
							</a>
						</li>
						<li>
							<a href="#">
								<IconlyCategory size={20} color={"#6f7f92"} />
							</a>
						</li>
					</ul>
				</div>
				<form action="" className="pr-3 bg-[#f8f9fa] rounded-md">
					<select
						name=""
						id=""
						className="bg-[#f8f9fa] text-[#6f7f92] rounded-md p-3 outline-none">
						<option value="">Default sorting</option>
						<option value="">Sort by popularity</option>
					</select>
				</form>
			</div>
		</div>
	);
};

export default RecruitTalentsHeader;
