import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getChatList } from "api/chat";
import { getNotifications } from "api/notification";
import { getProjects, seekProjects } from "api/project";
import { getFounderProfile } from "api/founder";
import { checkSteps } from "api/home";
import { recruitTalents } from "api/talent";
import { getAuthRole } from "api/auth";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAuthRole());
		dispatch(getChatList());
		dispatch(getNotifications());
		dispatch(checkSteps());
		dispatch(getProjects());
		dispatch(getFounderProfile());
		dispatch(
			recruitTalents({
				keyword: "",
				sector: "",
				experience_level: "",
				education_level: "",
				commitment: "",
				location: "",
				language: "",
				page: 0,
			})
		);
		dispatch(
			seekProjects({
				industry: "",
				stage: "",
				name: "",
				page: 0,
			})
		);
	}, [dispatch]);

	return <AppContext.Provider>{children}</AppContext.Provider>;
};
