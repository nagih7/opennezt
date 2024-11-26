import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";

import {
	CompassOutlined,
	// StarOutlined,
	// PhoneOutlined,
	// MessageOutlined,
	HomeOutlined,
	// FundOutlined,
	// FileSearchOutlined,
	// RocketOutlined,
	// BulbOutlined,
	// TeamOutlined,
	// QuestionCircleOutlined,
} from "@ant-design/icons";

const appRouteMap = [
	{
		label: "Dashboard",
		name: "Dashboard",
		icon: (
			<DashboardIcon
				className="material-icons"
				style={{ color: "#7d8da1" }}
			/>
		),
		path: "/",
		routeActive: ["/"],
		permissions: [""],
	},
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
