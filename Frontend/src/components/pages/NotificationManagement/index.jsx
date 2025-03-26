import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Tag, Button, Modal, Row, Col } from "antd";
import TableCustom from "components/UI/Table";
import { CheckOutlined, CloseOutlined, EyeInvisibleOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import store from "states/configureStore";
import { getTalentDetails } from "api/talent";
import moment from "moment";
import {
	getNotifications,
	getTotalFriends,
	readRoot,
	replyNotification,
} from "api/notification";
import {
	FRIENDS,
	ACTIONS,
	STATUS,
	TYPE,
	REQUEST_BY,
	REQUEST_AT,
} from "utils/constains";
import { Tabs } from "@chakra-ui/react"
import RightSidebar from "components/common/RightSidebar";


function NotificationProject() {
	const [openModalTalentDetails, setOpenModalTalentDetails] = useState(false);
	const { language } = useSelector((state) => state.app);
	const [dataFilter, setDataFilter] = useState({
		page: 1,
		perPage: 10,
		order: null,
	});
	const { talentDetails, isLoadingGetTalentDetails } = useSelector(
		(state) => state.talent
	);
	// const { notifications, totalFriends, paginationListNotification } =
	// 	useSelector((state) => state.notification);

	useEffect(() => {
		store.dispatch(readRoot(dataFilter));
		store.dispatch(getTotalFriends());
	}, [dataFilter]);

	const handleOpenTalentDetails = async (user_id) => {
		setOpenModalTalentDetails(true);
		await store.dispatch(getTalentDetails(user_id));
	};

	const handleReplyNotification = async (notification_id, type_id, status) => {
		await store.dispatch(
			replyNotification({ notification_id, type_id, status })
		);
		await store.dispatch(getNotifications());
		if (status === "accepted") {
			await store.dispatch(getChatList());
		}
	};



	const changeCurrentPage = (page) => {
		setDataFilter({ ...dataFilter, page: page });
	};

	const onChange = (pagination, filters, sorter) => {
		if (sorter.order && sorter.field) {
			setDataFilter({
				...dataFilter,
				order: sorter.order === "descend" ? -1 : 1,
				column: sorter.field,
			});
		} else {
			setDataFilter({ ...dataFilter, order: null, column: null });
		}
	};
	// new code
	const notifications = [
		{ id: 1, name: "Jerome Bell", message: "accepted your friendship request", time: "14 hours, 48 minutes ago" },
		{ id: 2, name: "Aaron Jones", message: "liked your post", time: "5 days, 15 hours ago" },
		{ id: 3, name: "Jenny Wilson", message: "commented on your photo", time: "5 days, 15 hours ago" },
		{ id: 4, name: "Aaron Jones", message: "sent you a friend request", time: "1 week ago" },
		{ id: 5, name: "Jenny Wilson", message: "shared your post", time: "1 week ago" },
		{ id: 6, name: "Curtis Campher", message: "mentioned you in a comment", time: "2 weeks ago" },
		{ id: 7, name: "Jenny Wilson", message: "tagged you in a photo", time: "2 weeks, 4 days ago" },
		{ id: 8, name: "Felix Deo", message: "reacted to your story", time: "2 weeks, 6 days ago" },
		{ id: 9, name: "Jenny Wilson", message: "sent you a message", time: "3 weeks ago" },
		{ id: 10, name: "Jerome Bell", message: "joined your group", time: "3 weeks, 4 days ago" },
	];
	const [unreadNotifications, setUnreadNotifications] = useState([]);
	const [readNotifications, setReadNotifications] = useState(notifications);
	const [data, setData] = useState(notifications);
	const [selected, setSelected] = useState([]);
	const toggleSelectAll = (e) => {
		if (e.target.checked) {
			setSelected(data.map((notification) => notification.id));
		} else {
			setSelected([]);
		}
	};
	//Read
	const markAsUnread = (id) => {
		const notificationToMove = readNotifications.find((n) => n.id === id);

		if (notificationToMove) {
			setUnreadNotifications([...unreadNotifications, notificationToMove]);
			setReadNotifications(readNotifications.filter((n) => n.id !== id));
		}
	};
	//Unread
	const markAsRead = (id) => {
		const notificationToMove = unreadNotifications.find((n) => n.id === id);

		if (notificationToMove) {
			setReadNotifications([...readNotifications, notificationToMove]);
			setUnreadNotifications(unreadNotifications.filter((n) => n.id !== id));
		}
	};
	const toggleSelect = (id) => {
		setSelected((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
		);
	};
	// Read
	const deleteNotification = (id) => {
		setData(data.filter((notification) => notification.id !== id));
	};
	//Unread
	const deleteUnreadnotification = (id) => {
		setUnreadNotifications(unreadNotifications.filter((unreadnotification) => unreadnotification.id !== id));
	};
	return (
		<>
			<div className="flex gap-8 mt-[1rem]">
				<Tabs.Root className="h-4" defaultValue="Unread">
					<div className="w-[60.25rem] 2xl:ml-6">
						<Tabs.List>
							<div className="bg-white  p-4 font-bold flex w-[43rem] 2xl:w-[61rem]">
								<Tabs.Trigger className="text-black" value="Unread">
									Unread
								</Tabs.Trigger>
								<Tabs.Trigger className="text-black" value="Read">
									Read
								</Tabs.Trigger>

								<div className="flex items-center space-x-2 2xl:ml-[31.5rem] ">
									<span className=" text-black">Order By:</span>
									<select
										className="text-sm font-medium text-gray-600 bg-transparent outline-none border border-[#F3F3F3] w-[10rem] h-[2rem] rounded-sm"

									>

										<option value="Newest First">Newest First</option>
										<option value="Oldest First">Oldest First</option>
									</select>
								</div>
							</div>
						</Tabs.List>
						<div className="mt-[2.5rem] bg-white ">
							<Tabs.Content value="Unread">
								<div className="p-4">
									{unreadNotifications.length === 0 ? (
										<div className="bg-[#E3F1F6] p-3 border-l-2 border-[#0098CB] text-[#1599CC]">
											You have no unread notifications.
										</div>
									) : (
										<div className="w-full max-w-4xl mx-auto border rounded-lg  overflow-hidden">
											<table className="w-full border-collapse">
												<thead>
													<tr className="bg-[#2F65B9] text-white">
														<th className="p-3 text-left">  <input
															type="checkbox"
															onChange={toggleSelectAll}
															checked={selected.length === data.length && data.length > 0}
															indeterminate={selected.length > 0 && selected.length < data.length}
														/></th>
														<th className="p-3 text-left">Notification</th>
														<th className="p-3 text-left">Date Received</th>
														<th className="p-3 text-center">Actions</th>
													</tr>
												</thead>
												<tbody>
													{unreadNotifications.map((notification) => (
														<tr key={notification.id} className="border-b hover:bg-gray-100">
															<td className="p-3"> <input
																type="checkbox"
																checked={selected.includes(notification.id)}
																onChange={() => toggleSelect(notification.id)}
															/></td>
															<td className="p-3">{notification.name} {notification.message}</td>
															<td className="p-3">{notification.time}</td>
															<td className="p-3 flex justify-center gap-2">
																<button onClick={() => markAsRead(notification.id)} className="p-2 bg-gray-200 rounded hover:bg-gray-300 h-[2.25rem] w-[2.25rem]">
																	<EyeOutlined className="text-gray-600 " />
																</button>
																<button className="p-2 bg-red-100 rounded hover:bg-red-200 h-[2.25rem] w-[2.25rem]" onClick={() => deleteUnreadnotification(notification.id)}>
																	<DeleteOutlined className="text-red-600" />
																</button>
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									)}
								</div>
							</Tabs.Content>

							<Tabs.Content value="Read">
								<>
									<div className="p-4">
										{readNotifications.length === 0 ? (
											<div className="bg-[#E3F1F6] p-3 border-l-2 border-[#0098CB] text-[#1599CC]">
												You have no read notifications.
											</div>
										) : (
											<>
												<div className="w-full max-w-4xl mx-auto border rounded-lg  overflow-hidden">
													<table className="w-full border-collapse">
														<thead>
															<tr className="bg-[#2F65B9] text-white">
																<th className="p-3 text-left">  <input
																	type="checkbox"
																	onChange={toggleSelectAll}
																	checked={selected.length === data.length && data.length > 0}
																	indeterminate={selected.length > 0 && selected.length < data.length}
																/></th>
																<th className="p-3 text-left">Notification</th>
																<th className="p-3 text-left">Date Received</th>
																<th className="p-3 text-center">Actions</th>
															</tr>
														</thead>
														<tbody>
															{readNotifications.map((notification) => (
																<tr key={notification.id} className="border-b hover:bg-gray-100">
																	<td className="p-3"> <input
																		type="checkbox"
																		checked={selected.includes(notification.id)}
																		onChange={() => toggleSelect(notification.id)}
																	/></td>
																	<td className="p-3">{notification.name} {notification.message}</td>
																	<td className="p-3">{notification.time}</td>
																	<td className="p-3 flex justify-center gap-2">
																		<button onClick={() => markAsUnread(notification.id)} className="p-2 bg-gray-200 rounded hover:bg-gray-300 h-[2.25rem] w-[2.25rem]">
																			<EyeInvisibleOutlined className="text-gray-600 " />
																		</button>
																		<button className="p-2 bg-red-100 rounded hover:bg-red-200 h-[2.25rem] w-[2.25rem]" onClick={() => deleteNotification(notification.id)}>
																			<DeleteOutlined className="text-red-600" />
																		</button>
																	</td>
																</tr>
															))}
														</tbody>
													</table>

												</div>
												<div className="flex justify-between mt-3">
													<select className="bg-[#F8F9FA] text-[#6F7F92] h-[3.25rem] border-[#F6F6F6] border-1 rounded-[0.4rem] ml-3">
														<option value="Bulk Actions">Bulk Actions</option>
														<option value="Mark Unread">Mark Unread</option>
														<option value="Delete">Delete</option>
													</select>
													<button className="bg-[#2F65B9] text-white w-[6rem] h-[3rem] rounded-[0.4rem] mr-3">Apply</button>
												</div>
											</>
										)}

									</div>
								</>
							</Tabs.Content>
						</div>
					</div>
				</Tabs.Root>

				<RightSidebar />

			</div>
		</>

	);
}

export default NotificationProject;
