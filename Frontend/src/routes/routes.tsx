import React from 'react'
import { createBrowserRouter, RouteObject, LoaderFunction } from 'react-router-dom'
import { rootLoader } from './rootLoader'
import withSuspense from './loadingFallback'
import { LoaderArgs } from '~/types'

// Layouts
const AppLayout = React.lazy(() => import('components/layouts/AppLayout'))
const AuthLayout = React.lazy(() => import('components/layouts/AuthLayout'))

// Auth pages
const Login = React.lazy(() => import('../components/pages/Auth/Login'))
const Register = React.lazy(() => import('../components/pages/Auth/Register'))
const ForgotPassword = React.lazy(() => import('../components/pages/Auth/ForgotPassword'))
const VerifyAuth = React.lazy(() => import('../components/pages/Auth/Verify'))
const ResetPassword = React.lazy(() => import('../components/pages/Auth/ResetPassword'))

// Main pages
const Home = React.lazy(() => import('../components/pages/Home'))
const Profile = React.lazy(() => import('../components/pages/Profile'))
const About = React.lazy(() => import('../components/pages/About'))
const Message = React.lazy(() => import('../components/pages/Message'))
const Project = React.lazy(() => import('../components/pages/Project'))

// Project related pages
const ProjectFeatures = {
   CreateProject: {
      Details: React.lazy(() => import('components/pages/CreateProject/Details')),
      Stage: React.lazy(() => import('components/pages/CreateProject/Stage')),
      Revenue: React.lazy(() => import('components/pages/CreateProject/Revenue')),
      FundingSources: React.lazy(() => import('components/pages/CreateProject/FundingSources')),
      AdditionalInfo: React.lazy(() => import('components/pages/CreateProject/AdditionalInfo')),
      Logo: React.lazy(() => import('components/pages/CreateProject/Logo')),
      Background: React.lazy(() => import('components/pages/CreateProject/Background')),
      Invites: React.lazy(() => import('components/pages/CreateProject/Invites')),
   },
   EditProject: {
      Detail: React.lazy(() => import('components/pages/EditProject/Components/Detail')),
      Stage: React.lazy(() => import('components/pages/EditProject/Components/Stage')),
      Revenue: React.lazy(() => import('components/pages/EditProject/Components/Revenue')),
      FundingSources: React.lazy(() => import('components/pages/EditProject/Components/FundingSources')),
      AdditionalInfo: React.lazy(() => import('components/pages/EditProject/Components/AdditionalInfo')),
      Logo: React.lazy(() => import('components/pages/EditProject/Components/Logo')),
      Background: React.lazy(() => import('components/pages/EditProject/Components/Background')),
   },
   MyProject: {
      Details: React.lazy(() => import('components/pages/MyProjectDetails')),
      Members: React.lazy(() => import('components/pages/MyProjectDetails/components/Members')),
      ProjectManage: React.lazy(() => import('components/pages/MyProjectDetails/components/ProjectManage')),
   },
}

// Edit Profile related pages
const EditProfileFeatures = {
   ProfessionalBackground: React.lazy(
      () => import('../components/pages/EditProfile/components/ProfessionalBackground')
   ),
   Educations: React.lazy(() => import('../components/pages/EditProfile/components/Educations')),
   Certifications: React.lazy(() => import('components/pages/EditProfile/components/Certifications')),
   Skills: React.lazy(() => import('../components/pages/EditProfile/components/Skills')),
   AdditionalInfo: React.lazy(() => import('../components/pages/EditProfile/components/AdditionalInfo')),
}

// Account Settings related pages
const AccountSettingsFeatures = {
   Main: React.lazy(() => import('components/pages/AccountSettings')),
   ProfileVisibility: React.lazy(() => import('components/pages/AccountSettings/components/ProfileVisibility')),
   PrivacyAndSecurity: React.lazy(() => import('components/pages/AccountSettings/components/PrivacyAndSecurity')),
   Shop: React.lazy(() => import('components/pages/AccountSettings/components/Shop')),
   BlockList: React.lazy(() => import('components/pages/AccountSettings/components/BlockList')),
   ExportData: React.lazy(() => import('components/pages/AccountSettings/components/ExportData')),
}

// Talent related pages
const TalentFeatures = {
   RecruitTalents: React.lazy(() => import('../components/pages/RecruitTalents')),
   TalentDetails: React.lazy(() => import('../components/pages/TalentDetails')),
   SeekProjects: React.lazy(() => import('../components/pages/SeekProjects')),
   ProjectDetailsBySeek: React.lazy(() => import('../components/pages/ProjectDetailsBySeek')),
}

