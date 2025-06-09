import {
   IconlyActivity,
   IconlyAddUser,
   IconlyChat,
   IconlyFolder,
   IconlyHome,
   IconlyProfile,
   IconlyWork,
} from 'components/UI/Iconly'
import { RouteConfig } from 'types/route'
import { ROUTE_CONFIG, Sidebar } from '~/config/constants'

const appRouteMap: RouteConfig[] = [
   {
      label: Sidebar.HOME,
      icon: <IconlyHome size={24} color="#fff" />,
      path: '/',
      routeActive: ['/'],
      permissions: ['home_page'],
   },
   // {
   //    label: Sidebar.ACTIVITY,
   //    icon: <IconlyActivity size={24} color="#fff" />,
   //    path: ROUTE_CONFIG.USER.FEED.PREFIX,
   //    routeActive: [ROUTE_CONFIG.USER.FEED.PREFIX, ROUTE_CONFIG.USER.FEED.DETAIL],
   //    permissions: ['feed_page'],
   // },
   {
      label: Sidebar.ABOUT_ME,
      icon: <IconlyProfile size={24} color="#fff" />,
      path: ROUTE_CONFIG.USER.PROFILE.PREFIX,
      routeActive: [ROUTE_CONFIG.USER.PROFILE.PREFIX],
      permissions: ['profile_page'],
   },
   {
      label: Sidebar.PROJECT,
      icon: <IconlyFolder size={24} color="#fff" />,
      path: ROUTE_CONFIG.USER.PROJECT.PREFIX,
      routeActive: [
         ROUTE_CONFIG.USER.PROJECT.PREFIX,
         ROUTE_CONFIG.USER.PROJECT.ME.PREFIX,
         ROUTE_CONFIG.USER.PROJECT.ME.DETAIL,
         ROUTE_CONFIG.USER.PROJECT.CREATE.PREFIX,
         ROUTE_CONFIG.USER.PROJECT.CREATE.BASIC,
         ROUTE_CONFIG.USER.PROJECT.CREATE.STAGE,
         ROUTE_CONFIG.USER.PROJECT.CREATE.REVENUE,
         ROUTE_CONFIG.USER.PROJECT.CREATE.FUNDING,
         ROUTE_CONFIG.USER.PROJECT.CREATE.DESCRIPTION,
         ROUTE_CONFIG.USER.PROJECT.CREATE.LOGO,
         ROUTE_CONFIG.USER.PROJECT.CREATE.BACKGROUND,
         ROUTE_CONFIG.USER.PROJECT.CREATE.INVITE,
         ROUTE_CONFIG.USER.PROJECT.CREATE.MEDIA,
      ],
      permissions: ['projects_page'],
   },
   {
      label: Sidebar.RECRUIT_TALENTS,
      icon: <IconlyAddUser size={24} color="#fff" />,
      path: ROUTE_CONFIG.USER.RECRUIT_TALENT.PREFIX,
      routeActive: [ROUTE_CONFIG.USER.RECRUIT_TALENT.PREFIX],
      permissions: ['recruit_talents_page'],
   },
   {
      label: Sidebar.SEEK_PROJECTS,
      icon: <IconlyWork size={24} color="#fff" />,
      path: ROUTE_CONFIG.USER.SEEK_PROJECT.PREFIX,
      routeActive: [ROUTE_CONFIG.USER.SEEK_PROJECT.PREFIX],
      permissions: ['seek_projects_page'],
   },
   {
      label: Sidebar.MESSAGES,
      icon: <IconlyChat size={24} color="#fff" />,
      path: ROUTE_CONFIG.USER.CONVERSATION.PREFIX,
      routeActive: [ROUTE_CONFIG.USER.CONVERSATION.PREFIX, ROUTE_CONFIG.USER.CONVERSATION.DETAIL],
      permissions: ['conversation_page'],
   },
]

export default appRouteMap
