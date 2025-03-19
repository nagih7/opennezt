import React from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import moment from "moment";
import { Button, Tag } from "antd";
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";
import store from "states/configureStore";
import { replyNotification, getNotifications } from "api/notification";
import { useNavigate } from "react-router-dom";
import { getChatList } from "api/chat";
import { NOTIFICATIONS, ACTIONS, STATUS } from "utils/constains/appConstains";

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
		<div className={styles.modalNotificationWrap}>
			<div className={styles.headerWrap}>
				{NOTIFICATIONS.NOTIFICATIONS[language]}
			</div>
			<div className={styles.mainModalInfoWrap}>
				<ul className={styles.menuInfoWrap}>
					{notifications &&
						notifications.length > 0 &&
						notifications.map((notification, index) => (
							<li className={styles.itemInfoWrap} key={index}>
								<div className={styles.notificationContent}>
									<div className={styles.iconWrap}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 12 12"
											width="12"
											height="12">
											<path
												fill="currentColor"
												d="M1.5 2.625A.376.376 0 0 0 1.125 3v.518l4.043 3.319a1.312 1.312 0 0 0 1.666 0l4.041-3.319V3a.376.376 0 0 0-.375-.375h-9zm-.375 2.348V9c0 .206.169.375.375.375h9A.376.376 0 0 0 10.875 9V4.973L7.547 7.706c-.9.738-2.196.738-3.094 0L1.125 4.973zM0 3c0-.827.673-1.5 1.5-1.5h9c.827 0 1.5.673 1.5 1.5v6c0 .827-.673 1.5-1.5 1.5h-9C.673 10.5 0 9.827 0 9V3z"
											/>
										</svg>
									</div>
									<div className={styles.contentWrap}>
										{notification.type_name ===
											"Project Invitation" && (
											<div>
												<b>{notification.source_name}</b>{" "}
												{
													NOTIFICATIONS.INVITED_YOU_TO_JOIN_THE[
														language
													]
												}{" "}
												<b>{notification.metadata.project_name}</b>{" "}
												{NOTIFICATIONS.PROJECT[language]}
											</div>
										)}
										{notification.type_name === "Friend Request" && (
											<div>
												<b>{notification.source_name}</b>{" "}
												{
													NOTIFICATIONS.SENT_YOU_A_FRIEND_REQUEST[
														language
													]
												}
											</div>
										)}
										<span className={styles.date}>
											{moment(notification.created_at).fromNow()}
										</span>
									</div>
								</div>
								{notification.metadata.status === "waiting" ? (
									<div className={styles.actionsWrap}>
										<Button
											// loading={loadingGetNotifications}
											type="primary"
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
											type="default"
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
									</div>
								) : notification.metadata.status === "accepted" ? (
									<div className={styles.actionsWrap}>
										<Tag color="green">
											{STATUS.ACCEPTED[language]}
										</Tag>
									</div>
								) : (
									<div className={styles.actionsWrap}>
										<Tag color="red">{STATUS.REJECTED[language]}</Tag>
									</div>
								)}
							</li>
						))}
				</ul>
			</div>
			<div
				className={styles.footerWrap}
				onClick={() => handleNavigateToNotification()}>
				{NOTIFICATIONS.VIEW_ALL_NOTIFICATIONS[language]}
			</div>
		</div>
	);
}

export default PopoverNotification;
