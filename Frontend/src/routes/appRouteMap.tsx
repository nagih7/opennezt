import React from 'react'
import { NAVBAR_LABEL } from 'utils/constants'
import { IconlyAddUser, IconlyChat, IconlyFolder, IconlyHome, IconlyProfile, IconlyWork } from 'components/UI/Iconly'
import { RouteConfig } from 'types/route'

const appRouteMap: RouteConfig[] = [
   {
      label: NAVBAR_LABEL.HOME,
      icon: <IconlyHome size={24} color="#000" />,
      path: '/',
      routeActive: ['/'],
      permissions: ['home_page'],
   },
   {
      label: NAVBAR_LABEL.ABOUT_ME,
      icon: <IconlyProfile size={24} color="#000" />,
      path: '/about',
      routeActive: ['/about'],
      permissions: ['about_page'],
   },
   {
      label: NAVBAR_LABEL.PROJECT,
      icon: <IconlyFolder size={24} color="#000" />,
      path: '/projects',
      routeActive: ['/projects'],
      permissions: ['projects_page'],
   },
   {
      label: NAVBAR_LABEL.RECRUIT_TALENTS,
      icon: <IconlyAddUser size={24} color="#000" />,
      path: '/recruit-talents',
      routeActive: ['/recruit-talents'],
      permissions: ['recruit_talents_page'],
   },
   {
      label: NAVBAR_LABEL.SEEK_PROJECTS,
      icon: <IconlyWork size={24} color="#000" />,
      path: '/seek-projects',
      routeActive: ['/seek-projects'],
      permissions: ['seek_projects_page'],
   },
   {
      label: NAVBAR_LABEL.MESSAGES,
      icon: <IconlyChat size={24} color="#000" />,
      path: '/conversation',
      routeActive: ['/conversation'],
      permissions: ['conversation_page'],
   },
]

export default appRouteMap
