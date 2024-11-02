import React from "react";
import {
	CompassOutlined,
	StarOutlined,
	PhoneOutlined,
	MessageOutlined,
	HomeOutlined,
} from "@ant-design/icons";

const appRouteMap = [
	{
		label: "Explore",
		icon: (
			<CompassOutlined
				style={{
					fontSize: "20px",
				}}
			/>
		),
		path: "",
		routeActive: ["/"],
		permissions: ["home_page"],
		children: [
			{
				label: "Home",
				icon: (
					<HomeOutlined
						style={{
							fontSize: "20px",
						}}
					/>
				),
				path: "/",
				routeActive: ["/"],
				permissions: ["home_page"],
			},
			{
				label: "News Feed",
				icon: (
					<HomeOutlined
						style={{
							fontSize: "20px",
						}}
					/>
				),
				path: "/news-feed",
				routeActive: ["/news-feed"],
				permissions: ["news_feed_page"],
			},
			{
				label: "Recruit Talents",
				icon: (
					<HomeOutlined
						style={{
							fontSize: "20px",
						}}
					/>
				),
				path: "/recruit-talents",
				routeActive: ["/recruit-talents"],
				permissions: ["recruit_talents_page"],
			},
			{
				label: "Find Mentors",
				icon: (
					<HomeOutlined
						style={{
							fontSize: "20px",
						}}
					/>
				),
				path: "/find-mentors",
				routeActive: ["/find-mentors"],
				permissions: ["find_mentors_page"],
			},
		],
	},
	{
		label: "My startups",
		icon: (
			<StarOutlined
				style={{
					fontSize: "20px",
				}}
			/>
		),
		path: "/my-startups",
		routeActive: ["/my-startups"],
		permissions: ["my_startups_page"],
	},
	{
		label: "Support",
		icon: (
			<PhoneOutlined
				style={{
					fontSize: "20px",
					rotate: "90deg",
				}}
			/>
		),
		path: "",
		routeActive: ["/about", "/contact&support"],
		permissions: ["about_page"],
		children: [
			{
				label: "Contact & Support",
				icon: (
					<MessageOutlined
						style={{
							fontSize: "20px",
						}}
					/>
				),
				path: "/about",
				routeActive: ["/about"],
				permissions: ["about_page"],
			},
			{
				label: "Help & FAQs",
				icon: (
					<MessageOutlined
						style={{
							fontSize: "20px",
						}}
					/>
				),
				path: "",
				routeActive: ["/contact"],
				permissions: ["contact_page"],
			},
		],
	},
];

export default appRouteMap;
