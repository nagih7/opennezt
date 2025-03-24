import React, { useEffect } from "react";
import ProjectActivity from "../ProjectActivity";
import img_logo_project from "../../../../../assets/images/background/1656677876-bpthumb.jpg";
import { IconlyEditSquare, IconlySearch } from "components/UI/Iconly";
import ProjectMenu from "../ProjectMenu";
import { Image } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyProjectDetails } from "api/project";
import { CheckCircleFilled } from "@ant-design/icons";

const Members = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	// ========== STATE FROM REDUX ========== //
	const project = useSelector((state) => state.project.myProjectDetails);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		dispatch(getMyProjectDetails(id));
	}, [id, dispatch]);
	return (
		<div className="w-full h-full">
			<div className="w-full">
				<Image
					src={
						project.background ||
						"https://wordpress.iqonic.design/product/wp/socialv/wp-content/themes/socialv-themes/assets/images/redux/default-cover.jpg"
					}
					alt={project.name}
					aspectRatio={10 / 3}
					width="100%"
					objectFit="cover"
					onError={(e) => {
						e.target.src =
							"https://wordpress.iqonic.design/product/wp/socialv/wp-content/themes/socialv-themes/assets/images/redux/default-cover.jpg";
					}}
				/>
			</div>

			<div>
				<div className="bg-[#ffffff]">
					<div className="p-8">
						<div className="px-[16px]">
							<div>
								<div className="flex justify-between w-full">
									<div className="item-left">
										<div className="flex justify-between gap-3">
											<div className="p-[4px] mt-[-60px] rounded-md bg-[#ffffff]">
												<a href="#">
													<Image
														src={project.logo || img_logo_project}
														className="w-[150px] h-[150px] rounded-md"
														alt={project.name}
														aspectRatio={4 / 4}
														width="100%"
														objectFit="cover"
														onError={(e) => {
															e.target.src = img_logo_project;
														}}
													/>
												</a>
											</div>
											<div>
												<h5>{project.name}</h5>
												{project.description && (
													<div>
														<p>{project.description}</p>
													</div>
												)}
											</div>
										</div>
									</div>
									<div className="item-right">
										<ul className="flex flex-wrap items-center justify-center gap-5 p-0 m-0">
											<li className="flex flex-col items-center">
												<h5>0</h5>
												Public
											</li>
											<li className="flex flex-col items-center">
												<h5>0</h5>
												Posts
											</li>
											<li className="flex flex-col items-center">
												<h5>1</h5>
												Member
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full px-[16px] pt-8">
				{/* ProjectMenu */}
				<ProjectMenu />
			</div>
			<div className="px-[16px]">
				<div className="flex w-full gap-8">
					<div className="w-10/12 mt-8">
						<div className="p-8 bg-[#ffffff] rounded-md">
							<div className="flex justify-between items-center border-[1px] rounded-md caret-[#2f65b9] bg-[#f8f9fa] pl-[15px]">
								<input
									type="text"
									placeholder="Search Members..."
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
						<div className="p-8 bg-[#ffffff] rounded-md mt-8">
							<div>
								<h4 className="border-b-[1px] border-gray-200 mb-0 pb-[11px] text-2xl">
									Administrators
								</h4>
								<ul className="pl-0 ">
									<li className="pt-8">
										<div className="flex items-center gap-3">
											<div>
												<img
													src={img_logo_project}
													alt=""
													className="w-[70px] h-[70px] rounded-md"
												/>
											</div>
											<div>
												<h6 className="flex gap-1">
													<a
														href="#"
														className="text-black no-underline">
														Vương Mạnh Nghĩa
													</a>
													<CheckCircleFilled className="text-blue-500" />
												</h6>
												<p className="text-[#6f7f92] text-sm mb-0">
													joined 7 hours, 43 minutes ago
												</p>
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div className="mt-[24px]">
								<h4 className="mb-0 pb-[11px] text-2xl">Moderators</h4>
								<div>
									<p className="mb-0 p-[15px] border-l-[3px] text-sm border-[#09c] rounded-r-md bg-[#e3f1f6] text-[#09c]">
										No project moderators were found.
									</p>
								</div>
							</div>
							<div className="mt-[24px]">
								<h4 className="mb-0 pb-[11px] text-2xl">Members</h4>
								<div>
									<p className="mb-0 p-[15px] border-l-[3px] text-sm border-[#09c] rounded-r-md bg-[#e3f1f6] text-[#09c]">
										No project members were found.
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="w-4/12 mt-8">
						{/* ProjectActivity */}
						<ProjectActivity />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Members;
