import {
	IconlyBookmark,
	IconlyCalendar,
	IconlyDocument,
	IconlyMessage,
	IconlyNotification,
	IconlyProfile,
	Iconlyuser,
	IconlyUser,
} from "components/UI/Iconly";
import React from "react";

const ProfileMenu = () => {
	return (
		<div className="px-4 bg-[#ffffff] rounded-md my-8">
			<ul className="flex items-center max-w-full p-0 m-0 overflow-x-scroll scrollbar-hide">
				<li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
					<a
						href="#"
						className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2">
						<IconlyCalendar size={20} color={"#6f7f92"} />
					</a>
					<span className="text-[#6f7f92] text-sm font-medium">
						Timeline
					</span>
				</li>
				<li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
					<a
						href="#"
						className="no-underline bg-[#4374c0] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2">
						<IconlyProfile size={20} color={"#ffffff"} />
					</a>
					<span className="text-[#4374c0] text-sm font-medium">About</span>
				</li>
				<li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
					<a
						href="#"
						className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2">
						<IconlyUser size={20} color={"#6f7f92"} />
					</a>
					<span className="text-[#6f7f92] text-sm font-medium">
						Friends
					</span>
				</li>
				<li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
					<a
						href="#"
						className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2">
						<Iconlyuser size={20} color={"#6f7f92"} />
					</a>
					<span className="text-[#6f7f92] text-sm font-medium">
						Groups
					</span>
				</li>
				<li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
					<a
						href="#"
						className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2">
						<IconlyNotification size={20} color={"#6f7f92"} />
					</a>
					<span className="text-[#6f7f92] text-sm font-medium">
						Notifications
					</span>
				</li>
				<li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
					<a
						href="#"
						className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2">
						<IconlyMessage size={20} color={"#6f7f92"} />
					</a>
					<span className="text-[#6f7f92] text-sm font-medium">
						Messages
					</span>
				</li>
				<li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
					<a
						href="#"
						className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2">
						<IconlyBookmark size={20} color={"#6f7f92"} />
					</a>
					<span className="text-[#6f7f92] text-sm font-medium">
						Badges
					</span>
				</li>
				<li className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
					<a
						href="#"
						className="no-underline bg-[#f8f9fa] mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2">
						<IconlyDocument size={20} color={"#6f7f92"} />
					</a>
					<span className="text-[#6f7f92] text-sm font-medium">
						Courses
					</span>
				</li>
			</ul>
		</div>
	);
};

export default ProfileMenu;
