import React, { useState } from "react";
import { Modal, Typography, Tag, Space, Row, Col, Card } from "antd";
import {
	DollarCircleOutlined,
	TeamOutlined,
	RocketOutlined,
	AimOutlined,
} from "@ant-design/icons";
import { FaChevronRight, FaCheckCircle, FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import styles from "./styles.module.scss";
import BackgroundDefault from "assets/images/default/BackgroundDefault.png";
import LazyLoading from "components/UI/LazyLoading";
import { useSelector, useDispatch } from "react-redux";
import { getRequestAddFriend, sendRequestAddFriend } from "api/notification";
import { getTalentDetails } from "api/talent";
const { Title, Text, Paragraph } = Typography;
import MemberBox from "../../../common/ProjectDetails/ProjectInfo/MemberBox";
import store from "states/configureStore";
import { useParams } from "react-router-dom";
const TalentProfile = React.lazy(() =>
	import("components/common/TalentProfile")
);
const courses = [
	{
		id: 1,
		title: "React for Beginners",
		category: "Web Development",
		instructor: "John Doe",
		lessons: 12,
		students: 1500,
		image: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/2020/11/1-500x300.jpg",
		description: "Learn React from scratch with hands-on projects and practical exercises.",
		rating: 4.5,
	},
	{
		id: 2,
		title: "Mastering Python",
		category: "Programming",
		instructor: "Jane Smith",
		lessons: 18,
		students: 2300,
		image: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/2020/11/1-500x300.jpg",
		description: "Master Python with deep dive into advanced concepts and real-world applications.",
		rating: 4.8,
	},
	{
		id: 3,
		title: "UI/UX Design Basics",
		category: "Design",
		instructor: "Michael Brown",
		lessons: 10,
		students: 1800,
		image: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/2020/11/1-500x300.jpg",
		description: "Understand the principles of UI/UX design and create user-friendly interfaces.",
		rating: 4.2,
	},
	{
		id: 4,
		title: "Machine Learning A-Z",
		category: "AI & Data Science",
		instructor: "Emily Wilson",
		lessons: 22,
		students: 2900,
		image: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/2020/11/1-500x300.jpg",
		description: "Learn machine learning from basics to advanced with real-world projects.",
		rating: 4.9,
	},
	{
		id: 5,
		title: "Digital Marketing 101",
		category: "Marketing",
		instructor: "David Johnson",
		lessons: 8,
		students: 1200,
		image: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/2020/11/1-500x300.jpg",
		description: "Explore digital marketing strategies and grow your business online.",
		rating: 4.3,
	},
	{
		id: 6,
		title: "JavaScript Advanced",
		category: "Programming",
		instructor: "Sarah Parker",
		lessons: 15,
		students: 2000,
		image: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/2020/11/1-500x300.jpg",
		description: "Deep dive into advanced JavaScript topics and best practices.",
		rating: 4.6,
	},
];
const ProjectDetailsModal = ({ isVisible, onClose, projectDetails }) => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const course = courses.find((c) => c.id === parseInt(id));
	// Redux
	const { requestAddFriend, loadingSendRequestAddFriend } = useSelector(
		(state) => state.notification
	);
	const { talentDetails } = useSelector((state) => state.talent);

	// State
	const [openModalMemberDetails, setOpenModalMemberDetails] = useState(false);

	const handleRequestAddFriend = async (user_id) => {
		const requestMessageForm = {
			user_id: user_id,
			metadata: {},
		};
		await store.dispatch(sendRequestAddFriend(requestMessageForm));
		dispatch(getRequestAddFriend(user_id));
	};

	// Function handle open modal member details
	const handleOpenModalMemberDetails = (member) => {
		setOpenModalMemberDetails(true);
		dispatch(getTalentDetails(member._id));
	};
	const [changetab, setChangetab] = useState("Overview")
	const [dropdown, setDropsown] = useState(false)
	const [modal, setModal] = useState(false)
	return (
		// <Modal
		// 	open={isVisible}
		// 	onCancel={onClose}
		// 	onOk={() => handleRequestAddFriend(projectDetails.user_id)}
		// 	width={1200}
		// 	confirmLoading={loadingSendRequestAddFriend}
		// 	okButtonProps={{
		// 		disabled: requestAddFriend,
		// 	}}
		// 	okText={
		// 		<div
		// 			style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
		// 			<PersonAddIcon />
		// 			Contact
		// 		</div>
		// 	}
		// 	className={styles.projectModal}>
		// 	<div className={styles.modalContent}>
		// 		<div className={styles.projectHeader}>
		// 			<img
		// 				className={styles.headerImage}
		// 				src={projectDetails.background || BackgroundDefault}
		// 				alt={projectDetails.name}
		// 				onError={(e) => {
		// 					e.target.onerror = null;
		// 					e.target.src = Background;
		// 				}}
		// 			/>
		// 			<div className={styles.headerOverlay}>
		// 				<Title level={2}>{projectDetails.name}</Title>
		// 				<Space size={8} wrap>
		// 					{projectDetails.related_industries?.map((industry) => (
		// 						<Tag key={industry} color="blue">
		// 							{industry}
		// 						</Tag>
		// 					))}
		// 				</Space>
		// 				<Space size={8} wrap>
		// 					<Tag
		// 						color="green"
		// 						icon={<RocketOutlined style={{ height: "0.5rem	" }} />}>
		// 						{projectDetails.stage}
		// 					</Tag>
		// 				</Space>
		// 			</div>
		// 		</div>

		// 		<div className={styles.sections}>
		// 			<Row gutter={[24, 24]}>
		// 				<Col span={24}>
		// 					<Card className={styles.section}>
		// 						<Title level={4} icon={<AimOutlined />}>
		// 							Project Overview
		// 						</Title>
		// 						<Row gutter={[24, 24]}>
		// 							<Col span={12}>
		// 								<div className={styles.infoItem}>
		// 									<Text strong>Problem</Text>
		// 									<Paragraph>{projectDetails.problem}</Paragraph>
		// 								</div>
		// 							</Col>
		// 							<Col span={12}>
		// 								<div className={styles.infoItem}>
		// 									<Text strong>Target Audience</Text>
		// 									<Paragraph>
		// 										{projectDetails.target_audience}
		// 									</Paragraph>
		// 								</div>
		// 							</Col>
		// 						</Row>
		// 						<Row gutter={[24, 24]}>
		// 							<Col span={12}>
		// 								<div className={styles.infoItem}>
		// 									<Text strong>Solution</Text>
		// 									<Paragraph>
		// 										{projectDetails.solution}
		// 									</Paragraph>
		// 								</div>
		// 							</Col>
		// 							<Col span={12}>
		// 								<div className={styles.infoItem}>
		// 									<Text strong>Statistics</Text>
		// 									<Paragraph>
		// 										{projectDetails.statistics}
		// 									</Paragraph>
		// 								</div>
		// 							</Col>
		// 						</Row>
		// 					</Card>
		// 				</Col>
		// 				<Col span={24}>
		// 					<Card className={styles.section}>
		// 						<Title level={4} icon={<DollarCircleOutlined />}>
		// 							Team Infomation
		// 						</Title>
		// 						<Row gutter={[16, 16]}>
		// 							<MemberBox
		// 								owner_id={projectDetails.user_id}
		// 								member={projectDetails.owner}
		// 								openModalMemberDetails={
		// 									handleOpenModalMemberDetails
		// 								}
		// 							/>
		// 							{projectDetails.metadata.members &&
		// 								projectDetails.metadata.members.length > 0 &&
		// 								projectDetails.metadata.members.map(
		// 									(member, index) => (
		// 										<MemberBox
		// 											owner_id={projectDetails.user_id}
		// 											member={member}
		// 											key={index}
		// 											openModalMemberDetails={
		// 												handleOpenModalMemberDetails
		// 											}
		// 										/>
		// 									)
		// 								)}
		// 						</Row>
		// 					</Card>
		// 				</Col>

		// 				<Col span={24}>
		// 					<Card className={styles.section}>
		// 						<Title level={4} icon={<DollarCircleOutlined />}>
		// 							Funding Information
		// 						</Title>
		// 						<Row gutter={[16, 16]}>
		// 							{Object.entries(projectDetails.funding_sources).map(
		// 								([source, amount]) => (
		// 									<Col span={8} key={source}>
		// 										<Card className={styles.fundingCard}>
		// 											<Text strong>
		// 												{source
		// 													.replace(/_/g, " ")
		// 													.toUpperCase()}
		// 											</Text>
		// 											<Text className={styles.amount}>
		// 												${amount}
		// 											</Text>
		// 										</Card>
		// 									</Col>
		// 								)
		// 							)}
		// 							<Col span={24}>
		// 								<div className={styles.infoItem}>
		// 									<Text strong>Target Money</Text>
		// 									<Paragraph>
		// 										{projectDetails.target_money}
		// 									</Paragraph>
		// 								</div>
		// 							</Col>
		// 						</Row>
		// 					</Card>
		// 				</Col>

		// 				<Col span={24}>
		// 					<Card className={styles.section}>
		// 						<Title level={4} icon={<TeamOutlined />}>
		// 							Strategy & Competition
		// 						</Title>
		// 						<Row gutter={[24, 24]}>
		// 							<Col span={12}>
		// 								<div className={styles.infoItem}>
		// 									<Text strong>Competitors</Text>
		// 									<Paragraph>
		// 										{projectDetails.competitors}
		// 									</Paragraph>
		// 								</div>
		// 							</Col>
		// 							<Col span={12}>
		// 								<div className={styles.infoItem}>
		// 									<Text strong>Strategy</Text>
		// 									<Paragraph>
		// 										{projectDetails.strategy}
		// 									</Paragraph>
		// 								</div>
		// 							</Col>
		// 						</Row>
		// 						<Row gutter={[24, 24]}>
		// 							<Col span={12}>
		// 								<div className={styles.infoItem}>
		// 									<Text strong>Competitive Advantage</Text>
		// 									<Paragraph>
		// 										{projectDetails.competitive_advantage}
		// 									</Paragraph>
		// 								</div>
		// 							</Col>
		// 							<Col span={12}>
		// 								<div className={styles.infoItem}>
		// 									<Text strong>Why Now</Text>
		// 									<Paragraph>{projectDetails.why_now}</Paragraph>
		// 								</div>
		// 							</Col>
		// 						</Row>
		// 					</Card>
		// 				</Col>
		// 			</Row>
		// 		</div>
		// 		<Modal
		// 			footer={null}
		// 			title=""
		// 			open={openModalMemberDetails}
		// 			onCancel={() => setOpenModalMemberDetails(false)}
		// 			width={1000}>
		// 			<LazyLoading>
		// 				<TalentProfile talent={talentDetails} />
		// 			</LazyLoading>
		// 		</Modal>
		// 	</div>
		// </Modal>
		<>
			<div className="">
				<div className=" bg-[#07142e] w-[78.75rem] h-[18.75rem] relative top-[0rem] 2xl:w-[102rem]">
					<div className="text-white font-bold relative top-[5rem]  border-b border-[#142039] pb-4 2xl:ml-[5.5rem]">
						<ol className="flex mb-0">
							<li>
								Home
								<FaChevronRight className="inline mx-2" />
							</li>
							<li>
								Project
								<FaChevronRight className="inline mx-2" />
							</li>
							<li>
								Healthy Cooking Fundamentals
							</li>
						</ol>
						<h3 className="ml-[2rem]">Healthy Cooking Fundamentals</h3>
					</div>

					<div className="flex items-center mt-[-0.5rem] relative top-[5.8rem] ml-8 text-white 2xl:ml-[7rem]">
						<img
							src="https://randomuser.me/api/portraits/women/44.jpg"
							alt="Instructor"
							className="w-10 h-10 rounded-full mr-3"
						/>
						<div>
							<p className="relative top-[1.25rem] text-xs mb-4 text-[#6F7F92]">Created by</p>
							<p>Jenny Wilson <FaCheckCircle className="ml-1 text-blue-500 inline" /></p>
						</div>
						<div className="ml-5">
							<p className="relative top-[1.25rem] text-xs mb-4 text-[#6F7F92]">Backend</p>
							<p className="text-[1rem]">Cooking</p>
						</div>
						<div className="ml-5">
							<p className="relative top-[1.25rem] text-xs mb-4 text-[#6F7F92]">Review</p>
							<p className="flex items-center text-yellow-400 text-xl">
								<FaStar />
								<FaStar />
								<FaStar />
								<FaStar />
								<FaRegStar />
							</p>
						</div>
						<div className="ml-5">
							<p className="relative top-[1.25rem] text-xs mb-4 text-[#6F7F92]">Course Results: 70%</p>
							<p className="w-[8rem] h-[0.4rem] bg-gray-700 rounded-full overflow-hidden">
								<div className="h-full bg-blue-600 rounded-full w-3/5"></div>
							</p>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-3 gap-6 mt-[3.5rem]">
					{/* Phần bên trái */}
					<div className="col-span-2  p-6 w-[46rem] ml-[0.75rem] 2xl:w-[52rem] 2xl:relative 2xl:left-[9rem]">
						<div className="bg-[#E3F1F6] pl-4 py-3 border-l-2 border-[#0098CB]">
							<p className="relative top-[0.6rem] text-[#1599CC]   ">You finished this project. This project has been blocked</p>
						</div>
						<div className="bg-white mt-[1rem] p-4 font-bold flex">
							<button onClick={() => setChangetab("Overview")} className={` flex ${changetab == "Overview" ? " border-b-2 border-black " : " "}`}>
								<svg xmlns="http://www.w3.org/2000/svg" className="w-[1.2rem] mr-2" width="24px" height="24px" viewBox="0 0 576 512"><path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z" /></svg>
								Overview
							</button>
							<button onClick={() => setChangetab("Curriculum")} className={`ml-[4.25rem] flex ${changetab == "Curriculum" ? " border-b-2 border-black " : " "}`}>
								<svg xmlns="http://www.w3.org/2000/svg" className="w-[1.2rem] mr-2" version="1.1" id="mdi-school" width="24" height="24" viewBox="0 0 24 24"><path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z" /></svg>
								Curriculum
							</button>
							<button onClick={() => setChangetab("Instructor")} className={`ml-[4.25rem] flex ${changetab == "Instructor" ? " border-b-2 border-black " : " "}`}>
								<svg xmlns="http://www.w3.org/2000/svg" className="w-[1.2rem] mr-2" width="24" height="24" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136 32-56h-96l32 56-32 136-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z" /></svg>
								Instructor
							</button>
							<button onClick={() => setChangetab("Reviews")} className={`ml-[4.25rem] flex ${changetab == "Reviews" ? " border-b-2 border-black " : " "}`}>
								<svg fill="#000000" xmlns="http://www.w3.org/2000/svg" className="w-[1.2rem] mr-2" viewBox="0 0 24 24" width="24px" height="24px">    <path d="M 4 3 C 2.9 3 2 3.9 2 5 L 2 17 L 5 14 L 14 14 C 15.1 14 16 13.1 16 12 L 16 5 C 16 3.9 15.1 3 14 3 L 4 3 z M 18 8 L 18 12 C 18 14.206 16.206 16 14 16 L 8 16 L 8 17 C 8 18.1 8.9 19 10 19 L 19 19 L 22 22 L 22 10 C 22 8.9 21.1 8 20 8 L 18 8 z" /></svg>
								Reviews
							</button>
						</div>
						<div className=" mt-[2.5rem]">
							{changetab == "Overview" && (
								<div className="p-4 bg-white">
									<h2 className="text-2xl font-semibold mb-4">Description</h2>
									<p className="text-[#9DA4A4] mb-4">
										Have you ever wondered how a professional ice cream formula is written? Why certain ingredients are chosen and why in such a specific ratio? Why the ice cream we buy stays soft after days in the freezer?
									</p>
									<p className="text-[#9DA4A4] mb-4">This is the occasion to give an answer to those questions!</p>
									<p className="text-[#9DA4A4] mb-4">The class is meant for ice cream makers and pastry chefs, but any passionate hobbyist is most welcome!</p>
									<p className="text-[#9DA4A4] mb-4">Throughout the course, we will talk about ice cream ingredients, their functions, in order to understand how to build a complete recipe from zero.</p>
									<p className="text-[#9DA4A4] mb-4">Please bear in mind that this course is not to teach how to make ice cream, but rather very important and technical aspects behind the recipe architecture.</p>
									<h2 className="text-2xl font-semibold mb-4">What you’ll learn?</h2>
									<ul>
										<li className="text-[#9DA4A4] mb-2">
											How to read, interpretate, modify and write an artisanal ice-cream recipe
										</li>
										<li className="text-[#9DA4A4] mb-2">
											Which re the technical functions of te ice-cream ingredients
										</li>
									</ul>
									<h2 className="text-2xl font-semibold mb-4">Requirements</h2>
									<ul>
										<li className="text-[#9DA4A4] mb-2">To have a general knowledge of ice cream making</li>
									</ul>
								</div>
							)

							}
							{changetab == "Curriculum" && (
								<>
									<div className="bg-white">
										<button onClick={() => setDropsown(!dropdown)} className=" p-3 flex  ">
											<h4 className="mb-0">Lessons in This Class</h4>
											<p className="mb-0 relative right-[-26.5rem] text-[#6F7F92]">{dropdown ? "▲" : "▼"}</p>
										</button>

									</div>
									<div>
										{dropdown == true && (
											<div className="mt-3">
												<div className="bg-white p-3 mt-3 font-bold cursor-pointer hover:text-[#2F65C9] flex justify-between">
													<p className="mb-0 flex"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="mr-3 mt-1 !text-[#2F65C9]" width="18" height="18" viewBox="0 0 24 24"><path d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z" /></svg>Introduction to the project</p>
													<p className="mb-0 text-[#2F65C9] flex">20 minutes
														<svg
															className="mr-3 ml-7 text-[#00C792]"
															width="24"
															height="24"
															viewBox="0 0 24 24"
															fill="currentColor"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
														</svg>
													</p>


												</div>
												<div className="bg-white p-3 mt-3 font-bold cursor-pointer hover:text-[#2F65C9] flex justify-between">
													<p className="mb-0 flex"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="mr-3 mt-1 !text-[#2F65C9]" width="18" height="18" viewBox="0 0 24 24"><path d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z" /></svg>Why do we have to balance the recipe</p>
													<p className="mb-0 text-[#2F65C9] flex">20 minutes
														<svg
															className="mr-3 ml-7 text-[#00C792]"
															width="24"
															height="24"
															viewBox="0 0 24 24"
															fill="currentColor"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
														</svg>
													</p>


												</div>
												<div className="bg-white p-3 mt-3 font-bold cursor-pointer hover:text-[#2F65C9] flex justify-between"><p className="mb-0 flex"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="mr-3 mt-1 !text-[#2F65C9]" version="1.1" id="mdi-help-circle-outline" width="18" height="18" viewBox="0 0 24 24"><path d="M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z" /></svg>Ice Cream Quiz Questions</p>
													<p className="mb-0 text-[#2F65C9] flex">
														<p className="mb-0">10 minutes</p>
														<p className="mb-0 text-black font-thin mr-[2.5rem] ml-[1.5rem]">5 questions</p>
														<svg xmlns="http://www.w3.org/2000/svg" className="mr-3 mt-1 text-[#00C792]" fill="currentColor" height="18" viewBox="0 0 24 24" width="18"><g><rect fill="none" height="24" width="24" x="0" /></g><g><g><g><path d="M12,17c1.1,0,2-0.9,2-2s-0.9-2-2-2s-2,0.9-2,2S10.9,17,12,17z M18,8h-1V6c0-2.76-2.24-5-5-5S7,3.24,7,6v2H6 c-1.1,0-2,0.9-2,2v10c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V10C20,8.9,19.1,8,18,8z M8.9,6c0-1.71,1.39-3.1,3.1-3.1 s3.1,1.39,3.1,3.1v2H8.9V6z M18,20H6V10h12V20z" /></g></g></g></svg>
													</p>
												</div>
											</div>
										)}
									</div>
								</>
							)}
							{changetab == "Instructor" && (
								<div className="bg-white">
									<div className="p-5 flex">
										<img className="w-[6rem] h-[6rem] rounded-[0.5rem]" src="https://randomuser.me/api/portraits/women/44.jpg" />
										<div>
											<ul className="flex mt-[0.75rem] pl-3">
												<li className="mr-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width="35px" height="35px" className="text-[#1877F2]"><path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" /></svg></li>
												<li className="mr-2"><svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-[#1DA1F2]" viewBox="0 0 24 24" width="35px" height="35px"><path d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M17.05,9.514 c0,0.086,0,0.171,0,0.343c0,3.257-2.486,7.029-7.029,7.029c-1.371,0-2.657-0.429-3.771-1.114c0.171,0,0.429,0,0.6,0 c1.114,0,2.229-0.429,3.086-1.029c-1.114,0-1.971-0.771-2.314-1.714c0.171,0,0.343,0.086,0.429,0.086c0.257,0,0.429,0,0.686-0.086 c-1.114-0.257-1.971-1.2-1.971-2.4c0.343,0.171,0.686,0.257,1.114,0.343c-0.686-0.6-1.114-1.286-1.114-2.143 c0-0.429,0.086-0.857,0.343-1.2c1.2,1.457,3,2.486,5.057,2.571c0-0.171-0.086-0.343-0.086-0.6c0-1.371,1.114-2.486,2.486-2.486 c0.686,0,1.371,0.257,1.8,0.771c0.6-0.086,1.114-0.343,1.543-0.6c-0.171,0.6-0.6,1.029-1.114,1.371 c0.514-0.086,0.943-0.171,1.457-0.429C17.907,8.743,17.479,9.171,17.05,9.514z" /></svg></li>
												<li className="mr-2"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="text-[#EA4C89]" viewBox="0 0 448 512" width="35px" height="35px"><path d="M90.2 228.2c8.9-42.4 37.4-77.7 75.7-95.7 3.6 4.9 28 38.8 50.7 79-64 17-120.3 16.8-126.4 16.7zM314.6 154c-33.6-29.8-79.3-41.1-122.6-30.6 3.8 5.1 28.6 38.9 51 80 48.6-18.3 69.1-45.9 71.6-49.4zM140.1 364c40.5 31.6 93.3 36.7 137.3 18-2-12-10-53.8-29.2-103.6-55.1 18.8-93.8 56.4-108.1 85.6zm98.8-108.2c-3.4-7.8-7.2-15.5-11.1-23.2C159.6 253 93.4 252.2 87.4 252c0 1.4-.1 2.8-.1 4.2 0 35.1 13.3 67.1 35.1 91.4 22.2-37.9 67.1-77.9 116.5-91.8zm34.9 16.3c17.9 49.1 25.1 89.1 26.5 97.4 30.7-20.7 52.5-53.6 58.6-91.6-4.6-1.5-42.3-12.7-85.1-5.8zm-20.3-48.4c4.8 9.8 8.3 17.8 12 26.8 45.5-5.7 90.7 3.4 95.2 4.4-.3-32.3-11.8-61.9-30.9-85.1-2.9 3.9-25.8 33.2-76.3 53.9zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-64 176c0-88.2-71.8-160-160-160S64 167.8 64 256s71.8 160 160 160 160-71.8 160-160z" /></svg></li>
												<li className="mr-2"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512" width="35px" height="35px" className="text-[#1157FF]"><path d="M186.5 293c0 19.3-14 25.4-31.2 25.4h-45.1v-52.9h46c18.6.1 30.3 7.8 30.3 27.5zm-7.7-82.3c0-17.7-13.7-21.9-28.9-21.9h-39.6v44.8H153c15.1 0 25.8-6.6 25.8-22.9zm132.3 23.2c-18.3 0-30.5 11.4-31.7 29.7h62.2c-1.7-18.5-11.3-29.7-30.5-29.7zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zM271.7 185h77.8v-18.9h-77.8V185zm-43 110.3c0-24.1-11.4-44.9-35-51.6 17.2-8.2 26.2-17.7 26.2-37 0-38.2-28.5-47.5-61.4-47.5H68v192h93.1c34.9-.2 67.6-16.9 67.6-55.9zM380 280.5c0-41.1-24.1-75.4-67.6-75.4-42.4 0-71.1 31.8-71.1 73.6 0 43.3 27.3 73 71.1 73 33.2 0 54.7-14.9 65.1-46.8h-33.7c-3.7 11.9-18.6 18.1-30.2 18.1-22.4 0-34.1-13.1-34.1-35.3h100.2c.1-2.3.3-4.8.3-7.2z" /></svg></li>
												<li className="mr-2"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512" width="35px" height="35px" className="text-[#F9101E]"><path d="M186.8 202.1l95.2 54.1-95.2 54.1V202.1zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-42 176.3s0-59.6-7.6-88.2c-4.2-15.8-16.5-28.2-32.2-32.4C337.9 128 224 128 224 128s-113.9 0-142.2 7.7c-15.7 4.2-28 16.6-32.2 32.4-7.6 28.5-7.6 88.2-7.6 88.2s0 59.6 7.6 88.2c4.2 15.8 16.5 27.7 32.2 31.9C110.1 384 224 384 224 384s113.9 0 142.2-7.7c15.7-4.2 28-16.1 32.2-31.9 7.6-28.5 7.6-88.1 7.6-88.1z" /></svg></li>
												<li className="mr-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width="35px" height="35px" className="text-[#C9216C]"><path d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z" /></svg></li>
											</ul>
											<span className="pl-3 font-bold">Jenny Wilson</span>
										</div>
									</div>
								</div>
							)
							}
							{changetab == "Reviews" && (
								<>
									<div className="grid grid-cols-2 gap-6">

										<div className="flex flex-col items-center bg-white w-[14.25rem] h-[16.25rem]">
											<div className=" flex flex-col items-center mt-5">
												<h2 className="!text-[4.75rem] ">4.5</h2>
												<div className="flex text-yellow-400 text-[1.2rem] !mb-2 !mt-[-0.75rem]">
													<span>⭐</span>
													<span>⭐</span>
													<span>⭐</span>
													<span>⭐</span>
													<span className="text-gray-300">⭐</span>
												</div>
												<p className="text-gray-600 text-sm">2 ratings</p>
											</div>
										</div>


										<div className="relative right-[6rem] space-y-2 bg-white w-[26.5rem] 2xl:w-[29.5rem]">
											{[5, 4, 3, 2, 1].map((star) => (
												<div key={star} className="flex items-center relative right-[-4rem] top-[3rem] ">
													<span className="ml-1 text-gray-700">{star}</span>
													<span className="text-yellow-400 text-lg">⭐</span>
													<div className="w-[17rem] h-2 bg-gray-200 rounded-lg mx-2 2xl:w-[19rem] ">
														<div
															className={`h-2 ${star === 5
																? "bg-yellow-400 w-3/6"
																: star === 4
																	? "bg-yellow-400 w-2/6"
																	: "bg-gray-200"
																} rounded-lg`}
														></div>
													</div>
													<span className="text-gray-600 text-sm">
														{star === 5 ? "1" : star === 4 ? "1" : "0"}
													</span>
												</div>
											))}
										</div>

									</div>
									<div className="py-4">
										<button onClick={() => setModal(!modal)} className="bg-[#2F65B9] text-white w-[10.6rem] py-2 rounded-[0.25rem]">WRITE A REVIEW</button>
									</div>
									{modal == true && (
										<>
											<div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 bg-[#777778] z-[9999]">
												<div className="bg-white p-6 rounded-lg w-[38rem] shadow-lg">
													<h2 className="text-xl font-bold mb-4">Write A Review</h2>

													<label className="block font-semibold">Title *</label>
													<input
														type="text"
														className="w-full border border-gray-300 p-2 rounded mt-1 bg-[#F8F9FA]"
														placeholder="Enter review title"
													/>

													<label className="block font-semibold mt-3">Content *</label>
													<textarea
														className="w-full border border-gray-300 p-2 rounded mt-1 h-24 bg-[#F8F9FA]"
														placeholder="Write your review here..."
													></textarea>

													<label className="block font-semibold mt-3">Rating *</label>
													<div className="flex space-x-1 text-yellow-400">
														{[...Array(5)].map((_, i) => (
															<span key={i} className="cursor-pointer text-2xl">⭐</span>
														))}
													</div>

													<div className="flex justify-end mt-4 space-x-2">
														<button className="bg-gray-300 px-4 py-2 rounded-lg" onClick={() => setModal(false)}>
															Cancel
														</button>
														<button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
															Add Review
														</button>
													</div>
												</div>
											</div>



										</>
									)

									}
									<div>
										<h3>Reviews</h3>
										<div className="bg-white h-[12.5rem] flex">
											<img className="w-[8.5rem] h-[8.5rem] p-6 rounded-[1.9rem]" src="https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/33/1656654204-bpfull.jpg"></img>
											<div className="mt-[1rem]">
												<h3>Robert Fox</h3>
												<div className="flex text-yellow-400 text-[1.2rem] !mb-2 !mt-[-0.75rem]">
													<span>⭐</span>
													<span>⭐</span>
													<span>⭐</span>
													<span>⭐</span>
													<span className="text-gray-300">⭐</span>
												</div>
												<i className="font-bold text-[#6F7F9C]">The best cooking course ever!</i>
												<p className="text-[#6F7F92] mt-[1.2rem]">It was a fantastic course with lots of hands on training and fun! Absolutely recommended to all food lovers !</p>
											</div>
										</div>
									</div>
								</>
							)}
						</div>

					</div>

					{/* Phần bên phải */}
					<div className="bg-white relative left-[-5.5rem] top-[-14.75rem] h-[41.5rem] 2xl:w-[24rem]">
						<img className="object-cover !transition-transform !duration-500 !transform !origin-center !ease-out !hover:scale-110 " src="https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/2020/11/1-500x300.jpg"></img>
						<div className="bg-[#EAEFF8] h-[7.5rem]">
							<div className="  ">
								<p className="bg-[#E3F5F1] flex relative top-[1.75rem] p-6 w-[21rem] right-[-1.5rem] border-l-[3px] border-[#00C792] text-[#00C792]">
									<svg xmlns="http://www.w3.org/2000/svg" className="mt-[0.2rem] mr-1" fill="currentColor" version="1.1" id="mdi-checkbox-marked-circle-outline" width="18" height="18" viewBox="0 0 24 24"><path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" /></svg>
									Passed
								</p>
							</div>
						</div>
						<div className="p-[2rem]">
							<h4 className="font-bold">The Course Includes:</h4>
							<p className="mt-7 text-[#6F7F92] flex"><svg xmlns="http://www.w3.org/2000/svg" className="mr-3 text-[#2F65B9]" fill="currentColor" version="1.1" id="mdi-book-open-page-variant-outline" width="24" height="24" viewBox="0 0 24 24"><path d="M19 1L14 6V17L19 12.5V1M21 5V18.5C19.9 18.15 18.7 18 17.5 18C15.8 18 13.35 18.65 12 19.5V6C10.55 4.9 8.45 4.5 6.5 4.5C4.55 4.5 2.45 4.9 1 6V20.65C1 20.9 1.25 21.15 1.5 21.15C1.6 21.15 1.65 21.1 1.75 21.1C3.1 20.45 5.05 20 6.5 20C8.45 20 10.55 20.4 12 21.5C13.35 20.65 15.8 20 17.5 20C19.15 20 20.85 20.3 22.25 21.05C22.35 21.1 22.4 21.1 22.5 21.1C22.75 21.1 23 20.85 23 20.6V6C22.4 5.55 21.75 5.25 21 5M10 18.41C8.75 18.09 7.5 18 6.5 18C5.44 18 4.18 18.19 3 18.5V7.13C3.91 6.73 5.14 6.5 6.5 6.5C7.86 6.5 9.09 6.73 10 7.13V18.41Z" /></svg>2 Detailed Lessons</p>
							<p className="text-[#6F7F92] flex"><svg xmlns="http://www.w3.org/2000/svg" className="mr-3 text-[#2F65B9]" fill="currentColor" width="24" height="24" viewBox="0 0 576 512"><path d="M519.442 288.651c-41.519 0-59.5 31.593-82.058 31.593C377.409 320.244 432 144 432 144s-196.288 80-196.288-3.297c0-35.827 36.288-46.25 36.288-85.985C272 19.216 243.885 0 210.539 0c-34.654 0-66.366 18.891-66.366 56.346 0 41.364 31.711 59.277 31.711 81.75C175.885 207.719 0 166.758 0 166.758v333.237s178.635 41.047 178.635-28.662c0-22.473-40-40.107-40-81.471 0-37.456 29.25-56.346 63.577-56.346 33.673 0 61.788 19.216 61.788 54.717 0 39.735-36.288 50.158-36.288 85.985 0 60.803 129.675 25.73 181.23 25.73 0 0-34.725-120.101 25.827-120.101 35.962 0 46.423 36.152 86.308 36.152C556.712 416 576 387.99 576 354.443c0-34.199-18.962-65.792-56.558-65.792z" /></svg>Quizzes after 1</p>
							<p className="text-[#6F7F92] flex"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-3 text-[#2F65B9] bi bi-calendar-week-fill" viewBox="0 0 16 16">  <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zM9.5 7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm3 0h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zM2 10.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" /></svg>15 weeks Of The Entire Course</p>
							<p className="text-[#6F7F92] flex"><svg xmlns="http://www.w3.org/2000/svg" className="mr-3 text-[#2F65B9]" fill="currentColor" width="24" height="24" viewBox="0 0 448 512"><path d="M319.4 320.6L224 416l-95.4-95.4C57.1 323.7 0 382.2 0 454.4v9.6c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-9.6c0-72.2-57.1-130.7-128.6-133.8zM13.6 79.8l6.4 1.5v58.4c-7 4.2-12 11.5-12 20.3 0 8.4 4.6 15.4 11.1 19.7L3.5 242c-1.7 6.9 2.1 14 7.6 14h41.8c5.5 0 9.3-7.1 7.6-14l-15.6-62.3C51.4 175.4 56 168.4 56 160c0-8.8-5-16.1-12-20.3V87.1l66 15.9c-8.6 17.2-14 36.4-14 57 0 70.7 57.3 128 128 128s128-57.3 128-128c0-20.6-5.3-39.8-14-57l96.3-23.2c18.2-4.4 18.2-27.1 0-31.5l-190.4-46c-13-3.1-26.7-3.1-39.7 0L13.6 48.2c-18.1 4.4-18.1 27.2 0 31.6z" /></svg>26 Students participated</p>
							<p className="text-[#6F7F92] flex"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="mr-3 text-[#2F65B9]" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>Assessments Yes</p>
						</div>
					</div>
				</div>

			</div >
		</>
	);
};
export default ProjectDetailsModal;
