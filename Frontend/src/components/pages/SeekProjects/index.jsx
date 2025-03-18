import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { seekProjects, getProjectDetails } from "api/project";
import { Select, Button, Input } from "antd";
import LazyLoading from "components/UI/LazyLoading";
import { getRequestAddFriend } from "api/notification";
import { DeleteOutlined, SearchOutlined } from "@mui/icons-material";
import ProjectsSkeleton from "components/skeleton/ProjectsSkeleton";
import {
	resetFormSeekProjects,
	setFormSeekProjects,
} from "states/modules/project";
import NotFound from "components/UI/NotFound";
import {
	SECTOR,
	STAGE,
	SEARCH,
	RESET,
	INPUT_PLACEHOLDER,
} from "utils/constains";
import { Link } from "react-router-dom";
const ProjectDetailsModal = React.lazy(() => import("./ProjectDetailsModal"));

const SeekProjects = () => {
	const dispatch = useDispatch();
	const {
		projectsBySeek,
		projectDetails,
		loadingSeekProjects,
		formSeekProjects,
	} = useSelector((state) => state.project);
	const { language } = useSelector((state) => state.app);

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [canDeleteForm, setCanDeleteForm] = useState(false);

	useEffect(() => {
		if (
			formSeekProjects.industry ||
			formSeekProjects.stage ||
			formSeekProjects.name
		) {
			setCanDeleteForm(true);
		}
	}, [formSeekProjects]);

	const handleOnChange = (event, nameSelect) => {
		dispatch(setFormSeekProjects({ event, nameSelect }));
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			handleSeekProjects();
		}
	};

	const handleSeekProjects = () => {
		dispatch(
			seekProjects({
				...formSeekProjects,
				industry: formSeekProjects.industry ?? "",
				stage: formSeekProjects.stage ?? "",
				name: formSeekProjects.name ?? "",
			})
		);
	};

	const handleResetForm = () => {
		// setCanDeleteForm(false);
		dispatch(
			seekProjects({
				industry: "",
				stage: "",
				name: "",
				page: 0,
			})
		);
		dispatch(resetFormSeekProjects());
	};

	const handleViewDetails = (projectId, userId) => {
		setIsModalVisible(true);
		dispatch(getProjectDetails(projectId));
		dispatch(getRequestAddFriend(userId));
	};
	const [isGrid, setIsGrid] = useState(true);
	const courses = [
		{
			id: 1,
			title: "React for Beginners",
			category: "Web Development",
			instructor: "John Doe",
			lessons: 12,
			Participants: 1500,
			image: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/2020/11/1-500x300.jpg",
			description:
				"Learn React from scratch with hands-on projects and practical exercises.",
			rating: 4.5,
		},
		{
			id: 2,
			title: "Mastering Python",
			category: "Programming",
			instructor: "Jane Smith",
			lessons: 18,
			Participants: 2300,
			image: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/2020/11/1-500x300.jpg",
			description:
				"Master Python with deep dive into advanced concepts and real-world applications.",
			rating: 4.8,
		},
		{
			id: 3,
			title: "UI/UX Design Basics",
			category: "Design",
			instructor: "Michael Brown",
			lessons: 10,
			Participants: 1800,
			image: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/2020/11/1-500x300.jpg",
			description:
				"Understand the principles of UI/UX design and create user-friendly interfaces.",
			rating: 4.2,
		},
		{
			id: 4,
			title: "Machine Learning A-Z",
			category: "AI & Data Science",
			instructor: "Emily Wilson",
			lessons: 22,
			Participants: 2900,
			image: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/2020/11/1-500x300.jpg",
			description:
				"Learn machine learning from basics to advanced with real-world projects.",
			rating: 4.9,
		},
		{
			id: 5,
			title: "Digital Marketing 101",
			category: "Marketing",
			instructor: "David Johnson",
			lessons: 8,
			Participants: 1200,
			image: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/2020/11/1-500x300.jpg",
			description:
				"Explore digital marketing strategies and grow your business online.",
			rating: 4.3,
		},
		{
			id: 6,
			title: "JavaScript Advanced",
			category: "Programming",
			instructor: "Sarah Parker",
			lessons: 15,
			Participants: 2000,
			image: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/2020/11/1-500x300.jpg",
			description:
				"Deep dive into advanced JavaScript topics and best practices.",
			rating: 4.6,
		},
	];

	const recentCourses = [
		{
			title: "SEO Mastery",
			price: "Free",
			image: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/2020/11/1-500x300.jpg",
		},
		{
			title: "Docker for Developers",
			price: 29.99,
			image: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/2020/11/1-500x300.jpg",
		},
		{
			title: "Figma UI/UX",
			price: "Free",
			image: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/2020/11/1-500x300.jpg",
		},
		{
			title: "Vue.js Crash Course",
			price: 19.99,
			image: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/2020/11/1-500x300.jpg",
		},
	];
	return (
		// <div className={styles.searchContainer}>
		// 	<div className={styles.searchForm}>
		// 		<Button

		// 			disabled={
		// 				formSeekProjects.page <= 1 &&
		// 				formSeekProjects.name === null &&
		// 				formSeekProjects.industry === null &&
		// 				formSeekProjects.stage === null
		// 			}
		// 			className={styles.deleteButton}
		// 			type="dashed"
		// 			danger
		// 			icon={<DeleteOutlined />}
		// 			onClick={() => handleResetForm()}>
		// 			{RESET[language]}
		// 		</Button>
		// 		<div className={styles.searchContent}>
		// 			<Input
		// 				type="text"
		// 				placeholder={INPUT_PLACEHOLDER.PROJECT_NAME[language]}
		// 				value={formSeekProjects.name}
		// 				onChange={(e) => handleOnChange(e.target, "name")}
		// 				className={styles.searchInput}
		// 				style={{ width: "100%" }}
		// 				name="name"
		// 			/>
		// 			<Select
		// 				value={formSeekProjects.industry}
		// 				name="industry"
		// 				onChange={(value, option) =>
		// 					handleOnChange(option, "industry")
		// 				}
		// 				className={styles.searchSelect}
		// 				placeholder={INPUT_PLACEHOLDER.INDUSTRY[language]}
		// 				style={{ width: "13rem" }}
		// 				options={SECTOR[language]}
		// 			/>
		// 			<Select
		// 				value={formSeekProjects.stage}
		// 				onChange={(value, option) => handleOnChange(option, "stage")}
		// 				className={styles.searchSelect}
		// 				placeholder={INPUT_PLACEHOLDER.STAGE[language]}
		// 				style={{ width: "13rem" }}
		// 				options={STAGE[language]}
		// 			/>
		// 		</div>
		// 		<Button
		// 			className={styles.searchButton}
		// 			type="primary"
		// 			icon={<SearchOutlined />}
		// 			loading={loadingSeekProjects}
		// 			onClick={handleSeekProjects}
		// 			onKeyDown={(e) => handleKeyDown(e)}>
		// 			{SEARCH[language]}
		// 		</Button>
		// 	</div>

		// 	<div className={styles.projectsWrap}>
		// 		{projectsBySeek.length === 0 && !loadingSeekProjects && (
		// 			<NotFound content={"No suitable project found"} size={"10rem"} />
		// 		)}
		// 		<div className={styles.projectsList}>
		// 			{loadingSeekProjects ? (
		// 				<ProjectsSkeleton boxs={6} />
		// 			) : (
		// 				projectsBySeek.map((project, index) => (
		// 					<BoxProject
		// 						project={project}
		// 						key={index}
		// 						openModalDetails={handleViewDetails}
		// 						usedTo="projects-by-seek"
		// 					/>
		// 				))
		// 			)}
		// 		</div>
		// 	</div>
		// 	{projectDetails && projectDetails.name && (
		// 		<LazyLoading>
		// 			<ProjectDetailsModal
		// 				isVisible={isModalVisible}
		// 				onClose={() => setIsModalVisible(false)}
		// 				projectDetails={projectDetails}
		// 			/>
		// 		</LazyLoading>
		// 	)}
		// </div>

		<>
			<div className="pt-[35px] flex gap-6 ">
				<div className="bg-gray-100 w-3/4 2xl:relative 2xl:left-[-1rem] 2xl:w-[70rem] ">
					<div className="flex items-center gap-4 p-4 bg-white border rounded-lg shadow-sm ml-[1.9rem] flex-col md:flex-row  justify-between">
						<p className="mt-2 mb-0 text-lg text-gray-600">
							All Projects
						</p>
						<div className=" md:w-auto">
							<input
								type="text"
								placeholder="Search project..."
								className="px-4 py-2 outline-none w-64 bg-white border rounded-sm md:w-[13rem]"
							/>
							<button className="bg-[#2F65B9] px-4 py-2 text-white  rounded-sm">
								<SearchOutlined></SearchOutlined>
							</button>
							<button
								onClick={() => setIsGrid(true)}
								className={`px-2 py-2 mx-2 rounded ${
									isGrid
										? "bg-blue-500 text-white"
										: "bg-gray-300 text-black"
								}`}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-grid"
									viewBox="0 0 16 16">
									{" "}
									<path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
								</svg>
							</button>
							<button
								onClick={() => setIsGrid(false)}
								className={`px-2 py-2 rounded ${
									!isGrid
										? "bg-blue-500 text-white"
										: "bg-gray-300 text-black"
								}`}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="16"
									viewBox="0 0 24 24"
									width="16">
									<path d="M0 0h24v24H0V0z" fill="none" />
									<path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" />
								</svg>
							</button>
						</div>
					</div>

					<ul
						className={`${
							isGrid
								? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
								: "flex flex-col"
						} gap-6 mt-4`}>
						{courses.map((course, index) => (
							<li
								key={index}
								className="rounded-sm cursor-pointer group">
								<Link
									className="no-underline"
									to={`/seek-projects/${course.id}`}>
									<div
										className={`bg-white ${
											isGrid
												? "w-full max-w-lg h-[360px]"
												: "flex items-center p-4 w-[55rem] 2xl:w-[68rem]"
										} pt-3 mx-auto`}>
										<div
											className={`relative ${
												isGrid
													? "w-[90%] h-48 mx-auto"
													: "w-[16rem] h-[10rem]"
											} rounded-md overflow-hidden group`}>
											<img
												src={course.image}
												alt={course.title}
												className={`object-cover absolute  ${
													isGrid
														? "w-full h-auto"
														: "w-[16rem] h-[10rem]"
												}  !transition-transform !duration-500 !transform !origin-center !ease-out !group-hover:scale-110 `}
											/>
										</div>

										<div
											className={`${
												isGrid
													? "relative p-4 top-[-3rem] 2xl:top-[-0.75rem]"
													: "ml-4 flex flex-col justify-center"
											}`}>
											<div
												className={` ${
													isGrid
														? "flex justify-between items-center"
														: "flex "
												}`}>
												<p
													className={`${
														isGrid
															? "bg-[#EAEFF8] p-1 rounded-sm text-[#737F92] text-xs md:text-[0.85rem] font-semibold"
															: "bg-[#EAEFF8] p-1 rounded-sm text-[#737F92] text-xs md:text-[0.85rem] font-semibold mr-4"
													}`}>
													{course.category}
												</p>
												<p className="text-xs font-semibold md:text-sm">
													By{" "}
													<span className="font-semibold text-blue-600">
														{course.instructor}
													</span>
												</p>
											</div>

											<h5 className="text-base md:text-[0.95rem] font-semibold text-gray-900 mt-2 whitespace-normal break-words leading-[1.3rem]">
												{course.title}
											</h5>
											<div
												className={`${
													isGrid
														? "flex items-center justify-between mt-3 text-gray-600 text-xs md:text-sm"
														: "flex items-center mt-3 text-gray-600 text-xs md:text-sm"
												}`}>
												<p className={`${isGrid ? "" : "mr-4"}`}>
													📖 {course.lessons} Project
												</p>
												<p>
													👨‍🎓 {course.Participants} Participants{" "}
												</p>
											</div>
										</div>
									</div>
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className="w-1/4 2xl:w-[23.25rem] bg-white p-4 rounded-md shadow-sm h-fit">
					<h3 className="text-lg font-semibold mb-4 border-b border-[#DEDEDE] pb-4">
						Recent Project
					</h3>
					<ul className="space-y-4">
						{recentCourses.map((course, index) => (
							<li
								key={index}
								className="flex items-center gap-3 relative left-[-1.75rem]">
								<img
									src={course.image}
									alt={course.title}
									className="relative w-[4.5rem] h-[4.5rem] rounded-md object-cover top-[-1.25rem]"
								/>
								<div>
									<p className="text-sm font-semibold">
										{course.title}
									</p>
									<p
										className={`text-xs relative top-[-0.75rem] ${
											course.price === "Free"
												? "text-green-500"
												: "text-blue-500"
										}`}>
										{course.price === "Free"
											? "Free"
											: `$${course.price}`}
									</p>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default SeekProjects;
