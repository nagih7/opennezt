import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { rootLoader } from "./rootLoader";

import AppLayout from "components/layouts/AppLayout";
import AuthLayout from "components/layouts/AuthLayout";
import EditProfile from "components/pages/EditProfile";
import ProfessionalBackground from "components/pages/EditProfile/components/ProfileProfessionalEditor/ProfessionalBackground";
import Expertise from "components/pages/EditProfile/components/ProfileProfessionalEditor/Expertise";
import WorkWithMe from "components/pages/EditProfile/components/ProfileProfessionalEditor/WorkWithMe";

// const AuthPage = React.lazy(() => import("../components/pages/Auth"));
const Login = React.lazy(() => import("../components/pages/Auth/Login"));
const Register = React.lazy(() => import("../components/pages/Auth/Register"));
const ForgotPassword = React.lazy(() =>
	import("../components/pages/Auth/ForgotPassword")
);
const Profile = React.lazy(() => import("../components/pages/Profile"));
const Manage = React.lazy(() => import("../components/pages/Manage"));
const Home = React.lazy(() => import("../components/pages/Home"));
const UserManagement = React.lazy(() =>
	import("../components/pages/UserManagement")
);
const About = React.lazy(() => import("../components/pages/About"));
const Newfeeds = React.lazy(() => import("../components/pages/Newfeeds"));
const Project = React.lazy(() => import("../components/pages/Project"));
const RecruitTalents = React.lazy(() =>
	import("../components/pages/RecruitTalents")
);
const SeekProjects = React.lazy(() =>
	import("../components/pages/SeekProjects")
);
const NotificationManagement = React.lazy(() =>
	import("../components/pages/NotificationManagement")
);
const VerifyAuth = React.lazy(() => import("../components/pages/Auth/Verify"));
const ResetPassword = React.lazy(() =>
	import("../components/pages/Auth/ResetPassword")
);

const router = createBrowserRouter([
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
		path: "/verify-authentication",
		element: (
			<AuthLayout title={"Verify authentication"} path="verify">
				<VerifyAuth />
			</AuthLayout>
		),
		loader: ({ request }) => rootLoader({ request }, false, "LOAD_AUTH_PAGE"),
	},
	{
		path: "/reset-password",
		element: (
			<AuthLayout title={"Reset password"} path="reset-password">
				<ResetPassword />
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
				<UserManagement />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_EMPLOYEE_PAGE"),
	},
	{
		path: "/activity",
		element: (
			<AppLayout>
				<Newfeeds />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_NEWFEED_PAGE"),
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
		path: "/notification-management",
		element: (
			<AppLayout>
				<NotificationManagement />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_PROJECTS_NOTIFICATION_PAGE"),
	},
	// {
	// 	path: "/about/edit-profile",
	// 	element: (
	// 		<AppLayout>
	// 			<EditProfile />
	// 		</AppLayout>
	// 	),
	// 	loader: ({ request }) =>
	// 		rootLoader({ request }, true, "LOAD_EDIT_PROFILE_PAGE"),
	// },
	{
		path: "/about/edit-profile/professional-background",
		element: (
			<AppLayout>
				<ProfessionalBackground />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_EDIT_PROFILE_PAGE"),
	},
	{
		path: "/about/edit-profile/expertise",
		element: (
			<AppLayout>
				<Expertise />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_EDIT_PROFILE_PAGE"),
	},
	{
		path: "/about/edit-profile/work-with-me",
		element: (
			<AppLayout>
				<WorkWithMe />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_EDIT_PROFILE_PAGE"),
	},
]);

export default router;