// Admin related pages
const AdminFeatures = {
   Manage: React.lazy(() => import('../components/pages/Manage')),
   UserManagement: React.lazy(() => import('../components/pages/UserManagement')),
   RoleManage: React.lazy(() => import('../components/pages/Manage/components/RoleManage')),
   TypeManage: React.lazy(() => import('../components/pages/Manage/components/TypeManage')),
   IndustryManage: React.lazy(() => import('../components/pages/Manage/components/IndustryManage')),
   ExperienceLevelManage: React.lazy(() => import('../components/pages/Manage/components/ExperienceLevelManage')),
   CategoryManage: React.lazy(() => import('../components/pages/Manage/components/CategoryManage')),
   SkillManage: React.lazy(() => import('../components/pages/Manage/components/SkillManage')),
   OrganizationManage: React.lazy(() => import('../components/pages/Manage/components/OrganizationManage')),
   ArticleManage: React.lazy(() => import('../components/pages/Manage/components/ArticleManage')),
}

// Other components
const MessageSidebar = React.lazy(() => import('components/pages/Message/components/MessageSidebar'))
const Interview = React.lazy(() => import('components/common/ModalMatchingProjects/components/Interview'))

// Define a helper function to create properly typed loader functions
const createLoader = (
   requireAuth: boolean = false,
   saga: string | null = null,
   permissions: string[] = []
): LoaderFunction => {
   return (args: LoaderArgs) =>
      rootLoader(args, {
         requireAuth,
         saga,
         permissions,
      })
}

