import { IconlyAddUser, IconlyChat, IconlyFolder, IconlyHome, IconlyProfile, IconlyWork } from 'components/UI/Iconly'
import { RouteConfig } from 'types/route'
import { Sidebar } from '~/config/constants'

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
      path: '/about',
      routeActive: ['/about'],
      permissions: ['about_page'],
   },
   {
      label: Sidebar.PROJECT,
      icon: <IconlyFolder size={24} color="#fff" />,
      path: '/projects',
      routeActive: ['/projects'],
      permissions: ['projects_page'],
   },
   {
      label: Sidebar.RECRUIT_TALENTS,
      icon: <IconlyAddUser size={24} color="#fff" />,
      path: '/recruit-talents',
      routeActive: ['/recruit-talents'],
      permissions: ['recruit_talents_page'],
   },
   {
      label: Sidebar.SEEK_PROJECTS,
      icon: <IconlyWork size={24} color="#fff" />,
      path: '/seek-projects',
      routeActive: ['/seek-projects'],
      permissions: ['seek_projects_page'],
   },
   {
      label: Sidebar.MESSAGES,
      icon: <IconlyChat size={24} color="#fff" />,
      path: '/conversation',
      routeActive: ['/conversation'],
      permissions: ['conversation_page'],
   },
]

export default appRouteMap
