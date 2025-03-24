import { Avatar } from "@chakra-ui/react";
import React from "react";
import {
	FaChevronRight,
	FaCheckCircle,
	FaStar,
	FaRegStar,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const BannerActive = () => {
	// ========== STATE FROM REDUX STORE ========== //
	const { projectDetails } = useSelector((state) => state.project);

	return (
		<div className=" bg-[#07142e] w-[78.75rem] h-[18.75rem] relative top-[0rem] 2xl:w-[102rem]">
			<div className="text-white font-bold relative top-[5rem]  border-b border-[#142039] pb-4 2xl:ml-[5.5rem]">
				<ol className="flex mb-0">
					<li>
						Seek Projects
						<FaChevronRight className="inline mx-2" />
					</li>
					<li>
						Project Details
						<FaChevronRight className="inline mx-2" />
					</li>
					<li>{projectDetails?.name}</li>
				</ol>
				<h3 className="ml-[2rem]">{projectDetails?.name}</h3>
			</div>

			<div className="flex items-center mt-[-0.5rem] relative top-[5.8rem] ml-8 text-white 2xl:ml-[7rem]">
				<Avatar.Root size="md" className="w-10 h-10 mr-3 rounded-full">
					<Avatar.Fallback name={projectDetails?.user?.name} />
					<Avatar.Image src={projectDetails?.user?.avatar} />
				</Avatar.Root>
				<div>
					<p className="relative top-[1.25rem] text-xs mb-4 text-[#6F7F92]">
						Created by
					</p>
					<p>
						{projectDetails?.user?.name}{" "}
						<FaCheckCircle className="inline ml-1 text-blue-500" />
					</p>
				</div>
				<div className="ml-5">
					<p className="relative top-[1.25rem] text-xs mb-4 text-[#6F7F92]">
						Stage
					</p>
					<p className="text-[1rem]">{projectDetails?.stage?.name}</p>
				</div>
				<div className="ml-5">
					<p className="relative top-[1.25rem] text-xs mb-4 text-[#6F7F92]">
						Review
					</p>
					<p className="flex items-center text-xl text-yellow-400">
						<FaStar />
						<FaStar />
						<FaStar />
						<FaStar />
						<FaRegStar />
					</p>
				</div>
				<div className="ml-5">
					<p className="relative top-[1.25rem] text-xs mb-4 text-[#6F7F92]">
						Project Results: 70%
					</p>
					<p className="w-[8rem] h-[0.4rem] bg-gray-700 rounded-full overflow-hidden">
						<div className="w-3/5 h-full bg-blue-600 rounded-full"></div>
					</p>
				</div>
			</div>
		</div>
	);
};

export default BannerActive;
