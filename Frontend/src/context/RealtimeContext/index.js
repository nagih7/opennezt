import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSocket } from "context/SocketContext";
import { getChatList } from "api/chat";
import { getNotifications } from "api/notification";
import { getProjects } from "api/project";
import { message } from "antd";

export const RealtimeContext = React.createContext();

export const RealtimeProvider = ({ children }) => {
	const dispatch = useDispatch();
	const socket = useSocket();

	// NEW MESSAGE
	useEffect(() => {
		socket.on("new_notification", (notification) => {
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
		});
		return () => {
			socket.off("new_notification");
		};
	}, [socket, dispatch]);

	// CONFIRM ADD FRIEND
	useEffect(() => {
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
		return () => {
			socket.off("confirm_add_friend");
		};
	}, [socket, dispatch]);

	// CONFIRM PROJECT INVITATION
	useEffect(() => {
		socket.on("confirm_project_invitation", (name) => {
			message.success({
				content: (
					<span>
						<strong>{name}</strong> accepted your project invitation
					</span>
				),
				duration: 10,
			});
			dispatch(getProjects());
			dispatch(getChatList());
		});

		return () => {
			socket.off("confirm_project_invitation");
		};
	}, [socket, dispatch]);

	return <RealtimeContext.Provider>{children}</RealtimeContext.Provider>;
};
