import React from 'react'
import { createBrowserRouter, RouteObject, LoaderFunction } from 'react-router-dom'
import { rootLoader } from './rootLoader'
import withSuspense from './loadingFallback'
import { LoaderArgs } from '~/types'
import { ROUTE_CONFIG } from '~/config/constants/routes'

// Layouts
const AppLayout = React.lazy(() => import('components/layouts/AppLayout'))
const AuthLayout = React.lazy(() => import('components/layouts/AuthLayout'))

// Auth pages
const Login = React.lazy(() => import('components/pages/Auth/Login'))
const Register = React.lazy(() => import('components/pages/Auth/Register'))
const ForgotPassword = React.lazy(() => import('components/pages/Auth/ForgotPassword'))
const VerifyAuth = React.lazy(() => import('components/pages/Auth/Verify'))
const ResetPassword = React.lazy(() => import('components/pages/Auth/ResetPassword'))

// Main pages
const Home = React.lazy(() => import('components/pages/Home'))
const Profile = React.lazy(() => import('components/pages/Profile'))
const About = React.lazy(() => import('components/pages/About'))
const Message = React.lazy(() => import('components/pages/Message'))
const Project = React.lazy(() => import('components/pages/Project'))

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
   ProfessionalBackground: React.lazy(() => import('components/pages/EditProfile/components/ProfessionalBackground')),
   Educations: React.lazy(() => import('components/pages/EditProfile/components/Educations')),
   Certifications: React.lazy(() => import('components/pages/EditProfile/components/Certifications')),
   Skills: React.lazy(() => import('components/pages/EditProfile/components/Skills')),
   AdditionalInfo: React.lazy(() => import('components/pages/EditProfile/components/AdditionalInfo')),
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
   RecruitTalents: React.lazy(() => import('components/pages/RecruitTalents')),
   TalentDetails: React.lazy(() => import('components/pages/TalentDetails')),
   SeekProjects: React.lazy(() => import('components/pages/SeekProjects')),
   ProjectDetailsBySeek: React.lazy(() => import('components/pages/ProjectDetailsBySeek')),
}

// Other components
const Interview = React.lazy(() => import('~/components/pages/InterviewBeta/Preview'))

