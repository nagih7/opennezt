import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import FolderIcon from "@mui/icons-material/Folder";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PageviewIcon from "@mui/icons-material/Pageview";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import { NAVBAR_LABEL } from "utils/constains";

const manageRouteMap = [
	{
		label: NAVBAR_LABEL.ADMIN,
		// name: "Admin",
		icon: <AdminPanelSettingsIcon className="material-icons" />,
		path: "/admin/manage",
		routeActive: ["/admin/manage"],
		permissions: ["manage_page"],
	},
	{
		label: NAVBAR_LABEL.DASHBOARD,
		name: "Dashboard",
		icon: <DashboardIcon className="material-icons" />,
		path: "/",
		routeActive: ["/"],
		permissions: [""],
	},
	{
		label: NAVBAR_LABEL.ABOUT_ME,
		icon: <PersonIcon className="material-icons" />,
		path: "/about",
		routeActive: ["/about"],
		permissions: ["about_page"],
	},
	{
		label: NAVBAR_LABEL.PROJECT,
		icon: <FolderIcon className="material-icons" />,
		path: "/project",
		routeActive: ["/project"],
		permissions: ["project_page"],
	},
	{
		label: NAVBAR_LABEL.RECRUIT_TALENTS,
		icon: <PersonSearchIcon className="material-icons" />,
		path: "/recruit-talents",
		routeActive: ["/recruit-talents"],
		permissions: ["recruit_talents_page"],
	},
	{
		label: NAVBAR_LABEL.SEEK_PROJECTS,
		icon: <PageviewIcon className="material-icons" />,
		path: "/seek-projects",
		routeActive: ["/seek-projects"],
		permissions: ["seek_projects_page"],
	},
	{
		label: NAVBAR_LABEL.NOTIFICATIONS,
		icon: <FolderSharedIcon className="material-icons" />,
		path: "/notification-management",
		routeActive: ["/notification-management"],
		permissions: ["notification_management_page"],
	},
];

export default manageRouteMap;