const router: RouteObject[] = [
   {
      path: '/login',
      element: withSuspense(
         <AuthLayout title={'Welcome back'} path="login">
            <Login />
         </AuthLayout>
      ),
      loader: createLoader(false, 'LOAD_AUTH_PAGE'),
   },
   {
      path: '/register',
      element: withSuspense(
         <AuthLayout title={'Register account'} path="register">
            <Register />
         </AuthLayout>
      ),
      loader: createLoader(false, 'LOAD_AUTH_PAGE'),
   },
   {
      path: '/verify-authentication',
      element: withSuspense(<VerifyAuth />),
      loader: createLoader(false, 'LOAD_AUTH_PAGE'),
   },
   {
      path: '/reset-password',
      element: withSuspense(
         <AuthLayout title={'Reset password'} path="reset-password">
            <ResetPassword />
         </AuthLayout>
      ),
      loader: createLoader(false, 'LOAD_AUTH_PAGE'),
   },
   {
      path: '/forgot-password',
      element: withSuspense(
         <AuthLayout title={'Forgot password'} path="forgot-password">
            <ForgotPassword />
         </AuthLayout>
      ),
      loader: createLoader(false, 'LOAD_AUTH_PAGE'),
   },
   {
      path: 'profile',
      element: withSuspense(
         <AppLayout>
            <Profile />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_PROFILE_PAGE'),
   },

   {
      path: '/',
      element: withSuspense(
         <AppLayout>
            <Home />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_HOME_PAGE'),
   },
   {
      path: '/about',
      element: withSuspense(
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
   {
      path: '/projects',
      element: withSuspense(
         <AppLayout>
            <Project />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_PROJECT_PAGE'),
   },
   {
      path: '/recruit-talents',
      element: withSuspense(
         <AppLayout>
            <TalentFeatures.RecruitTalents />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_RECRUIT_TALENTS_PAGE'),
   },
   {
      path: '/talents/:id/details',
      element: withSuspense(
         <AppLayout>
            <TalentFeatures.TalentDetails />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_TALENT_DETAILS_PAGE'),
   },
   {
      path: '/seek-projects',
      element: withSuspense(
         <AppLayout>
            <TalentFeatures.SeekProjects />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_SEEK_PROJECT_PAGE'),
   },
   {
      path: 'projects/:id/details',
      element: withSuspense(
         <AppLayout>
            <TalentFeatures.ProjectDetailsBySeek />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_PROJECT_DETAIL_PAGE'),
   },
   {
      path: '/about/edit-profile/professional-background',
      element: withSuspense(
         <AppLayout>
            <EditProfileFeatures.ProfessionalBackground />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_EDIT_PROFILE_PAGE'),
   },
   {
      path: '/about/edit-profile/educations',
      element: withSuspense(
         <AppLayout>
            <EditProfileFeatures.Educations />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_EDIT_PROFILE_PAGE'),
   },
   {
      path: '/about/edit-profile/certifications',
      element: withSuspense(
         <AppLayout>
            <EditProfileFeatures.Certifications />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_EDIT_PROFILE_PAGE'),
   },
   {
      path: '/about/edit-profile/skills',
      element: withSuspense(
         <AppLayout>
            <EditProfileFeatures.Skills />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_EDIT_PROFILE_PAGE'),
   },
   {
      path: '/about/edit-profile/more',
      element: withSuspense(
         <AppLayout>
            <EditProfileFeatures.AdditionalInfo />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_EDIT_PROFILE_PAGE'),
   },
   {
      path: '/project/details',
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.CreateProject.Details />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_CREATE_PROJECT_PAGE'),
   },
   {
      path: '/project/stage',
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.CreateProject.Stage />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_CREATE_PROJECT_PAGE'),
   },
   {
      path: '/project/revenue',
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.CreateProject.Revenue />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_CREATE_PROJECT_PAGE'),
   },
   {
      path: '/project/funding-sources',
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.CreateProject.FundingSources />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_CREATE_PROJECT_PAGE'),
   },
   {
      path: '/project/additional-info',
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.CreateProject.AdditionalInfo />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_CREATE_PROJECT_PAGE'),
   },
   {
      path: '/project/logo',
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.CreateProject.Logo />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_CREATE_PROJECT_PAGE'),
   },
   {
      path: '/project/background',
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.CreateProject.Background />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_CREATE_PROJECT_PAGE'),
   },
   {
      path: '/project/invites',
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.CreateProject.Invites />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_CREATE_PROJECT_PAGE'),
   },
   {
      path: '/projects/me/:id/details',
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.MyProject.Details />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_PROJECT_DETAILS_PAGE'),
   },
   {
      path: '/projects/me/:id/edit/basic',
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.EditProject.Detail />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_EDIT_PROJECT_PAGE'),
   },
   {
      path: '/projects/me/:id/edit/stage',
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.EditProject.Stage />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_EDIT_PROJECT_PAGE'),
   },
   {
      path: '/projects/me/:id/edit/revenue',
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.EditProject.Revenue />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_EDIT_PROJECT_PAGE'),
   },
   {
      path: '/projects/me/:id/edit/funding-sources',
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.EditProject.FundingSources />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_EDIT_PROJECT_PAGE'),
   },
   {
      path: '/projects/me/:id/edit/additional-info',
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.EditProject.AdditionalInfo />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_EDIT_PROJECT_PAGE'),
   },
   {
      path: '/projects/me/:id/edit/logo',
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.EditProject.Logo />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_EDIT_PROJECT_PAGE'),
   },
   {
      path: '/projects/me/:id/edit/background',
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.EditProject.Background />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_EDIT_PROJECT_PAGE'),
   },
   {
      path: '/project/details/members',
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.MyProject.Members />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_PROJECT_MEMBERS_PAGE'),
   },
   {
      path: '/project/details/setting',
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.MyProject.ProjectManage />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_PROJECT_SETTING_PAGE'),
   },
   {
      path: '/conversation',
      element: withSuspense(
         <AppLayout>
            <Message />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_MESSAGES_PAGE'),
   },
   {
      path: '/conversation/:id',
      element: withSuspense(
         <AppLayout>
            <Message />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_CONVERSATION_PAGE'),
   },
   {
      path: '/account-settings',
      element: withSuspense(
         <AppLayout>
            <AccountSettingsFeatures.Main />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_ACCOUNT_SETTINGS_PAGE'),
   },
   {
      path: '/account-settings/profile-visibility',
      element: withSuspense(
         <AppLayout>
            <AccountSettingsFeatures.ProfileVisibility />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_PROFILE_VISIBILITY_PAGE'),
   },
   {
      path: '/account-settings/privacy-and-security',
      element: withSuspense(
         <AppLayout>
            <AccountSettingsFeatures.PrivacyAndSecurity />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_PRIVACY_AND_SECURITY_PAGE'),
   },
   {
      path: '/account-settings/shop',
      element: withSuspense(
         <AppLayout>
            <AccountSettingsFeatures.Shop />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_SHOP_PAGE'),
   },
   {
      path: '/account-settings/block-list',
      element: withSuspense(
         <AppLayout>
            <AccountSettingsFeatures.BlockList />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_BLOCK_LIST_PAGE'),
   },
   {
      path: '/account-settings/export-data',
      element: withSuspense(
         <AppLayout>
            <AccountSettingsFeatures.ExportData />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_EXPORT_DATA_PAGE'),
   },
   {
      path: '/messages-sidebar',
      element: withSuspense(
         <AppLayout>
            <MessageSidebar />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_MESSAGES_SIDEBAR_PAGE'),
   },
   {
      path: '/interview/:projectId',
      element: withSuspense(<Interview />),
      loader: createLoader(true, 'LOAD_INTERVIEW_PAGE'),
   },
]

const routes = createBrowserRouter(router)

export default routes
