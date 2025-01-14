import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getChatList } from "api/chat";
import { getNotifications } from "api/notification";
import { getProjects } from "api/project";
import { getFounderProfile } from "api/founder";
import { checkSteps } from "api/home";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getChatList());
		dispatch(getNotifications());
		dispatch(checkSteps());
		dispatch(getProjects());
		dispatch(getFounderProfile());
	}, [dispatch]);

	return <AppContext.Provider>{children}</AppContext.Provider>;
};
