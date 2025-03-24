import {
	IconlyDocument,
	IconlyHome,
	IconlyImage2,
	IconlySend,
	IconlySetting,
	Iconlyuser,
} from "components/UI/Iconly";
import React from "react";

const ProjectMenu = ({ setTab }) => {
	return (
		<div className="w-full px-[16px] pt-8">
			<div className="px-4 bg-[#ffffff] rounded-md ">
				<ul className="flex items-center p-0 m-0 overflow-x-scroll scrollbar-hide">
					<li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
						<span
							className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2 cursor-pointer"
							onClick={() => setTab("overview")}>
							<IconlyHome size={20} color={"#6f7f92"} />
						</span>
						<span className="text-[#6f7f92] text-sm font-medium">
							Home
						</span>
					</li>
					<li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
						<span
							className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2 cursor-pointer"
							onClick={() => setTab("members")}>
							<Iconlyuser size={20} color={"#6f7f92"} />
						</span>
						<span className="text-[#6f7f92] text-sm font-medium">
							Members
						</span>
					</li>
					<li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
						<span
							className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2 cursor-pointer"
							onClick={() => setTab("invite")}>
							<IconlySend size={20} color={"#6f7f92"} />
						</span>
						<span className="text-[#6f7f92] text-sm font-medium">
							Send Invites
						</span>
					</li>
					<li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
						<span
							className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2 cursor-pointer"
							onClick={() => setTab("forum")}>
							<IconlyDocument size={20} color={"#6f7f92"} />
						</span>
						<span className="text-[#6f7f92] text-sm font-medium">
							Forum
						</span>
					</li>
					<li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
						<span
							className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2 cursor-pointer"
							onClick={() => setTab("media")}>
							<IconlyImage2 size={20} color={"#6f7f92"} />
						</span>
						<span className="text-[#6f7f92] text-sm font-medium">
							Media
						</span>
					</li>
					<li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
						<span
							className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2 cursor-pointer"
							onClick={() => setTab("manage")}>
							<IconlySetting size={20} color={"#6f7f92"} />
						</span>
						<span className="text-[#6f7f92] text-sm font-medium">
							Manage
						</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default ProjectMenu;
