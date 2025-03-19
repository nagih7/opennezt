import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSocket } from "context/SocketContext";
import { getChatList } from "api/chat";
import { getNotifications } from "api/notification";
import { message } from "antd";

export const RealtimeContext = React.createContext();

export const RealtimeProvider = ({ children }) => {
	const dispatch = useDispatch();
	const socket = useSocket();

	// Handle new websocket events
	const handleSocketEvents = () => {
		// Handle new notification
		const handleNewNotification = (notification) => {
			message.success({
				content: (
					<span>
						<strong>{notification.metadata.source_name}</strong>{" "}
						{notification.type === "project_invitation"
							? "invited you to join the "
							: "sent you a friend request"}
						<strong>
							{notification.type === "project_invitation"
								? notification.metadata.project_name
								: ""}
						</strong>
					</span>
				),
				duration: 10,
			});
			dispatch(getNotifications());
		};

		// NEW PROJECT INVITATION
		socket.on("new_notification", handleNewNotification);

		// CONFIRM ADD FRIEND
		socket.on("confirm_add_friend", (name) => {
			message.success({
				content: (
					<span>
						<strong>{name}</strong> accepted your friend request
					</span>
				),
				duration: 10,
			});
			dispatch(getChatList());
		});

		// CONFIRM PROJECT INVITATION
		socket.on("confirm_project_invitation", (name) => {
			message.success({
				content: (
					<span>
						<strong>{name}</strong> accepted your project invitation
					</span>
				),
				duration: 10,
			});
			dispatch(getChatList());
		});
	};

	useEffect(() => {
		if (!socket) return;

		// Handle new websocket events
		handleSocketEvents();

		// Clean up
		return () => {
			socket.off("new_notification");
			socket.off("confirm_add_friend");
			socket.off("confirm_project_invitation");
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket, dispatch]);

	return <RealtimeContext.Provider>{children}</RealtimeContext.Provider>;
};
