import { Link } from "@chakra-ui/react";
import { getProfile } from "api/profile";
import RightSidebar from "components/common/RightSidebar";
import { IconlyEditSquare } from "components/UI/Iconly";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfessionalProfile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// ========== STATE FROM REDUX STORE ========== //
	const { profile } = useSelector((state) => state.profile);
	// ========== USE EFFECT ========== //
	useEffect(() => {
		dispatch(getProfile());
	}, [dispatch]);

	return (
		<div className="flex gap-8">
			<div className="w-10/12">
				<div className="bg-[#ffffff] rounded-md">
					<div className="flex items-center justify-between border-b-[1px] border-[#f4f5f6] p-8">
						<h5 className="mb-0">Professional Background</h5>
						<span
							onClick={() =>
								navigate("/about/edit-profile/professional-background")
							}
							className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md cursor-pointer">
							<IconlyEditSquare size={20} color={"#ffffff"} />
						</span>
					</div>
					<div className="p-8">
						<ul className="grid grid-cols-2 p-0 mb-0 mx-[-16px] text-[#6f7f92]">
							{/* <li className="px-[16px] mb-10">
								<div className="mb-2 text-sm font-medium">
									PROFESSIONAL SUMMARY
								</div>
								<div>
									<p className="mb-2 text-base font-medium text-black line-clamp-3">
										A highly skilled and results-driven professional
										with over 8 years of experience in data analysis,
										financial modeling, and market research. Expertise
										in utilizing advanced data analytics tools such as
										Python, R, SQL, and Excel to derive actionable
										insights and improve decision-making processes.
										Proven track record in delivering high-impact
										reports and dashboards for executive teams,
										driving business growth, and optimizing
										operational efficiency. Adept at transforming
										complex data into clear and
									</p>
								</div>
							</li> */}
							<li className="px-[16px] mb-10">
								<div className="mb-2 text-sm font-medium">INDUSTRY</div>
								<div>
									<p className="mb-2 text-base font-medium text-black line-clamp-3">
										{profile?.industries
											?.map((industry) => industry.name)
											.join(", ") || "N/A"}
									</p>
								</div>
							</li>
							<li className="px-[16px] mb-10">
								<div className="mb-2 text-sm font-medium">
									EXPERIENCE LEVEL
								</div>
								<div>
									<p className="mb-2 text-base font-medium text-black">
										{profile?.experience_level?.name || "N/A"}
									</p>
								</div>
							</li>
							<li className="px-[16px]">
								<div className="mb-2 text-sm font-medium">
									EDUCATION LEVEL
								</div>
								<div>
									<p className="mb-2 text-base font-medium text-black">
										{profile?.educations
											?.map((education) => education.name)
											.join(", ") || "N/A"}
									</p>
								</div>
							</li>
							<li className="px-[16px]">
								<div className="mb-2 text-sm font-medium">
									CERTIFICATIONS
								</div>
								<div>
									<p className="mb-2 text-base font-medium text-black">
										{profile?.certifications
											?.map((certification) => certification.name)
											.join(", ") || "N/A"}
									</p>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div className="bg-[#ffffff] rounded-md mt-8">
					<div className="flex items-center justify-between border-b-[1px] border-[#f4f5f6] p-8">
						<h5 className="mb-0">Expertise</h5>
						<span
							onClick={() => navigate("/about/edit-profile/skills")}
							className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md cursor-pointer">
							<IconlyEditSquare size={20} color={"#ffffff"} />
						</span>
					</div>
					<div className="p-8">
						{profile?.skills?.length > 0 ? (
							<ul className="grid grid-cols-2 p-0 mb-0 mx-[-16px] text-[#6f7f92]">
								{profile?.skills?.map((skill, idx) => (
									<li className="px-[16px] mb-10" key={idx}>
										<div className="mb-2 text-sm font-medium uppercase">
											{skill?.category?.name}
										</div>
										<div>
											<p className="mb-2 text-base font-medium text-black">
												{skill?.name}
											</p>
										</div>
									</li>
								))}
							</ul>
						) : (
							<div className="p-8 text-[#6f7f92]">
								No expertise added yet
							</div>
						)}
					</div>
				</div>
				<div className="bg-[#ffffff] rounded-md mt-8">
					<div className="flex items-center justify-between border-b-[1px] border-[#f4f5f6] p-8">
						<h5 className="mb-0">Work with me </h5>
						<span
							onClick={() =>
								navigate("/about/edit-profile/work-with-me")
							}
							className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md cursor-pointer">
							<IconlyEditSquare size={20} color={"#ffffff"} />
						</span>
					</div>
					<div className="p-8">
						{profile?.additional_infos?.length > 0 ? (
							<ul className="grid grid-cols-2 p-0 mb-0 mx-[-16px] text-[#6f7f92]">
								{profile?.additional_infos?.map((info, idx) => (
									<li className="px-[16px] mb-10" key={idx}>
										<div className="mb-2 text-sm font-medium uppercase">
											{info?.name}
										</div>
										<div>
											<p className="mb-2 text-base font-medium text-black line-clamp-3">
												{info?.content}
											</p>
										</div>
									</li>
								))}
							</ul>
						) : (
							<div className="p-8 text-[#6f7f92]">
								No additional information added yet
							</div>
						)}
					</div>
				</div>
			</div>
			<RightSidebar />
		</div>
	);
};

export default ProfessionalProfile;
