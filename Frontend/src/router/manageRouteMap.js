import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import FolderIcon from "@mui/icons-material/Folder";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PageviewIcon from "@mui/icons-material/Pageview";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import { NAVBAR_LABEL } from "utils/constains";
import {
	IconlyActivity,
	IconlyAddUser,
	IconlyFolder,
	IconlyGraph,
	IconlyNotification,
	IconlyProfile,
	IconlyWork,
} from "components/UI/Iconly";

const manageRouteMap = [
	{
		label: NAVBAR_LABEL.ACTIVITY,
		icon: <IconlyActivity size={24} />,
		path: "/activity",
		routeActive: ["/activity"],
		permissions: ["activity_page"],
	},
	{
		label: NAVBAR_LABEL.ADMIN,
		icon: <IconlyGraph size={24} />,
		path: "/admin/manage",
		routeActive: ["/admin/manage"],
		permissions: ["manage_page"],
	},
	// {
	// 	label: NAVBAR_LABEL.DASHBOARD,
	// 	icon: <DashboardIcon className="material-icons" />,
	// 	path: "/",
	// 	routeActive: ["/"],
	// 	permissions: [""],
	// },
	{
		label: NAVBAR_LABEL.ABOUT_ME,
		icon: <IconlyProfile size={24} />,
		path: "/about",
		routeActive: ["/about"],
		permissions: ["about_page"],
	},
	{
		label: NAVBAR_LABEL.PROJECT,
		icon: <IconlyFolder size={24} />,
		path: "/project",
		routeActive: ["/project"],
		permissions: ["project_page"],
	},
	{
		label: NAVBAR_LABEL.RECRUIT_TALENTS,
		icon: <IconlyAddUser size={24} />,
		path: "/recruit-talents",
		routeActive: ["/recruit-talents"],
		permissions: ["recruit_talents_page"],
	},
	{
		label: NAVBAR_LABEL.SEEK_PROJECTS,
		icon: <IconlyWork size={24} />,
		path: "/seek-projects",
		routeActive: ["/seek-projects"],
		permissions: ["seek_projects_page"],
	},
	{
		label: NAVBAR_LABEL.NOTIFICATIONS,
		icon: <IconlyNotification size={24} />,
		path: "/notification-management",
		routeActive: ["/notification-management"],
		permissions: ["notification_management_page"],
	},
];

export default manageRouteMap;
