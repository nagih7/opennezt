import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import PersonIcon from "@mui/icons-material/Person";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PageviewIcon from "@mui/icons-material/Pageview";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
const appRouteMap = [
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
	// {
	// 	label: "New Feed",
	// 	icon: <FeedIcon className="material-icons" />,
	// 	path: "/new-feed",
	// 	routeActive: ["/new-feed"],
	// 	permissions: ["newfeed_page"],
	// },

	// {
	// 	label: "Founder",
	// 	icon: <AccountCircleIcon className="material-icons" />,
	// 	path: "/founder",
	// 	routeActive: ["/founder"],
	// 	permissions: ["founder_page"],
	// },

	// {
	// 	label: "Explore",
	// 	icon: (
	// 		<CompassOutlined
	// 			style={{
	// 				fontSize: "20px",
	// 			}}
	// 		/>
	// 	),
	// 	path: "",
	// 	routeActive: ["/", "/news-feed", "/recruit-talents", "/find-mentors"],
	// 	permissions: [
	// 		"home_page",
	// 		"news_feed_page",
	// 		"recruit_talents_page",
	// 		"find_mentors_page",
	// 	],
	// 	children: [
	// 		{
	// 			label: "Home",
	// 			icon: (
	// 				<HomeOutlined
	// 					style={{
	// 						fontSize: "20px",
	// 					}}
	// 				/>
	// 			),
	// 			path: "/",
	// 			routeActive: ["/"],
	// 			permissions: ["home_page"],
	// 		},

	// {
	// 	label: "News Feed",
	// 	icon: (
	// 		<FundOutlined
	// 			style={{
	// 				fontSize: "20px",
	// 			}}
	// 		/>
	// 	),
	// 	path: "/news-feed",
	// 	routeActive: ["/news-feed"],
	// 	permissions: ["news_feed_page"],
	// },
	// {
	// 	label: "Recruit Talents",
	// 	icon: (
	// 		<FileSearchOutlined
	// 			style={{
	// 				fontSize: "20px",
	// 			}}
	// 		/>
	// 	),
	// 	path: "/recruit-talents",
	// 	routeActive: ["/recruit-talents"],
	// 	permissions: ["recruit_talents_page"],
	// },
	// {
	// 	label: "Find Mentors",
	// 	icon: (
	// 		<FileSearchOutlined
	// 			style={{
	// 				fontSize: "20px",
	// 			}}
	// 		/>
	// 	),
	// 	path: "/find-mentors",
	// 	routeActive: ["/find-mentors"],
	// 	permissions: ["find_mentors_page"],
	// },
	// {
	// 	label: "News Feed",
	// 	icon: (
	// 		<FundOutlined
	// 			style={{
	// 				fontSize: "20px",
	// 			}}
	// 		/>
	// 	),
	// 	path: "/news-feed",
	// 	routeActive: ["/news-feed"],
	// 	permissions: ["news_feed_page"],
	// },
	// {
	// 	label: "Recruit Talents",
	// 	icon: (
	// 		<FileSearchOutlined
	// 			style={{
	// 				fontSize: "20px",
	// 			}}
	// 		/>
	// 	),
	// 	path: "/recruit-talents",
	// 	routeActive: ["/recruit-talents"],
	// 	permissions: ["recruit_talents_page"],
	// },
	// {
	// 	label: "Find Mentors",
	// 	icon: (
	// 		<FileSearchOutlined
	// 			style={{
	// 				fontSize: "20px",
	// 			}}
	// 		/>
	// 	),
	// 	path: "/find-mentors",
	// 	routeActive: ["/find-mentors"],
	// 	permissions: ["find_mentors_page"],
	// },
	// 	],
	// },
	// {
	// 	label: "My startups",
	// 	icon: (
	// 		<StarOutlined
	// 			style={{
	// 				fontSize: "20px",
	// 			}}
	// 		/>
	// 	),
	// 	path: "",
	// 	routeActive: ["/my-startups", "/my-entrepreneurship", "/invite-team"],
	// 	permissions: [
	// 		"my_startups_page",
	// 		"my_entrepreneurship_page",
	// 		"invite_team_page",
	// 	],
	// 	children: [
	// 		{
	// 			label: "My Startups",
	// 			icon: (
	// 				<RocketOutlined
	// 					style={{
	// 						fontSize: "20px",
	// 					}}
	// 				/>
	// 			),
	// 			path: "/my-startups",
	// 			routeActive: ["/my-startups"],
	// 			permissions: ["my_startups_page"],
	// 		},
	// 		{
	// 			label: "My Entrepreneurship",
	// 			icon: (
	// 				<BulbOutlined
	// 					style={{
	// 						fontSize: "20px",
	// 					}}
	// 				/>
	// 			),
	// 			path: "/my-entrepreneurship",
	// 			routeActive: ["/my-entrepreneurship"],
	// 			permissions: ["my_entrepreneurship_page"],
	// 		},
	// 		{
	// 			label: "Invite your team",
	// 			icon: (
	// 				<TeamOutlined
	// 					style={{
	// 						fontSize: "20px",
	// 					}}
	// 				/>
	// 			),
	// 			path: "/invite-team",
	// 			routeActive: ["/invite-team"],
	// 			permissions: ["invite_team_page"],
	// 		},
	// 	],
	// },
	// {
	// 	label: "Support",
	// 	icon: (
	// 		<PhoneOutlined
	// 			style={{
	// 				fontSize: "20px",
	// 				rotate: "90deg",
	// 			}}
	// 		/>
	// 	),
	// 	path: "",
	// 	routeActive: ["/about", "/contact&support"],
	// 	permissions: ["about_page"],
	// 	children: [
	// 		{
	// 			label: "Contact & Support",
	// 			icon: (
	// 				<MessageOutlined
	// 					style={{
	// 						fontSize: "20px",
	// 					}}
	// 				/>
	// 			),
	// 			path: "/about",
	// 			routeActive: ["/about"],
	// 			permissions: ["about_page"],
	// 		},
	// 		{
	// 			label: "Help & FAQs",
	// 			icon: (
	// 				<QuestionCircleOutlined
	// 					style={{
	// 						fontSize: "20px",
	// 					}}
	// 				/>
	// 			),
	// 			path: "",
	// 			routeActive: ["/contact"],
	// 			permissions: ["contact_page"],
	// 		},
	// 	],
	// },
];

export default appRouteMap;
