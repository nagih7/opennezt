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
import { Link } from "react-router-dom"
const ProfileMenu = ({ changeTab, setChangeTab }) => {

	return (
		<div className="px-4 bg-[#ffffff] rounded-md my-8">
			<ul className="flex items-center max-w-full p-0 m-0 overflow-x-scroll scrollbar-hide">
				<li onClick={() => setChangeTab("Timeline")} className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
					<a
						href="#"
						className={`no-underline ${changeTab === "Timeline" ? "bg-[#4374c0]" : "bg-[#F4F5F6]"}   mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2`}>
						<IconlyCalendar size={20} color={"#042713"} />
					</a>
					<span className={` ${changeTab === "Timeline" ? "text-[#4374c0]" : "text-[#6f7f92]"} text-sm font-medium`}>
						Timeline
					</span>
				</li>
				<li onClick={() => setChangeTab("About")} className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
					<a
						href="#"
						className={`no-underline  ${changeTab === "About" ? "bg-[#4374c0]" : "bg-[#F4F5F6]"}   mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2`}>
						<IconlyProfile size={20} color={"#042713"} />
					</a>
					<span className={` ${changeTab === "About" ? "text-[#4374c0]" : "text-[#6f7f92]"} text-sm font-medium`}>About</span>
				</li>
				<li onClick={() => setChangeTab("Friends")} className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
					<a
						href="#"
						className={`no-underline  ${changeTab === "Friends" ? "bg-[#4374c0]" : "bg-[#F4F5F6]"}   mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2`}>
						<IconlyUser size={20} color={"#042713"} />
					</a>
					<span className={` ${changeTab === "Friends" ? "text-[#4374c0]" : "text-[#6f7f92]"} text-sm font-medium`}>
						Friends
					</span>
				</li>
				<li onClick={() => setChangeTab("Groups")} className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
					<a
						href="#"
						className={`no-underline  ${changeTab === "Groups" ? "bg-[#4374c0]" : "bg-[#F4F5F6]"}   mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2`}>
						<Iconlyuser size={20} color={"#042713"} />
					</a>
					<span className={` ${changeTab === "Groups" ? "text-[#4374c0]" : "text-[#6f7f92]"} text-sm font-medium`}>
						Groups
					</span>
				</li>
				<Link className="no-underline" to={"/notification-management"}>
					<li onClick={() => setChangeTab("Notifications")} className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
						<a
							href="#"
							className={`no-underline  ${changeTab === "Notifications" ? "bg-[#4374c0]" : "bg-[#F4F5F6]"}   mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2`}>
							<IconlyNotification size={20} color={"#042713"} />
						</a>
						<span className={` ${changeTab === "Notifications" ? "text-[#4374c0]" : "text-[#6f7f92]"} text-sm font-medium`}>
							Notifications
						</span>
					</li>
				</Link>
				<li onClick={() => setChangeTab("Messages")} className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
					<a
						href="#"
						className={`no-underline  ${changeTab === "Messages" ? "bg-[#4374c0]" : "bg-[#F4F5F6]"}   mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2`}>
						<IconlyMessage size={20} color={"#042713"} />
					</a>
					<span className={` ${changeTab === "Messages" ? "text-[#4374c0]" : "text-[#6f7f92]"} text-sm font-medium`}>
						Messages
					</span>
				</li>
				<li onClick={() => setChangeTab("Badges")} className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
					<a
						href="#"
						className={`no-underline  ${changeTab === "Badges" ? "bg-[#4374c0]" : "bg-[#F4F5F6]"}   mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2`}>
						<IconlyBookmark size={20} color={"#042713"} />
					</a>
					<span className={` ${changeTab === "Badges" ? "text-[#4374c0]" : "text-[#6f7f92]"} text-sm font-medium`}>
						Badges
					</span>
				</li>
				<li onClick={() => setChangeTab("Courses")} className="flex flex-col items-center gap-3 py-[40px] px-[8px] border-r-[1px] border-[#f4f5f6]">
					<a
						href="#"
						className={`no-underline  ${changeTab === "Courses" ? "bg-[#4374c0]" : "bg-[#F4F5F6]"}   mx-[60px] w-12 h-12 rounded-md  flex justify-center items-center gap-2`}>
						<IconlyDocument size={20} color={"#042713"} />
					</a>
					<span className={` ${changeTab === "Courses" ? "text-[#4374c0]" : "text-[#6f7f92]"} text-sm font-medium`}>
						Courses
					</span>
				</li>
			</ul>
		</div>
	);
};

export default ProfileMenu;
