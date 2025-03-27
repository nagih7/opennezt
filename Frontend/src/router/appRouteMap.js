import React from 'react';
import { NAVBAR_LABEL } from 'utils/constants';
import {
    IconlyActivity,
    IconlyAddUser,
    IconlyChat,
    IconlyFolder,
    IconlyGraph,
    IconlyNotification,
    IconlyProfile,
    IconlyWork,
} from 'components/UI/Iconly';

const appRouteMap = [
    {
        label: NAVBAR_LABEL.ACTIVITY,
        icon: <IconlyActivity size={24} />,
        path: '/activity',
        routeActive: ['/activity'],
        permissions: ['activity_page'],
    },
    {
        label: NAVBAR_LABEL.ABOUT_ME,
        icon: <IconlyProfile size={24} />,
        path: '/about',
        routeActive: ['/about'],
        permissions: ['about_page'],
    },
    {
        label: NAVBAR_LABEL.PROJECT,
        icon: <IconlyFolder size={24} />,
        path: '/projects',
        routeActive: ['/projects'],
        permissions: ['projects_page'],
    },
    {
        label: NAVBAR_LABEL.RECRUIT_TALENTS,
        icon: <IconlyAddUser size={24} />,
        path: '/recruit-talents',
        routeActive: ['/recruit-talents'],
        permissions: ['recruit_talents_page'],
    },
    {
        label: NAVBAR_LABEL.SEEK_PROJECTS,
        icon: <IconlyWork size={24} />,
        path: '/seek-projects',
        routeActive: ['/seek-projects'],
        permissions: ['seek_projects_page'],
    },
    {
        label: NAVBAR_LABEL.NOTIFICATIONS,
        icon: <IconlyNotification size={24} />,
        path: '/notification-management',
        routeActive: ['/notification-management'],
        permissions: ['notification_management_page'],
    },
    {
        label: NAVBAR_LABEL.MESSAGES,
        icon: <IconlyChat size={24} />,
        path: '/conversation',
        routeActive: ['/conversation'],
        permissions: ['conversation_page'],
    },
];

export default appRouteMap;
