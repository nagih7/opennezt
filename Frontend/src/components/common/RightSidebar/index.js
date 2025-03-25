import React from "react";
import { CheckCircleFilled } from "@ant-design/icons";
import fb_img from "assets/images/background/left-banner.webp";
import Logo from "assets/images/logo/OpenNezt_logo_black.png";
import anh_avt from "assets/images/background/avt.jpg";

function RightSidebar() {
	return (
		<div className="w-4/12">
			<div className="bg-[#ffffff] p-8 rounded-md mb-4">
				<div className="flex flex-col">
					<span className="text-xl font-semibold border-b-[1px] border-gray-200 pb-3">
						Active Users
					</span>
					<span className="pt-4 font-light text-gray-500">
						There are no recently active members
					</span>
				</div>
			</div>
			<div className="flex flex-col bg-[#ffffff] p-8 rounded-md mt-3 mb-4">
				<span className="mb-3 text-xl font-semibold">
					Latest Activities
				</span>
				<div className="border-gray-200 border-t-[1px]">
					<div className="flex items-center gap-3 my-3">
						<img
							src={anh_avt}
							className="w-[50px] h-[50px] rounded-full"
						/>
						<p className="text-[#6f7f92] text-sm mb-0">
							<a href="#" className="text-black no-underline">
								Vuong Manh Nghia
							</a>
							<CheckCircleFilled className="text-[#3897f0] mx-1" />
							changed their profile picture
							<br />
							<a href="#" className="no-underline text-[#6f7f92]">
								<span className="text-xs">7 hours ago</span>
							</a>
						</p>
					</div>
					<div className="flex items-center gap-3 border-gray-200 border-t-[1px]">
						<div className="flex items-center gap-3 my-3">
							<img
								src={anh_avt}
								className="w-[50px] h-[50px] rounded-full"
							/>
							<p className="text-[#6f7f92] text-sm mb-0">
								<a href="#" className="text-black no-underline">
									Vuong Manh Nghia
								</a>
								<CheckCircleFilled className="text-[#3897f0] mx-1" />
								changed their profile picture
								<br />
								<a href="#" className="no-underline text-[#6f7f92]">
									<span className="text-xs">7 hours ago</span>
								</a>
							</p>
						</div>
					</div>
					<div className="flex items-center gap-3 border-gray-200 border-t-[1px]">
						<div className="flex items-center gap-3 my-3">
							<img
								src={anh_avt}
								className="w-[50px] h-[50px] rounded-full"
							/>
							<p className="text-[#6f7f92] text-sm mb-0">
								<a href="#" className="text-black no-underline">
									Vuong Manh Nghia
								</a>
								<CheckCircleFilled className="text-[#3897f0] mx-1" />
								changed their profile picture
								<br />
								<a href="#" className="no-underline text-[#6f7f92]">
									<span className="text-xs">7 hours ago</span>
								</a>
							</p>
						</div>
					</div>
					<div className="flex items-center gap-3 border-gray-200 border-t-[1px]">
						<div className="flex items-center gap-3 my-3">
							<img
								src={anh_avt}
								className="w-[50px] h-[50px] rounded-full"
							/>
							<p className="text-[#6f7f92] text-sm mb-0">
								<a href="#" className="text-black no-underline">
									Vuong Manh Nghia
								</a>
								<CheckCircleFilled className="text-[#3897f0] mx-1" />
								changed their profile picture
								<br />
								<a href="#" className="no-underline text-[#6f7f92]">
									<span className="text-xs">7 hours ago</span>
								</a>
							</p>
						</div>
					</div>
					<div className="flex items-center gap-3 border-gray-200 border-t-[1px]">
						<div className="flex items-center gap-3 my-3">
							<img
								src={anh_avt}
								className="w-[50px] h-[50px] rounded-full"
							/>
							<p className="text-[#6f7f92] text-sm mb-0">
								<a href="#" className="text-black no-underline">
									Vuong Manh Nghia
								</a>
								<CheckCircleFilled className="text-[#3897f0] mx-1" />
								changed their profile picture
								<br />
								<a href="#" className="no-underline text-[#6f7f92]">
									<span className="text-xs">7 hours ago</span>
								</a>
							</p>
						</div>
					</div>
					<div className="flex items-center gap-3 border-gray-200 border-t-[1px]">
						<div className="flex items-center gap-3 mt-3">
							<img
								src={anh_avt}
								className="w-[50px] h-[50px] rounded-full"
							/>
							<p className="text-[#6f7f92] text-sm mb-0">
								<a href="#" className="text-black no-underline">
									Vuong Manh Nghia
								</a>
								<CheckCircleFilled className="text-[#3897f0] mx-1" />
								changed their profile picture
								<br />
								<a href="#" className="no-underline text-[#6f7f92]">
									<span className="text-xs">7 hours ago</span>
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="relative w-full">
				<img
					src={fb_img}
					alt="logo-fb_img"
					className="w-full h-[450px] rounded-md mt-4"
				/>
				<img
					src={Logo}
					alt="logo-opennezt"
					className={`$styles.logo, absolute top-0 py-14 px-12 left-0`}
				/>
				<div className="absolute left-0 flex flex-col items-center gap-3 px-12 text-white top-32">
					Feel free to reach us anytime. we are avaliable 24 hours
					<button className="bg-[#ffffff] px-3 py-3 text-black font-medium rounded-md">
						CONTACT US
					</button>
				</div>
			</div>
		</div>
	);
}
export default RightSidebar;
