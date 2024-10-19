import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../components/pages/Auth/Login";
import Register from "../components/pages/Auth/Register";
import ForgotPassword from "../components/pages/Auth/ForgotPassword";
import Profile from "../components/pages/Profile";
import Manage from "../components/pages/Manage";
import Home from "../components/pages/Home";
import Employee from "../components/pages/Employee";
import About from "../components/pages/About";
import { rootLoader } from "./rootLoader";

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
