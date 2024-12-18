import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "context/SocketContext";
import { useNavigate } from "react-router-dom";
import { getChatList } from "api/chat";
import { getNotifications } from "api/notification";
import { setLocation } from "states/modules/app";

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
			let token = localStorage.getItem("token");
			socket.emit("login", token);
		}
	}, [isAuthSuccess, navigate, socket]);

	useEffect(() => {
		socket.on("new_notification", () => {
			dispatch(getNotifications());
		});
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
	}, [dispatch]);

	return <AppContext.Provider>{children}</AppContext.Provider>;
};