// Admin related pages
// const AdminFeatures = {
// }

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
   // Authentication routes
   {
      path: ROUTE_CONFIG.USER.LOGIN,
      element: withSuspense(
         <AuthLayout title={'Welcome back'} path="login">
            <Login />
         </AuthLayout>
      ),
      loader: createLoader(false, 'LOAD_AUTH_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.REGISTER,
      element: withSuspense(
         <AuthLayout title={'Register account'} path="register">
            <Register />
         </AuthLayout>
      ),
      loader: createLoader(false, 'LOAD_AUTH_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.VERIFY,
      element: withSuspense(<VerifyAuth />),
      loader: createLoader(false, 'LOAD_AUTH_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.RESET_PASSWORD,
      element: withSuspense(
         <AuthLayout title={'Reset password'} path="reset-password">
            <ResetPassword />
         </AuthLayout>
      ),
      loader: createLoader(false, 'LOAD_AUTH_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.FORGOT_PASSWORD,
      element: withSuspense(
         <AuthLayout title={'Forgot password'} path="forgot-password">
            <ForgotPassword />
         </AuthLayout>
      ),
      loader: createLoader(false, 'LOAD_AUTH_PAGE'),
   },

   // Application routes
   {
      path: ROUTE_CONFIG.USER.HOME,
      element: withSuspense(
         <AppLayout>
            <Home />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_HOME_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.ME,
      element: withSuspense(
         <AppLayout>
            <Profile />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_PROFILE_PAGE'),
   },
   // About routes
   {
      path: ROUTE_CONFIG.USER.PROFILE.PREFIX,
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
      path: ROUTE_CONFIG.USER.PROFILE.EDIT.PROFESSIONAL_BACKGROUND,
      element: withSuspense(
         <AppLayout>
            <EditProfileFeatures.ProfessionalBackground />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_EDIT_PROFILE_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.PROFILE.EDIT.EDUCATION,
      element: withSuspense(
         <AppLayout>
            <EditProfileFeatures.Educations />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_EDIT_PROFILE_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.PROFILE.EDIT.CERTIFICATION,
      element: withSuspense(
         <AppLayout>
            <EditProfileFeatures.Certifications />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_EDIT_PROFILE_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.PROFILE.EDIT.SKILL,
      element: withSuspense(
         <AppLayout>
            <EditProfileFeatures.Skills />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_EDIT_PROFILE_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.PROFILE.EDIT.DESCRIPTION,
      element: withSuspense(
         <AppLayout>
            <EditProfileFeatures.AdditionalInfo />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_EDIT_PROFILE_PAGE'),
   },
   // Project routes
   {
      path: ROUTE_CONFIG.USER.PROJECT.PREFIX,
      element: withSuspense(
         <AppLayout>
            <Project />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_PROJECT_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.PROJECT.DETAIL.PREFIX,
      element: withSuspense(
         <AppLayout>
            <TalentFeatures.ProjectDetailsBySeek />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_PROJECT_DETAIL_PAGE'),
   },
   // Create Project routes
   {
      path: ROUTE_CONFIG.USER.PROJECT.CREATE.PREFIX,
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.CreateProject.Details />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_CREATE_PROJECT_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.PROJECT.CREATE.BASIC,
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.CreateProject.Details />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_CREATE_PROJECT_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.PROJECT.CREATE.STAGE,
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.CreateProject.Stage />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_CREATE_PROJECT_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.PROJECT.CREATE.REVENUE,
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.CreateProject.Revenue />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_CREATE_PROJECT_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.PROJECT.CREATE.FUNDING,
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.CreateProject.FundingSources />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_CREATE_PROJECT_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.PROJECT.CREATE.DESCRIPTION,
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.CreateProject.AdditionalInfo />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_CREATE_PROJECT_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.PROJECT.CREATE.LOGO,
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.CreateProject.Logo />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_CREATE_PROJECT_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.PROJECT.CREATE.BACKGROUND,
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.CreateProject.Background />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_CREATE_PROJECT_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.PROJECT.CREATE.INVITE,
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.CreateProject.Invites />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_CREATE_PROJECT_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.PROJECT.ME.DETAIL,
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.MyProject.Details />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_PROJECT_DETAILS_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.PROJECT.ME.EDIT.BASIC,
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.EditProject.Detail />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_EDIT_PROJECT_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.PROJECT.ME.EDIT.STAGE,
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.EditProject.Stage />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_EDIT_PROJECT_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.PROJECT.ME.EDIT.REVENUE,
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.EditProject.Revenue />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_EDIT_PROJECT_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.PROJECT.ME.EDIT.FUNDING,
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.EditProject.FundingSources />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_EDIT_PROJECT_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.PROJECT.ME.EDIT.DESCRIPTION,
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.EditProject.AdditionalInfo />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_EDIT_PROJECT_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.PROJECT.ME.EDIT.LOGO,
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.EditProject.Logo />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_EDIT_PROJECT_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.PROJECT.ME.EDIT.BACKGROUND,
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.EditProject.Background />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_EDIT_PROJECT_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.PROJECT.ME.EDIT.MEMBER,
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.MyProject.Members />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_PROJECT_MEMBERS_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.PROJECT.ME.EDIT.SETTING,
      element: withSuspense(
         <AppLayout>
            <ProjectFeatures.MyProject.ProjectManage />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_PROJECT_SETTING_PAGE'),
   },
   // Talent routes
   {
      path: ROUTE_CONFIG.USER.RECRUIT_TALENT.PREFIX,
      element: withSuspense(
         <AppLayout>
            <TalentFeatures.RecruitTalents />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_RECRUIT_TALENTS_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.RECRUIT_TALENT.DETAIL,
      element: withSuspense(
         <AppLayout>
            <TalentFeatures.TalentDetails />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_TALENT_DETAILS_PAGE'),
   },
   // Seek Project routes
   {
      path: ROUTE_CONFIG.USER.SEEK_PROJECT.PREFIX,
      element: withSuspense(
         <AppLayout>
            <TalentFeatures.SeekProjects />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_SEEK_PROJECT_PAGE'),
   },

   {
      path: ROUTE_CONFIG.USER.CONVERSATION.PREFIX,
      element: withSuspense(
         <AppLayout>
            <Message />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_MESSAGES_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.CONVERSATION.DETAIL,
      element: withSuspense(
         <AppLayout>
            <Message />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_CONVERSATION_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.SETTING.PREFIX,
      element: withSuspense(
         <AppLayout>
            <AccountSettingsFeatures.Main />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_ACCOUNT_SETTINGS_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.SETTING.PROFILE,
      element: withSuspense(
         <AppLayout>
            <AccountSettingsFeatures.ProfileVisibility />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_PROFILE_VISIBILITY_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.SETTING.PRIVACY_POLICY,
      element: withSuspense(
         <AppLayout>
            <AccountSettingsFeatures.PrivacyAndSecurity />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_PRIVACY_AND_SECURITY_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.SETTING.SHOP,
      element: withSuspense(
         <AppLayout>
            <AccountSettingsFeatures.Shop />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_SHOP_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.SETTING.BLOCKLIST,
      element: withSuspense(
         <AppLayout>
            <AccountSettingsFeatures.BlockList />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_BLOCK_LIST_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.SETTING.EXPORT,
      element: withSuspense(
         <AppLayout>
            <AccountSettingsFeatures.ExportData />
         </AppLayout>
      ),
      loader: createLoader(true, 'LOAD_EXPORT_DATA_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.INTERVIEW.PREFIX,
      element: withSuspense(<Interview />),
      loader: createLoader(true, 'LOAD_INTERVIEW_PAGE'),
   },
   {
      path: ROUTE_CONFIG.USER.INTERVIEW.DETAIL,
      element: withSuspense(<Interview />),
      loader: createLoader(true, 'LOAD_INTERVIEW_PAGE'),
   },
]

const routes = createBrowserRouter(router)

export default routes
