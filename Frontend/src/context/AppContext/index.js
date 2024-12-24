import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "context/SocketContext";
import { useNavigate } from "react-router-dom";
import { getChatList } from "api/chat";
import { getNotifications } from "api/notification";
import { setLocation } from "states/modules/app";
import { getProjects } from "api/project";
import { getFounderProfile } from "api/founder";
import { checkSteps } from "api/home";
import { message } from "antd";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
	const dispatch = useDispatch();
	const socket = useSocket();
	const navigate = useNavigate();

	const { isAuthSuccess } = useSelector((state) => state.auth);
	const location = useSelector((state) => state.app.location);

	useEffect(() => {
		if (!isAuthSuccess) {
			navigate("/login");
		} else {
			const token = localStorage.getItem("token");
			socket.emit("login", token);
		}
	}, [isAuthSuccess, navigate, socket]);

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

	useEffect(() => {
		if (location.pathName !== location.prevPathName) {
			dispatch(
				setLocation({
					pathName: location.pathName,
					payload: location.payload,
					prevPathName: location.pathName,
				})
			);
			navigate(location.pathName);
		}
	}, [location, navigate, dispatch]);

	useEffect(() => {
		dispatch(getChatList());
		dispatch(getNotifications());
		dispatch(checkSteps());
		dispatch(getProjects());
		dispatch(getFounderProfile());
	}, [dispatch]);

	return <AppContext.Provider>{children}</AppContext.Provider>;
};
