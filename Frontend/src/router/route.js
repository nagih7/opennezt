import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { rootLoader } from "./rootLoader";

const Login = React.lazy(() => import("../components/pages/Auth/Login"));
const Register = React.lazy(() => import("../components/pages/Auth/Register"));
const ForgotPassword = React.lazy(() =>
	import("../components/pages/Auth/ForgotPassword")
);
const Profile = React.lazy(() => import("../components/pages/Profile"));
const Manage = React.lazy(() => import("../components/pages/Manage"));
const Home = React.lazy(() => import("../components/pages/Home"));
const Employee = React.lazy(() => import("../components/pages/Employee"));
const About = React.lazy(() => import("../components/pages/About"));
const AboutYou = React.lazy(() => import("../components/pages/AboutYou"));

const router = createBrowserRouter([
	{
		path: "/login",
		element: <Login />,
		loader: ({ request }) => rootLoader({ request }, false, "LOAD_AUTH_PAGE"),
	},
	{
		path: "/register",
		element: <Register />,
		loader: ({ request }) => rootLoader({ request }, false, "LOAD_AUTH_PAGE"),
	},
	{
		path: "/forgot-password",
		element: <ForgotPassword />,
		loader: ({ request }) => rootLoader({ request }, false, "LOAD_AUTH_PAGE"),
	},
	{
		path: "profile",
		element: <Profile />,
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_PROFILE_PAGE"),
	},
	{
		path: "/manage",
		element: <Manage />,
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_MANAGE_PAGE"),
	},
	{
		path: "/",
		element: <Home />,
		loader: ({ request }) => rootLoader({ request }, true, "LOAD_HOME_PAGE"),
	},
	{
		path: "/about-you",
		element: <AboutYou />,
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_ABOUT_YOU_PAGE"),
	},
	{
		path: "/about",
		element: <About />,
		loader: ({ request }) => rootLoader({ request }, true, "LOAD_ABOUT_PAGE"),
		children: [
			{
				path: ":id",
				element: <About />,
				loader: ({ request }) =>
					rootLoader({ request }, true, "LOAD_ABOUT_PAGE"),
			},
		],
	},
	{
		path: "/employee",
		element: <Employee />,
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_EMPLOYEE_PAGE"),
	},
]);

export default router;
