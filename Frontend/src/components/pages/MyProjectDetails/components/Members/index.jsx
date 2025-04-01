import React, { useEffect, useState } from "react";
import ProjectActivity from "../ProjectActivity";
import img_logo_project from "../../../../../assets/images/background/1656677876-bpthumb.jpg";
import { IconlyCalendar, IconlyEditSquare, IconlyLocation, IconlyMessage, IconlySearch, IconlyWork } from "components/UI/Iconly";
import ProjectMenu from "../ProjectMenu";
import { Image } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyProjectDetails } from "api/project";
import { CheckCircleFilled } from "@ant-design/icons";
import { Tabs } from '@chakra-ui/react';
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
	const friendsData = [
		{
			id: 1,
			name: "Marvin McKinney",
			location: "United State",
			lastActive: "an hour ago",
			status: "settings",
			avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/29/1742357406-bpfull.jpg",
		},
		{
			id: 2,
			name: "Jenny Wilson",
			location: "New Mexico, US",
			lastActive: "a day ago",
			status: "pending",
			avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/29/1742357406-bpfull.jpg",
		},
		{
			id: 3,
			name: "Jerome Bell",
			location: "San Jose",
			lastActive: "2 days ago",
			status: "friend",
			avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/29/1742357406-bpfull.jpg",
		},
		{
			id: 4,
			name: "Sophia Carter",
			location: "Los Angeles, CA",
			lastActive: "3 days ago",
			status: "not_friend",
			avatar: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/29/1742357406-bpfull.jpg",
		},
	];
	const [friends, setFriends] = useState(friendsData);

	const handleAction = (id, action) => {
		setFriends((prevFriends) =>
			prevFriends.map((friend) =>
				friend.id === id ? { ...friend, status: action } : friend
			)
		);
	};
	return (
		<div className="w-full h-full">
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
						<div className="mt-8">
							<Tabs.Root className="h-4" defaultValue="All Members">
								<div className="2xl:w-full w-full">
									<Tabs.List>
										<div className="flex justify-between bg-white  p-4 font-bold w-full">
											<div className='flex'>
												<Tabs.Trigger className="text-black" value="All Members">
													All Members
												</Tabs.Trigger>
												<Tabs.Trigger className="text-black" value="My Friends">
													My Friends
												</Tabs.Trigger>
											</div>

											<div className="flex items-center space-x-2 2xl:ml-[31.5rem] ">
												<span className="text-black ">Show By:</span>
												<select className="text-sm font-medium text-gray-600 bg-transparent outline-none border border-[#F3F3F3] w-[10rem] h-[2rem] rounded-sm">
													<option value="Last Active">Last Active</option>
													<option value="Newest Registered">Newest Registered</option>
													<option value="Alphabetical">Alphabetical</option>
												</select>
											</div>
										</div>
									</Tabs.List>
									<div className=" bg-white ">
										<Tabs.Content value="All Members">
											<div className=" mx-auto p-4">

												{friends.map((friend) => (
													<div
														key={friend.id}
														className="flex items-center justify-between bg-[#F8F9FA] p-4 mb-2 rounded-lg "
													>
														<div className="flex items-center gap-4">
															<img
																src={friend.avatar}
																alt={friend.name}
																className="w-20 h-20 rounded-full"
															/>
															<div>
																<h3 className="font-semibold">{friend.name}</h3>
																<div className="flex">
																	<p className="text-sm text-gray-500 flex"><IconlyLocation size={20} color={"#9BA8B1"} />{friend.location}  </p>
																	<p className="text-sm text-gray-500 flex ml-4"><IconlyCalendar size={20} color={"#9BA8B1"} />  {friend.lastActive}</p>
																</div>
															</div>
														</div>
														{friend.status === "settings" && (
															<div className="flex">
																<button className="bg-blue-500 text-white px-2 py-1 rounded mr-4 font-bold">
																	Profile Settings
																</button>
																<button><IconlyMessage size={20} color={"#9BA8B1"} /></button>

															</div>
														)}
														{friend.status === "pending" && (
															<div className="flex">
																<button
																	className="bg-red-500 text-white px-2 py-1 rounded mr-4 font-bold"
																	onClick={() => handleAction(friend.id, "cancelled")}
																>
																	Cancel Request
																</button>
																<button><IconlyMessage size={20} color={"#9BA8B1"} /></button>
															</div>
														)}
														{friend.status === "friend" && (
															<div className="flex">
																<button
																	className="bg-orange-500 text-white px-2 py-1 rounded mr-4 font-bold"
																	onClick={() => handleAction(friend.id, "unfriended")}
																>
																	Unfriend
																</button>
																<button><IconlyMessage size={20} color={"#9BA8B1"} /></button>
															</div>
														)}
														{friend.status === "not_friend" && (
															<div className="flex">
																<button
																	className="bg-green-500 text-white px-2 py-1 rounded mr-4 font-bold"
																	onClick={() => handleAction(friend.id, "pending")}
																>
																	Add Friend
																</button>
																<button><IconlyMessage size={20} color={"#9BA8B1"} /></button>
															</div>
														)}
													</div>
												))}
											</div>
										</Tabs.Content>

										<Tabs.Content value="My Friends">
											<>
												<div className="mx-auto p-4">
													{friends
														.filter((friend) => friend.status === "friend")
														.map((friend) => (
															<div
																key={friend.id}
																className="flex items-center justify-between bg-[#F8F9FA] p-4 mb-2 rounded-lg"
															>
																<div className="flex items-center gap-4">
																	<img
																		src={friend.avatar}
																		alt={friend.name}
																		className="w-20 h-20 rounded-full"
																	/>
																	<div>
																		<h3 className="font-semibold">{friend.name}</h3>
																		<div className="flex">
																			<p className="text-sm text-gray-500 flex">
																				<IconlyLocation size={20} color={"#9BA8B1"} />
																				{friend.location}
																			</p>
																			<p className="text-sm text-gray-500 flex ml-4">
																				<IconlyCalendar size={20} color={"#9BA8B1"} />
																				{friend.lastActive}
																			</p>
																		</div>
																	</div>
																</div>
																<div className="flex">
																	<button
																		className="bg-orange-500 text-white px-2 py-1 rounded mr-4 font-bold"
																		onClick={() => handleAction(friend.id, "unfriended")}
																	>
																		Unfriend
																	</button>
																	<button><IconlyMessage size={20} color={"#9BA8B1"} /></button>
																</div>
															</div>
														))}
												</div>
											</>
										</Tabs.Content>

									</div>
								</div>
							</Tabs.Root>
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
