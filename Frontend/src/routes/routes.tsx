import React from 'react'
import { createBrowserRouter, RouteObject, LoaderFunction } from 'react-router-dom'
import { rootLoader } from './rootLoader'

import AppLayout from 'components/layouts/AppLayout'
import AuthLayout from 'components/layouts/AuthLayout'
import Certifications from 'components/pages/EditProfile/components/Certifications'
// Project
import Details from 'components/pages/CreateProject/Details'
import Stage from 'components/pages/CreateProject/Stage'
import Revenue from 'components/pages/CreateProject/Revenue'
import FundingSources from 'components/pages/CreateProject/FundingSources'
import AdditonalInfo from 'components/pages/CreateProject/AdditionalInfo'
import Logo from 'components/pages/CreateProject/Logo'
import Background from 'components/pages/CreateProject/Background'
import Invites from 'components/pages/CreateProject/Invites'
import MyProjectDetails from 'components/pages/MyProjectDetails'
// EditProfile
import EditDetail from 'components/pages/EditProject/Components/Detail'
import EditStage from 'components/pages/EditProject/Components/Stage'
import EditRevenue from 'components/pages/EditProject/Components/Revenue'
import EditFundingSources from 'components/pages/EditProject/Components/FundingSources'
import EditAdditionalInfo from 'components/pages/EditProject/Components/AdditionalInfo'
import EditLogo from 'components/pages/EditProject/Components/Logo'
import EditBackground from 'components/pages/EditProject/Components/Background'
import Members from 'components/pages/MyProjectDetails/components/Members'
import ProjectManage from 'components/pages/MyProjectDetails/components/ProjectManage'
// import NewConversation from 'components/pages/Message/components/NewConversation';
import AccountSettings from 'components/pages/AccountSettings'
import ProfileVisibility from 'components/pages/AccountSettings/components/ProfileVisibility'
import PrivacyAndSecurity from 'components/pages/AccountSettings/components/PrivacyAndSecurity'
import Shop from 'components/pages/AccountSettings/components/Shop'
import BlockList from 'components/pages/AccountSettings/components/BlockList'
import ExportData from 'components/pages/AccountSettings/components/ExportData'
import MessageSidebar from 'components/pages/Message/components/MessageSidebar'
import Interview from 'components/common/ModalMatchingProjects/components/Interview'

const Home = React.lazy(() => import('../components/pages/Home'))
const Login = React.lazy(() => import('../components/pages/Auth/Login'))
const Register = React.lazy(() => import('../components/pages/Auth/Register'))
const ForgotPassword = React.lazy(() => import('../components/pages/Auth/ForgotPassword'))
const Profile = React.lazy(() => import('../components/pages/Profile'))
const Manage = React.lazy(() => import('../components/pages/Manage'))
const UserManagement = React.lazy(() => import('../components/pages/UserManagement'))
const RoleManage = React.lazy(() => import('../components/pages/Manage/components/RoleManage'))
const TypeManage = React.lazy(() => import('../components/pages/Manage/components/TypeManage'))
const IndustryManage = React.lazy(() => import('../components/pages/Manage/components/IndustryManage'))
const ExperienceLevelManage = React.lazy(() => import('../components/pages/Manage/components/ExperienceLevelManage'))
const CategoryManage = React.lazy(() => import('../components/pages/Manage/components/CategoryManage'))
const SkillManage = React.lazy(() => import('../components/pages/Manage/components/SkillManage'))
const OrganizationManage = React.lazy(() => import('../components/pages/Manage/components/OrganizationManage'))
const About = React.lazy(() => import('../components/pages/About'))
const Message = React.lazy(() => import('../components/pages/Message'))
// const Newfeeds = React.lazy(() => import('../components/pages/Newfeeds'))
const Project = React.lazy(() => import('../components/pages/Project'))
const RecruitTalents = React.lazy(() => import('../components/pages/RecruitTalents'))
const TalentDetails = React.lazy(() => import('../components/pages/TalentDetails'))
const SeekProjects = React.lazy(() => import('../components/pages/SeekProjects'))
const ProjectDetailsBySeek = React.lazy(() => import('../components/pages/ProjectDetailsBySeek'))
const VerifyAuth = React.lazy(() => import('../components/pages/Auth/Verify'))
const ResetPassword = React.lazy(() => import('../components/pages/Auth/ResetPassword'))
const ArticleManage = React.lazy(() => import('../components/pages/Manage/components/ArticleManage'))
// ========== EDIT PROFILE COMPONENTS ========== //
const ProfessionalBackground = React.lazy(
   () => import('../components/pages/EditProfile/components/ProfessionalBackground')
)
const Educations = React.lazy(() => import('../components/pages/EditProfile/components/Educations'))
const Skills = React.lazy(() => import('../components/pages/EditProfile/components/Skills'))
const AdditionalInfo = React.lazy(() => import('../components/pages/EditProfile/components/AdditionalInfo'))
// const NotificationManagement = React.lazy(() => import('../components/pages/NotificationManagement'))
// Define a custom RouteConfig type that extends RouteObject
type RouteConfig = RouteObject

