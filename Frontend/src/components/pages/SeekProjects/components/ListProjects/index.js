import { accessToProject } from "api/activity";
import { seekProjects } from "api/project";
import PaginationCustom from "components/UI/PaginationCustom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const imageHardCode =
	"https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/2020/11/1-500x300.jpg";

const ListProjects = ({ action }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// ========== STATE FROM REDUX ========== //
	const projects = useSelector((state) => state.project.projectsBySeek);
	const { paginationSeekProjects, filterSeekProjects } = useSelector(
		(state) => state.project
	);

	// ========== HANDLE FUNCTION ========== //
	const onPageChange = (pageData) => {
		dispatch(
			seekProjects({
				...filterSeekProjects,
				page: pageData.page,
				perPage: pageData.pageSize,
			})
		);
	};

	const handleViewProjectDetails = (project) => {
		dispatch(accessToProject(project._id));
		navigate(`/projects/${project._id}/details`);
	};

	// ========== RENDER COMPONENT ========== //
	return (
		<div className="flex flex-col items-center gap-4 ">
			<ul
				className={`${
					action === "grid" &&
					"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
				}
                ${action === "list" && "flex flex-col"}
             gap-6 pl-0 mt-4 w-full`}>
				{projects.map((project, index) => (
					<li
						onClick={() => handleViewProjectDetails(project)}
						key={index}
						className="overflow-hidden rounded-sm cursor-pointer group">
						<div
							className={`bg-white ${
								action === "grid" && "w-full max-w-lg h-[360px]"
							}${
								action === "list" &&
								"flex items-center p-4 w-[55rem] 2xl:w-[68rem]"
							} pt-3 mx-auto`}>
							<div
								className={`relative ${
									action === "grid" && "w-[90%] h-48 mx-auto"
								}
                                ${
												action === "list" && "w-[16rem] h-[10rem]"
											} rounded-md overflow-hidden group`}>
								<img
									src={project.background || imageHardCode}
									alt={project.name}
									onError={(e) => {
										e.target.onerror = null;
										e.target.src = imageHardCode;
									}}
									className={`object-cover absolute  ${
										action === "grid" && "w-full h-auto"
									}
                                    ${
													action === "list" &&
													"w-[16rem] h-[10rem]"
												}  !transition-transform !duration-500 !transform !origin-center !ease-out !group-hover:scale-110 `}
								/>
							</div>

							<div
								className={`${
									action === "grid" &&
									"relative p-4 top-[-3rem] 2xl:top-[-0.75rem]"
								}
                                ${
												action === "list" &&
												"ml-4 flex flex-col justify-center"
											}
                                `}>
								<div
									className={` ${
										action === "grid" &&
										"flex justify-between items-center"
									} ${action === "list" && "flex "}`}>
									<p
										className={`${
											action === "grid" &&
											"bg-[#EAEFF8] p-1 rounded-sm text-[#737F92] text-xs md:text-[0.85rem] font-semibold"
										} ${
											action === "list" &&
											"bg-[#EAEFF8] p-1 rounded-sm text-[#737F92] text-xs md:text-[0.85rem] font-semibold mr-4"
										}`}>
										{project.stage.name}
									</p>
									<p className="text-xs font-semibold md:text-sm">
										By{" "}
										<span className="font-semibold text-blue-600">
											{project.user.name}
										</span>
									</p>
								</div>

								<h5 className="text-base md:text-[0.95rem] font-semibold text-gray-900 mt-2 whitespace-normal break-words leading-[1.3rem]">
									{project.name}
								</h5>
								<div
									className={`${
										action === "grid" &&
										"flex items-center justify-between mt-3 text-gray-600 text-xs md:text-sm"
									} ${
										action === "list" &&
										"flex items-center mt-3 text-gray-600 text-xs md:text-sm"
									}`}>
									<p
										className={`${
											action === "list" && "mr-4"
										} text-nowrap text-xs"`}>
										📖 {project.articles?.length} Posts
									</p>
									<p className="text-xs text-nowrap">
										👨‍🎓 {project.members.length} Members
									</p>
								</div>
							</div>
						</div>
					</li>
				))}
			</ul>
			<div className="flex justify-center w-full pb-10">
				<PaginationCustom
					pagination={paginationSeekProjects}
					onPageChange={onPageChange}
				/>
			</div>
		</div>
	);
};

export default ListProjects;
