import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { rootLoader } from "./rootLoader";

import AppLayout from "components/layouts/AppLayout";
import AuthLayout from "components/layouts/AuthLayout";

// const AuthPage = React.lazy(() => import("../components/pages/Auth"));
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
// const AboutYou = React.lazy(() => import("../components/pages/AboutYou"));
const Newfeeds = React.lazy(() => import("../components/pages/Newfeeds"));
const Founder = React.lazy(() => import("../components/pages/Founder"));
const Project = React.lazy(() => import("../components/pages/Project"));
const RecruitTalents = React.lazy(() =>
	import("../components/pages/RecruitTalents")
);

const SeekProjects = React.lazy(() =>
	import("../components/pages/SeekProjects")
);
const ProjectNotifications = React.lazy(() =>
	import("../components/pages/NotificationProject")
);
const router = createBrowserRouter([
	// {
	// 	path: "/auth",
	// 	element: (
	// 		<AuthLayout>
	// 			<AuthPage />
	// 		</AuthLayout>
	// 	),
	// },
	{
		path: "/login",
		element: (
			<AuthLayout title={"Welcome back"} path="login">
				<Login />
			</AuthLayout>
		),
		loader: ({ request }) => rootLoader({ request }, false, "LOAD_AUTH_PAGE"),
	},
	{
		path: "/register",
		element: (
			<AuthLayout title={"Register account"} path="register">
				<Register />
			</AuthLayout>
		),
		loader: ({ request }) => rootLoader({ request }, false, "LOAD_AUTH_PAGE"),
	},
	{
		path: "/forgot-password",
		element: (
			<AuthLayout title={"Forgot password"} path="forgot-password">
				<ForgotPassword />
			</AuthLayout>
		),
		loader: ({ request }) => rootLoader({ request }, false, "LOAD_AUTH_PAGE"),
	},
	{
		path: "profile",
		element: (
			<AppLayout>
				<Profile />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_PROFILE_PAGE"),
	},
	{
		path: "admin/manage",
		element: (
			<AppLayout>
				<Manage />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_MANAGE_PAGE"),
	},
	{
		path: "/",
		element: (
			<AppLayout>
				<Home />
			</AppLayout>
		),
		loader: ({ request }) => rootLoader({ request }, true, "LOAD_HOME_PAGE"),
	},
	{
		path: "/about",
		element: (
			<AppLayout>
				<About />
			</AppLayout>
		),
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
		path: "admin/user-management",
		element: (
			<AppLayout>
				<Employee />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_EMPLOYEE_PAGE"),
	},
	{
		path: "/new-feed",
		element: (
			<AppLayout>
				<Newfeeds />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_NEWFEED_PAGE"),
	},
	{
		path: "/founder",
		element: (
			<AppLayout>
				<Founder />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_FOUNDER_PAGE"),
	},
	{
		path: "/project",
		element: (
			<AppLayout>
				<Project />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_PROJECT_PAGE"),
	},
	{
		path: "/recruit-talents",
		element: (
			<AppLayout>
				<RecruitTalents />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_RECRUIT_TALENTS_PAGE"),
	},
	{
		path: "/seek-projects",
		element: (
			<AppLayout>
				<SeekProjects />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_SEEK_PROJECT_PAGE"),
	},
	{
		path: "/project-notifications",
		element: (
			<AppLayout>
				<ProjectNotifications />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_PROJECTS_NOTIFICATION_PAGE"),
	},
]);

export default router;
