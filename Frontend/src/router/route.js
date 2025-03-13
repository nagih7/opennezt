import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { rootLoader } from "./rootLoader";

import AppLayout from "components/layouts/AppLayout";
import AuthLayout from "components/layouts/AuthLayout";
import Certifications from "components/pages/EditProfile/components/Certifications";
import Details from "components/pages/Project/CreateAProject/Details";
import Industry from "components/pages/Project/CreateAProject/Industry";
import Stage from "components/pages/Project/CreateAProject/Stage";
import Revenue from "components/pages/Project/CreateAProject/Revenue";
import FundingSources from "components/pages/Project/CreateAProject/FundingSources";
import AdditonalInfo from "components/pages/Project/CreateAProject/AdditionalInfo";
import Logo from "components/pages/Project/CreateAProject/Logo";
import CoverImage from "components/pages/Project/CreateAProject/CoverImage";
import Invites from "components/pages/Project/CreateAProject/Invites";
import DetailProject from "components/pages/Project/DetailProject";

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
const Expertise = React.lazy(() =>
	import("../components/pages/EditProfile/components/Expertise")
);
const WorkWithMe = React.lazy(() =>
	import("../components/pages/EditProfile/components/WorkWithMe")
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
		path: "/project/industry",
		element: (
		  <AppLayout>
			<Industry />
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
		path: "/project/cover-image",
		element: (
		  <AppLayout>
			<CoverImage />
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
		path: "/project/detail-project",
		element: (
		  <AppLayout>
			<DetailProject />
		  </AppLayout>
		),  
		loader: ({ request }) =>
		  rootLoader({ request }, true, "LOAD_DETAIL_PROJECT_PAGE"),
	  },
]);

export default router;
