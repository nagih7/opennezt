import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Tag } from "antd";
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";
import store from "states/configureStore";
import { replyNotification, getNotifications } from "api/notification";
import { useNavigate } from "react-router-dom";
import { getChatList } from "api/chat";
import { NOTIFICATIONS, ACTIONS, STATUS } from "utils/constants/appConstants";
import { Avatar, Button, Stack, Text } from "@chakra-ui/react";

function PopoverNotification() {
	const { notifications, loadingReplyNotification } = useSelector(
		(state) => state.notification
	);
	const { language } = useSelector((state) => state.app);
	const navigate = useNavigate();

	const handleReplyNotification = async (notification_id, type_id, status) => {
		await store.dispatch(
			replyNotification({ notification_id, type_id, status })
		);
		if (!loadingReplyNotification) {
			await store.dispatch(getNotifications());

			// DISPATCH ACTIONS BASED ON NOTIFICATION TYPE
			switch (type_name) {
				case "Project Invitation":
					store.dispatch(getChatList());
					break;
				case "Friend Request":
					store.dispatch(getChatList());
					break;
				default:
					break;
			}
		}
	};
	const handleNavigateToNotification = () => {
		navigate("/notification-management");
	};

	return (
		<Stack spacing={4}>
			<Text>{NOTIFICATIONS.NOTIFICATIONS[language]}</Text>
			<Stack spacing={4}>
				<Stack spacing={2}>
					{notifications &&
						notifications.length > 0 &&
						notifications.map((notification, index) => (
							<Stack key={index}>
								<Stack direction="row" spacing={4}>
									<Avatar.Root size={"md"}>
										<Avatar.Fallback name={notification.user?.name} />
										<Avatar.Image src={notification.user.avatar} />
									</Avatar.Root>
									<Stack spacing={2}>
										{(() => {
											switch (notification.type?.name) {
												case "project_invitation":
													return (
														<>
															<b>{notification.user?.name}</b>{" "}
															{
																NOTIFICATIONS
																	.INVITED_YOU_TO_JOIN_THE[
																	language
																]
															}{" "}
															<b>
																{
																	notification.metadata
																		.project_name
																}
															</b>{" "}
															{NOTIFICATIONS.PROJECT[language]}
														</>
													);
												case "friend_request":
													return (
														<div>
															<b>{notification.user?.name}</b>{" "}
															{
																NOTIFICATIONS
																	.SENT_YOU_A_FRIEND_REQUEST[
																	language
																]
															}
														</div>
													);
												default:
													return (
														<div>
															{notification.message ||
																"New notification"}
														</div>
													);
											}
										})()}
										<span>
											{moment(notification.timestamp).fromNow()}
										</span>
									</Stack>
								</Stack>
								{notification.metadata.status === "waiting" && (
									<Stack direction="row" spacing={4}>
										<Button
											colorPalette="blue"
											icon={<CheckOutlined />}
											onClick={() =>
												handleReplyNotification(
													notification._id,
													notification.type_id,
													"accepted"
												)
											}>
											{ACTIONS.ACCEPT[language]}
										</Button>
										<Button
											colorPalette="gray"
											danger
											icon={<CloseOutlined />}
											onClick={() =>
												handleReplyNotification(
													notification._id,
													notification.type_id,
													"rejected"
												)
											}>
											{ACTIONS.REJECT[language]}
										</Button>
									</Stack>
								)}
							</Stack>
						))}
				</Stack>
			</Stack>
			<Text
				className="cursor-pointer"
				onClick={() => handleNavigateToNotification()}>
				{NOTIFICATIONS.VIEW_ALL_NOTIFICATIONS[language]}
			</Text>
		</Stack>
	);
}

export default PopoverNotification;
