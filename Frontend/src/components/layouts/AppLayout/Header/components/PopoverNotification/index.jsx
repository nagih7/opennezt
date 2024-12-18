import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import moment from "moment";
import { Button, Tag } from "antd";
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";
import store from "states/configureStore";
import { replyNotification, getNotifications } from "api/notification";
import { getChatList } from "api/chat";

function PopoverNotification() {
	const { notifications } = useSelector((state) => state.notification);

	useEffect(() => {
		store.dispatch(getNotifications());
	}, []);

	const handleReplyNotification = async (notification_id, type, status) => {
		await store.dispatch(
			replyNotification({ notification_id, type, status })
		);
		await store.dispatch(getNotifications());
		if (status === "accepted") {
			await store.dispatch(getChatList());
		}
	};

	return (
		<div className={styles.modalNotificationWrap}>
			<div className={styles.headerWrap}>Notifications</div>
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
										{notification.type === "friend_request" && (
											<div>
												<b>{notification.metadata.source_name}</b>{" "}
												{notification.message}
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
											type="primary"
											icon={<CheckOutlined />}
											onClick={() =>
												handleReplyNotification(
													notification._id,
													notification.type,
													"accepted"
												)
											}>
											Accept
										</Button>
										<Button
											type="default"
											danger
											icon={<CloseOutlined />}
											onClick={() =>
												handleReplyNotification(
													notification._id,
													notification.type,
													"rejected"
												)
											}>
											Reject
										</Button>
									</div>
								) : notification.metadata.status === "accepted" ? (
									<div className={styles.actionsWrap}>
										<Tag color="green">Accepted</Tag>
									</div>
								) : (
									<div className={styles.actionsWrap}>
										<Tag color="red">Rejected</Tag>
									</div>
								)}
							</li>
						))}
				</ul>
			</div>
			<div className={styles.footerWrap}>View all notification</div>
		</div>
	);
}

export default PopoverNotification;
