import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import FolderIcon from "@mui/icons-material/Folder";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PageviewIcon from "@mui/icons-material/Pageview";
import FolderSharedIcon from "@mui/icons-material/FolderShared";

const manageRouteMap = [
	{
		label: "Admin",
		name: "Admin",
		icon: <AdminPanelSettingsIcon className="material-icons" />,
		path: "/admin/manage",
		routeActive: ["/admin/manage"],
		permissions: ["manage_page"],
	},
	{
		label: "Dashboard",
		name: "Dashboard",
		icon: <DashboardIcon className="material-icons" />,
		path: "/",
		routeActive: ["/"],
		permissions: [""],
	},

	{
		label: "About Me",
		icon: <PersonIcon className="material-icons" />,
		path: "/about",
		routeActive: ["/about"],
		permissions: ["about_page"],
	},
	{
		label: "Project",
		icon: <FolderIcon className="material-icons" />,
		path: "/project",
		routeActive: ["/project"],
		permissions: ["project_page"],
	},
	{
		label: "Recruit Talents",
		icon: <PersonSearchIcon className="material-icons" />,
		path: "/recruit-talents",
		routeActive: ["/recruit-talents"],
		permissions: ["recruit_talents_page"],
	},
	{
		label: "Seek Projects",
		icon: <PageviewIcon className="material-icons" />,
		path: "/seek-projects",
		routeActive: ["/seek-projects"],
		permissions: ["seek_projects_page"],
	},
	{
		label: "Notifications",
		icon: <FolderSharedIcon className="material-icons" />,
		path: "/notification-management",
		routeActive: ["/notification-management"],
		permissions: ["notification_management_page"],
	},
];

export default manageRouteMap;
