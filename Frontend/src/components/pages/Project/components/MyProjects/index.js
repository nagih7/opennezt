import React, { useEffect, useState } from "react";
import img_background_group from "assets/images/background/62beb9f3ab302-bp-cover-image.jpg";
import img_avatar_group from "assets/images/background/1656677703-bpfull.jpg";
import { IconlyDocument, IconlyUser } from "components/UI/Iconly";
import img_avatar from "assets/images/background/avt.jpg";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getListMyProjects } from "api/project";
import { Button, Image } from "@chakra-ui/react";

const MyProjects = ({ isBottom, setIsBottom }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// ========== STATE FROM REDUX ========== //
	const { myProjects, paginationListMyProjects, isLoadingGetListMyProjects } =
		useSelector((state) => state.project);
	// ========== USE EFFECT ========== //
	useEffect(() => {
		dispatch(getListMyProjects(paginationListMyProjects));

		// eslint-disable-next-line
	}, [dispatch]);

	// Theo dõi sự kiện scroll
	useEffect(() => {
		if (isBottom) {
			// Call API hoặc load thêm dữ liệu
			dispatch();
			getListMyProjects({
				...paginationListMyProjects,
				currentPage: parseInt(paginationListMyProjects.currentPage) + 1,
			});
			setIsBottom(false);
		}
	}, [isBottom, dispatch, paginationListMyProjects, setIsBottom]);

	const handleNavigateToProjectDetails = (project) => {
		navigate(`/projects/details/${project._id}`);
	};

	return (
		<>
			<div className="grid grid-cols-2 gap-8">
				{myProjects &&
					myProjects.length > 0 &&
					myProjects?.map((project, index) => (
						<div className="mx-[-16px] px-[16px]" key={index}>
							<div className="bg-[#ffffff] border-[1px] rounded-md">
								<div>
									<Image
										src={project.background || img_background_group}
										alt={project.name}
										aspectRatio={10 / 3}
										width="100%"
										objectFit="cover"
										onError={(e) => {
											e.target.src = img_background_group;
										}}
									/>
								</div>
								<div className="flex flex-col items-center p-8">
									<div className="flex flex-col items-center mt-[-80px]">
										<div className="mb-7">
											<a href="#">
												<Image
													className="w-20 h-20 border-[4px] border-[#f2f3f4]"
													src={project.logo || img_avatar_group}
													alt={project.name}
													aspectRatio={4 / 4}
													width="100%"
													objectFit="cover"
													onError={(e) => {
														e.target.src = img_avatar_group;
													}}
												/>
											</a>
										</div>
										<div>
											<h5>
												<a
													href="#"
													className="text-black no-underline">
													{project.name}
												</a>
											</h5>
										</div>
									</div>
									<div>
										<ul className="flex items-center gap-1 mb-0 pl-0 pb-[24px]">
											<li className="mr-2">
												<a
													href="#"
													className="no-underline text-[#6f7f92] text-sm font-medium flex items-center gap-1">
													<span>
														<IconlyDocument
															size={20}
															color={"#6f7f92"}
														/>
													</span>
													<span>0</span>
													<span>Posts</span>
												</a>
											</li>
											<li className="mr-2">
												<a
													href="#"
													className="no-underline text-[#6f7f92] text-sm font-medium flex items-center gap-1">
													<span>
														<IconlyUser
															size={20}
															color={"#6f7f92"}
														/>
													</span>
													<span>Members</span>
													<span>6</span>
												</a>
											</li>
										</ul>
									</div>
									<ul className="mb-0 pl-0 border-t-[1px] w-full pt-[24px] relative flex items-center justify-center">
										<li>
											<a href="#">
												<img
													src={img_avatar}
													alt=""
													className="h-9 w-9 rounded-full border-2 border-[#ffffff]"
												/>
											</a>
										</li>
										<li className="ml-[-15px]">
											<a href="#">
												<img
													src={img_avatar}
													alt=""
													className="h-9 w-9 rounded-full border-2 border-[#ffffff]"
												/>
											</a>
										</li>
										<li className="ml-[-15px]">
											<a href="#">
												<img
													src={img_avatar}
													alt=""
													className="h-9 w-9 rounded-full border-2 border-[#ffffff]"
												/>
											</a>
										</li>
										<li className="ml-[-15px]">
											<a href="#">
												<img
													src={img_avatar}
													alt=""
													className="h-9 w-9 rounded-full border-2 border-[#ffffff]"
												/>
											</a>
										</li>
										<li className="ml-[-15px] bg-[#2f65b9] w-9 h-9 rounded-full flex items-center justify-center border-2 border-[#ffffff]">
											<a href="#" className="z-50">
												<PlusOutlined className="text-white" />
											</a>
										</li>
									</ul>
									<div className="mt-7 mx-[-16px] w-full h-[47px] flex justify-center items-center">
										<Button
											onClick={() =>
												handleNavigateToProjectDetails(project)
											}
											className="bg-[#eaeff8] text-[#2f65b9] hover:bg-[#2f65b9] hover:text-[#ffffff] transition duration- text-sm rounded-md font-semibold px-[28px] py-[15px] mx-[14px] no-underline">
											MANAGE PROJECT
										</Button>
									</div>
								</div>
							</div>
						</div>
					))}
			</div>
			{isLoadingGetListMyProjects && (
				<div className="text-center">Loading...</div>
			)}
		</>
	);
};

export default MyProjects;
