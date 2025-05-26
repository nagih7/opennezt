import { IconlyAddUser, IconlyChat, IconlyFolder, IconlyHome, IconlyProfile, IconlyWork } from 'components/UI/Iconly'
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
      routeActive: [ROUTE_CONFIG.USER.PROJECT.PREFIX],
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
      routeActive: [ROUTE_CONFIG.USER.CONVERSATION.PREFIX],
      permissions: ['conversation_page'],
   },
]

export default appRouteMap
