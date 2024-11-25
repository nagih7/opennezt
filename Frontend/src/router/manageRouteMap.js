import React from "react";

const manageRouteMap = [
	{
		label: "Dashboard",
		name: "Dashboard",
		icon: (
			<img src="https://www.svgrepo.com/show/425195/home-dashboard-basic.svg" style={{width:"30px"}}></img>
		),
		path: "/",
		routeActive: ["/"],
		permissions: [""],
	},
	
	
	{
		label: "User Management",
		icon: (
			<img src="https://cdn-icons-png.flaticon.com/512/6102/6102535.png" style={{width:"30px"}}></img>
		),
		path: "/employee",
		routeActive: ["/employee"],
		permissions: ["employee_page"],
	},
	// {
	// 	label: "Settings",
	// 	icon: (
	// 		<svg
	// 			fill="none"
	// 			xmlns="http://www.w3.org/2000/svg"
	// 			viewBox="0 0 16 16"
	// 			transform="scale(-1 1)"
	// 			width="20"
	// 			height="20">
	// 			<g fill="currentColor">
	// 				<path
	// 					fill="currentColor"
	// 					d="M5 8c0-1.684 1.316-3 3-3 1.656 0 3 1.316 3 3 0 1.656-1.344 3-3 3-1.684 0-3-1.344-3-3zm3-1.5a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 8 6.5zM9.159 0a1.5 1.5 0 0 1 1.459 1.148l.244 1.015c.266.13.519.277.759.44l1.003-.295a1.502 1.502 0 0 1 1.725.689l1.159 2.007c.344.6.234 1.359-.266 1.837l-.759.694a6.34 6.34 0 0 1 0 .904l.759.722c.5.478.609 1.238.266 1.837l-1.159 2.006c-.347.6-1.059.884-1.725.691l-1.003-.297a6.617 6.617 0 0 1-.759.441l-.244 1.016a1.502 1.502 0 0 1-1.459 1.147H6.84a1.5 1.5 0 0 1-1.459-1.147l-.244-1.016a6.314 6.314 0 0 1-.759-.441l-1.031.297c-.637.194-1.349-.091-1.695-.691L.493 10.998a1.5 1.5 0 0 1 .265-1.837l.757-.723a6.578 6.578 0 0 1 0-.904L.758 6.84a1.5 1.5 0 0 1-.265-1.837l1.159-2.007c.347-.6 1.059-.885 1.695-.689l1.031.295c.241-.163.494-.31.759-.44l.244-1.015A1.501 1.501 0 0 1 6.841 0H9.16zM6.422 3.237l-.35.147a4.941 4.941 0 0 0-1.1.637l-.303.231-1.718-.506-1.16 2.006 1.297 1.234-.048.375a5.208 5.208 0 0 0 0 1.276l.048.375-1.297 1.234 1.159 2.006 1.718-.506.303.231c.334.256.703.472 1.1.637l.35.147.419 1.738h2.319l.419-1.738.35-.147a4.941 4.941 0 0 0 1.1-.637l.303-.231 1.719.506 1.159-2.006-1.297-1.234.047-.375A4.8 4.8 0 0 0 13 8c0-.216-.013-.428-.041-.637l-.047-.375 1.297-1.234-1.159-2.006-1.719.506-.303-.231a4.903 4.903 0 0 0-1.1-.637l-.35-.147L9.159 1.5H6.84l-.419 1.738z"
	// 				/>
	// 			</g>
	// 		</svg>
	// 	),
	// 	path: "",
	// 	routeActive: ["/about", "/contact"],
	// 	permissions: ["about_page", "contact_page"],
	// 	children: [
	// 		{
	// 			label: "About",
	// 			icon: "",
	// 			path: "/about",
	// 			routeActive: ["/about"],
	// 			permissions: ["about_page"],
	// 		},
	// 		{
	// 			label: "Contact",
	// 			icon: "",
	// 			path: "",
	// 			routeActive: ["/contact"],
	// 			permissions: ["contact_page"],
	// 		},
	// 	],
	// },
	{
		label: "About Me",
		icon : (
			<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png" style={{width:"30px"}}></img>
		  
		),
		path: "/about",
		routeActive: ["/about"],
		permissions: ["about_page"],

	},
	{
		label: "Admin",
		name: "Admin",
		icon: (
			<img src="https://cdn.iconscout.com/icon/free/png-256/free-administrator-icon-download-in-svg-png-gif-file-formats--business-woman-female-man-user-hospital-management-pack-healthcare-medical-icons-5728885.png" style={{width:"30px"}}>
		</img>
		),
		path: "/manage",
		routeActive: ["/manage"],
		permissions: ["manage_page"],
	},
];

export default manageRouteMap;
