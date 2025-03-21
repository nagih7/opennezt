import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { rootLoader } from "./rootLoader";

import AppLayout from "components/layouts/AppLayout";
import AuthLayout from "components/layouts/AuthLayout";
import Certifications from "components/pages/EditProfile/components/Certifications";
// Project
import Details from "components/pages/CreateProject/Details";
import Stage from "components/pages/CreateProject/Stage";
import Revenue from "components/pages/CreateProject/Revenue";
import FundingSources from "components/pages/CreateProject/FundingSources";
import AdditonalInfo from "components/pages/CreateProject/AdditionalInfo";
import Logo from "components/pages/CreateProject/Logo";
import Background from "components/pages/CreateProject/Background";
import Invites from "components/pages/CreateProject/Invites";
import ProjectDetails from "components/pages/ProjectDetails";
// EditProfile
import EditDetail from "components/pages/EditProject/Components/Detail";
import EditStage from "components/pages/EditProject/Components/Stage";
import EditRevenue from "components/pages/EditProject/Components/Revenue";
import EditFundingSources from "components/pages/EditProject/Components/FundingSources";
import EditAdditionalInfo from "components/pages/EditProject/Components/AdditionalInfo";
import EditLogo from "components/pages/EditProject/Components/Logo";
import EditBackground from "components/pages/EditProject/Components/Background";
import Members from "components/pages/ProjectDetails/components/Members";
import Setting from "components/pages/ProjectDetails/components/Setting";

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
const ProjectDetailsModal = React.lazy(() =>
	import("../components/pages/SeekProjects/ProjectDetailsModal")
);
const NotificationManagement = React.lazy(() =>
	import("../components/pages/NotificationManagement")
);
const VerifyAuth = React.lazy(() => import("../components/pages/Auth/Verify"));
const ResetPassword = React.lazy(() =>
	import("../components/pages/Auth/ResetPassword")
);
// ========== EDIT PROFILE COMPONENTS ========== //
const ProfessionalBackground = React.lazy(() =>
	import("../components/pages/EditProfile/components/ProfessionalBackground")
);
const Educations = React.lazy(() =>
	import("../components/pages/EditProfile/components/Educations")
);
const Skills = React.lazy(() =>
	import("../components/pages/EditProfile/components/Skills")
);
const AdditionalInfo = React.lazy(() =>
	import("../components/pages/EditProfile/components/AdditionalInfo")
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
		path: "/projects",
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
		path: "seek-projects/:id", // Route động cho từng dự án
		element: (
			<AppLayout>
				{" "}
				<ProjectDetailsModal />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_PROJECT_DETAIL_PAGE"),
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
		path: "/about/edit-profile/educations",
		element: (
			<AppLayout>
				<Educations />
			</AppLayout>
		),
	},
	{
		path: "/about/edit-profile/certifications",
		element: (
			<AppLayout>
				<Certifications />
			</AppLayout>
		),
	},
	{
		path: "/about/edit-profile/skills",
		element: (
			<AppLayout>
				<Skills />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_EDIT_PROFILE_PAGE"),
	},
	{
		path: "/about/edit-profile/more",
		element: (
			<AppLayout>
				<AdditionalInfo />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_EDIT_PROFILE_PAGE"),
	},
	{
		path: "/project/details",
		element: (
			<AppLayout>
				<Details />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_CREATE_PROJECT_PAGE"),
	},
	{
		path: "/project/stage",
		element: (
			<AppLayout>
				<Stage />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_CREATE_PROJECT_PAGE"),
	},
	{
		path: "/project/revenue",
		element: (
			<AppLayout>
				<Revenue />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_CREATE_PROJECT_PAGE"),
	},
	{
		path: "/project/funding-sources",
		element: (
			<AppLayout>
				<FundingSources />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_CREATE_PROJECT_PAGE"),
	},
	{
		path: "/project/additional-info",
		element: (
			<AppLayout>
				<AdditonalInfo />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_CREATE_PROJECT_PAGE"),
	},
	{
		path: "/project/logo",
		element: (
			<AppLayout>
				<Logo />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_CREATE_PROJECT_PAGE"),
	},
	{
		path: "/project/background",
		element: (
			<AppLayout>
				<Background />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_CREATE_PROJECT_PAGE"),
	},
	{
		path: "/project/invites",
		element: (
			<AppLayout>
				<Invites />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_CREATE_PROJECT_PAGE"),
	},
	{
		path: "/projects/details/:id",
		element: (
			<AppLayout>
				<ProjectDetails />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_PROJECT_DETAILS_PAGE"),
	},
	{
		path: "/project/edit-project/detail",
		element: (
			<AppLayout>
				<EditDetail />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_EDIT_PROJECT_PAGE"),
	},
	{
		path: "/project/edit-project/stage",
		element: (
			<AppLayout>
				<EditStage />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_EDIT_PROJECT_PAGE"),
	},
	{
		path: "/project/edit-project/revenue",
		element: (
			<AppLayout>
				<EditRevenue />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_EDIT_PROJECT_PAGE"),
	},
	{
		path: "/project/edit-project/funding-sources",
		element: (
			<AppLayout>
				<EditFundingSources />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_EDIT_PROJECT_PAGE"),
	},
	{
		path: "/project/edit-project/additional-info",
		element: (
			<AppLayout>
				<EditAdditionalInfo />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_EDIT_PROJECT_PAGE"),
	},
	{
		path: "/project/edit-project/logo",
		element: (
			<AppLayout>
				<EditLogo />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_EDIT_PROJECT_PAGE"),
	},
	{
		path: "/project/edit-project/background",
		element: (
			<AppLayout>
				<EditBackground />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_EDIT_PROJECT_PAGE"),
	},
	{
		path: "/project/details/members",
		element: (
			<AppLayout>
				<Members />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_PROJECT_MEMBERS_PAGE"),
	},
	{
		path: "/project/details/setting",
		element: (
			<AppLayout>
				<Setting />
			</AppLayout>
		),
		loader: ({ request }) =>
			rootLoader({ request }, true, "LOAD_PROJECT_SETTING_PAGE"),
	}
]);

export default router;