// Define a helper function to create properly typed loader functions
const createLoader = (isAuth: boolean, saga: string | null, permissions: string[] = []): LoaderFunction => {
   return (args) => rootLoader(args, isAuth, saga, permissions)
}

const router: RouteConfig[] = [
   {
      path: '/login',
      element: (
         <AuthLayout title={'Welcome back'} path="login">
            <Login />
         </AuthLayout>
      ),
      loader: createLoader(false, 'LOAD_AUTH_PAGE'),
   },
   {
      path: '/register',
      element: (
         <AuthLayout title={'Register account'} path="register">
            <Register />
         </AuthLayout>
      ),
      loader: createLoader(false, 'LOAD_AUTH_PAGE'),
   },
   {
      path: '/verify-authentication',
      element: (
         <AuthLayout title={'Verify authentication'} path="verify">
            <VerifyAuth />
         </AuthLayout>
      ),
      loader: createLoader(false, 'LOAD_AUTH_PAGE'),
   },
   {
      path: '/reset-password',
      element: (
         <AuthLayout title={'Reset password'} path="reset-password">
            <ResetPassword />
         </AuthLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, false, 'LOAD_AUTH_PAGE'),
   },
   {
      path: '/forgot-password',
      element: (
         <AuthLayout title={'Forgot password'} path="forgot-password">
            <ForgotPassword />
         </AuthLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, false, 'LOAD_AUTH_PAGE'),
   },
   {
      path: 'profile',
      element: (
         <AppLayout>
            <Profile />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_PROFILE_PAGE'),
   },
   {
      path: 'admin/manage',
      element: (
         <AppLayout>
            <Manage />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_MANAGE_PAGE'),
   },
   {
      path: 'admin/manage/users',
      element: (
         <AppLayout>
            <UserManagement />
         </AppLayout>
      ),
   },
   {
      path: 'admin/manage/roles',
      element: (
         <AppLayout>
            <RoleManage />
         </AppLayout>
      ),
   },
   {
      path: 'admin/manage/types',
      element: (
         <AppLayout>
            <TypeManage />
         </AppLayout>
      ),
   },
   {
      path: 'admin/manage/industries',
      element: (
         <AppLayout>
            <IndustryManage />
         </AppLayout>
      ),
   },
   {
      path: 'admin/manage/experience-levels',
      element: (
         <AppLayout>
            <ExperienceLevelManage />
         </AppLayout>
      ),
   },
   {
      path: 'admin/manage/categories',
      element: (
         <AppLayout>
            <CategoryManage />
         </AppLayout>
      ),
   },
   {
      path: 'admin/manage/skills',
      element: (
         <AppLayout>
            <SkillManage />
         </AppLayout>
      ),
   },
   {
      path: 'admin/manage/organizations',
      element: (
         <AppLayout>
            <OrganizationManage />
         </AppLayout>
      ),
   },
   {
      path: 'admin/manage/articles',
      element: (
         <AppLayout>
            <ArticleManage />
         </AppLayout>
      ),
   },
   {
      path: '/',
      element: (
         <AppLayout>
            <Home />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_HOME_PAGE'),
   },
   {
      path: '/about',
      element: (
         <AppLayout>
            <About />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_ABOUT_PAGE'),
      children: [
         {
            path: ':id',
            element: <About />,
            loader: createLoader(true, 'LOAD_ABOUT_PAGE'),
         },
      ],
   },
   // {
   //     path: '/activity',
   //     element: (
   //         <AppLayout>
   //             <Newfeeds />
   //         </AppLayout>
   //     ),
   //     loader: ({ request }) => rootLoader({ request }, true, 'LOAD_NEWFEED_PAGE'),
   // },

   {
      path: '/projects',
      element: (
         <AppLayout>
            <Project />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_PROJECT_PAGE'),
   },
   {
      path: '/recruit-talents',
      element: (
         <AppLayout>
            <RecruitTalents />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_RECRUIT_TALENTS_PAGE'),
   },
   {
      path: '/talents/:id/details',
      element: (
         <AppLayout>
            <TalentDetails />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_TALENT_DETAILS_PAGE'),
   },
   {
      path: '/seek-projects',
      element: (
         <AppLayout>
            <SeekProjects />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_SEEK_PROJECT_PAGE'),
   },
   {
      path: 'projects/:id/details',
      element: (
         <AppLayout>
            <ProjectDetailsBySeek />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_PROJECT_DETAIL_PAGE'),
   },
   // {
   //     path: '/notification-management',
   //     element: (
   //         <AppLayout>
   //             <NotificationManagement />
   //         </AppLayout>
   //     ),
   //     loader: ({ request }) => rootLoader({ request }, true, 'LOAD_NOTIFICATION_MANAGEMENT_PAGE'),
   // },
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
      path: '/about/edit-profile/professional-background',
      element: (
         <AppLayout>
            <ProfessionalBackground />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_EDIT_PROFILE_PAGE'),
   },
   {
      path: '/about/edit-profile/educations',
      element: (
         <AppLayout>
            <Educations />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_EDIT_PROFILE_PAGE'),
   },
   {
      path: '/about/edit-profile/certifications',
      element: (
         <AppLayout>
            <Certifications />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_EDIT_PROFILE_PAGE'),
   },
   {
      path: '/about/edit-profile/skills',
      element: (
         <AppLayout>
            <Skills />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_EDIT_PROFILE_PAGE'),
   },
   {
      path: '/about/edit-profile/more',
      element: (
         <AppLayout>
            <AdditionalInfo />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_EDIT_PROFILE_PAGE'),
   },
   // {
   //     path: '/about/edit-profile/cv',
   //     element: (
   //         <AppLayout>
   //             <UploadCV />
   //         </AppLayout>
   //     ),
   //     loader: ({ request }) => rootLoader({ request }, true, 'LOAD_EDIT_PROFILE_PAGE'),
   // },
   {
      path: '/project/details',
      element: (
         <AppLayout>
            <Details />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_CREATE_PROJECT_PAGE'),
   },
   {
      path: '/project/stage',
      element: (
         <AppLayout>
            <Stage />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_CREATE_PROJECT_PAGE'),
   },
   {
      path: '/project/revenue',
      element: (
         <AppLayout>
            <Revenue />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_CREATE_PROJECT_PAGE'),
   },
   {
      path: '/project/funding-sources',
      element: (
         <AppLayout>
            <FundingSources />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_CREATE_PROJECT_PAGE'),
   },
   {
      path: '/project/additional-info',
      element: (
         <AppLayout>
            <AdditonalInfo />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_CREATE_PROJECT_PAGE'),
   },
   {
      path: '/project/logo',
      element: (
         <AppLayout>
            <Logo />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_CREATE_PROJECT_PAGE'),
   },
   {
      path: '/project/background',
      element: (
         <AppLayout>
            <Background />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_CREATE_PROJECT_PAGE'),
   },
   {
      path: '/project/invites',
      element: (
         <AppLayout>
            <Invites />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_CREATE_PROJECT_PAGE'),
   },
   {
      path: '/projects/me/:id/details',
      element: (
         <AppLayout>
            <MyProjectDetails />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_PROJECT_DETAILS_PAGE'),
   },
   {
      path: '/projects/me/:id/edit/basic',
      element: (
         <AppLayout>
            <EditDetail />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_EDIT_PROJECT_PAGE'),
   },
   {
      path: '/projects/me/:id/edit/stage',
      element: (
         <AppLayout>
            <EditStage />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_EDIT_PROJECT_PAGE'),
   },
   {
      path: '/projects/me/:id/edit/revenue',
      element: (
         <AppLayout>
            <EditRevenue />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_EDIT_PROJECT_PAGE'),
   },
   {
      path: '/projects/me/:id/edit/funding-sources',
      element: (
         <AppLayout>
            <EditFundingSources />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_EDIT_PROJECT_PAGE'),
   },
   {
      path: '/projects/me/:id/edit/additional-info',
      element: (
         <AppLayout>
            <EditAdditionalInfo />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_EDIT_PROJECT_PAGE'),
   },
   {
      path: '/projects/me/:id/edit/logo',
      element: (
         <AppLayout>
            <EditLogo />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_EDIT_PROJECT_PAGE'),
   },
   {
      path: '/projects/me/:id/edit/background',
      element: (
         <AppLayout>
            <EditBackground />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_EDIT_PROJECT_PAGE'),
   },
   {
      path: '/project/details/members',
      element: (
         <AppLayout>
            <Members />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_PROJECT_MEMBERS_PAGE'),
   },
   {
      path: '/project/details/setting',
      element: (
         <AppLayout>
            <ProjectManage />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_PROJECT_SETTING_PAGE'),
   },
   {
      path: '/conversation',
      element: (
         <AppLayout>
            <Message />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_MESSAGES_PAGE'),
   },
   // {
   //     path: '/messages/new-conversation',
   //     element: (
   //         <AppLayout>
   //             <NewConversation />
   //         </AppLayout>
   //     ),
   //     loader: ({ request }) => rootLoader({ request }, true, 'LOAD_NEW_CONVERSATION_PAGE'),
   // },
   {
      path: '/conversation/:id',
      element: (
         <AppLayout>
            <Message />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_CONVERSATION_PAGE'),
   },
   {
      path: '/account-settings',
      element: (
         <AppLayout>
            <AccountSettings />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_ACCOUNT_SETTINGS_PAGE'),
   },
   {
      path: '/account-settings/profile-visibility',
      element: (
         <AppLayout>
            <ProfileVisibility />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_PROFILE_VISIBILITY_PAGE'),
   },

   {
      path: '/account-settings/privacy-and-security',
      element: (
         <AppLayout>
            <PrivacyAndSecurity />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_PRIVACY_AND_SECURITY_PAGE'),
   },
   {
      path: '/account-settings/shop',
      element: (
         <AppLayout>
            <Shop />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_SHOP_PAGE'),
   },
   {
      path: '/account-settings/block-list',
      element: (
         <AppLayout>
            <BlockList />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_BLOCK_LIST_PAGE'),
   },
   {
      path: '/account-settings/export-data',
      element: (
         <AppLayout>
            <ExportData />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_EXPORT_DATA_PAGE'),
   },
   {
      path: '/messages-sidebar',
      element: (
         <AppLayout>
            <MessageSidebar />
         </AppLayout>
      ),
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_MESSAGES_SIDEBAR_PAGE'),
   },
   {
      path: '/interview/:projectId',
      element: <Interview />,
      loader: ({ request }) => rootLoader({ request }, true, 'LOAD_INTERVIEW_PAGE'),
   },
]

const routes = createBrowserRouter(router)

export default routes
