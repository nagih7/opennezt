import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ActivateHeader = () => {
	// =========== STATE FROM REDUX STORE =========== //
	const { paginationListMyProjects } = useSelector((state) => state.project);

	return (
		<div className="mx-[-16px] px-[16px] mb-8">
			<div className="flex items-center justify-between border-b-[1px] border-[#f3f4f5]">
				<div className="flex border-r-[1px] border-[#f3f4f5] ">
					<ul className="flex mb-0 p-0 max-w-[600px] overflow-x-scroll scrollbar-hide">
						<li className="flex items-center gap-2 py-[26px] mr-6">
							<a
								href=""
								className="font-medium text-black no-underline border-b-2 border-black">
								Projects
							</a>
							<span className="bg-[#f07a3a] py-[2px] px-[6px] text-xs rounded-lg text-white font-medium">
								{paginationListMyProjects?.totalRecord}
							</span>
						</li>
						<li className="flex items-center gap-2 py-[26px] mr-6">
							<a
								href=""
								className="no-underline text-[#6f7f92] font-medium">
								Projects Participated
							</a>
							<span className="bg-[#f07a3a] py-[2px] px-[6px] text-xs rounded-lg text-white font-medium">
								0
							</span>
						</li>
						<li className="flex items-center gap-2 py-[26px] mr-6">
							<Link
								to={"/project/details"}
								className="no-underline text-[#6f7f92] font-medium">
								Create a Project
							</Link>
							{/* <span className="bg-[#f07a3a] py-[2px] px-[6px] text-xs rounded-lg text-white font-medium">10</span> */}
						</li>
					</ul>
				</div>
				<div className="px-[16px]">
					<ul className="p-0 mb-0">
						<li className="py-4 pl-8 ">
							<label htmlFor="" className="outline-none ">
								Sort By:
							</label>
							<select
								name=""
								id=""
								className="ml-4 outline-none border-[1px] py-[10px] rounded-md pl-3 border-[#f3f4f5] bg-white">
								<option value="">Last Active</option>
								<option value="">Most Members</option>
								<option value="">Newly Created</option>
								<option value="">Alphabetical</option>
							</select>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ActivateHeader;
