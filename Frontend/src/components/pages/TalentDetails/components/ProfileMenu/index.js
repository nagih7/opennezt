import { IconlyCalendar, IconlyProfile } from "components/UI/Iconly";
import React from "react";
const ProfileMenu = ({ changeTab, setChangeTab }) => {
	return (
		<div className="px-4 bg-[#ffffff] rounded-md my-8">
			<ul className="flex items-center max-w-full p-0 m-0 overflow-x-scroll scrollbar-hide">
				<li
					onClick={() => setChangeTab("Timeline")}
					className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
					<a
						href="#"
						className={`no-underline ${
							changeTab === "Timeline" ? "bg-[#4374c0]" : "bg-[#F4F5F6]"
						}   mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2`}>
						<IconlyCalendar size={20} color={"#042713"} />
					</a>
					<span
						className={` ${
							changeTab === "Timeline"
								? "text-[#4374c0]"
								: "text-[#6f7f92]"
						} text-sm font-medium`}>
						Timeline
					</span>
				</li>
				<li
					onClick={() => setChangeTab("About")}
					className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
					<a
						href="#"
						className={`no-underline  ${
							changeTab === "About" ? "bg-[#4374c0]" : "bg-[#F4F5F6]"
						}   mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2`}>
						<IconlyProfile size={20} color={"#042713"} />
					</a>
					<span
						className={` ${
							changeTab === "About" ? "text-[#4374c0]" : "text-[#6f7f92]"
						} text-sm font-medium`}>
						About
					</span>
				</li>
			</ul>
		</div>
	);
};

export default ProfileMenu;
