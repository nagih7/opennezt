import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSocket } from 'context/SocketContext';
import { getNotifications } from 'api/notification';
import { toaster } from 'components/UI/toaster';
import { CONFIRM_FRIEND_REQUEST_NOTIFICATION, FRIEND_REQUEST_NOTIFICATION } from 'utils/constants';
import { getConversations } from 'api/chat';

export const RealtimeContext = React.createContext();

export const RealtimeProvider = ({ children }) => {
    const dispatch = useDispatch();
    const socket = useSocket();

    // Handle new websocket events
    const handleSocketEvents = () => {
        // Handle new notification
        const handleNewNotification = (notification) => {
            toaster.create({
                type: 'success',
                title:
                    notification.type_name === 'Project Invitation'
                        ? `${notification.metadata.source_name} invited you to join ${notification.metadata.project_name}`
                        : `${notification.metadata.source_name} sent you a friend request`,
                duration: 100,
            });
            dispatch(getNotifications());
        };

        // NEW PROJECT INVITATION
        socket.on('new_notification', handleNewNotification);

        // ========== FRIEND REQUEST NOTIFICATION ========== //
        socket.on(FRIEND_REQUEST_NOTIFICATION, async (notification) => {
            toaster.create({
                title: `${notification.user.name} sent you a friend request`,
                description: 'Click here to view',
                type: 'info',
                duration: 10000,
                action: {
                    label: 'View',
                    onClick: () => console.log('View'),
                },
            });
        });

        // ========== CONFIRM FRIEND REQUEST NOTIFICATION ========== //
        socket.on(CONFIRM_FRIEND_REQUEST_NOTIFICATION, async (user) => {
            toaster.create({
                title: `${user.name} accepted your friend request`,
                type: 'success',
                duration: 10000,
                action: {
                    label: 'View',
                    onClick: () => console.log('View'),
                },
            });
            // GET CONVERSATIONS
            dispatch(getConversations());
        });

        // CONFIRM ADD FRIEND
        socket.on('confirm_add_friend', (name) => {
            toaster.create({
                title: `${name} accepted your friend request`,
                type: 'success',
                duration: 100,
            });
        });

        // CONFIRM PROJECT INVITATION
        socket.on('confirm_project_invitation', (name) => {
            toaster.create({
                title: `${name} accepted your project invitation`,
                type: 'success',
                duration: 100,
            });
            // dispatch(getChatList());
        });
    };

    useEffect(() => {
        if (!socket) return;

        // Handle new websocket events
        handleSocketEvents();

        // Clean up
        return () => {
            socket.off('new_notification');
            socket.off('confirm_add_friend');
            socket.off('confirm_project_invitation');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, dispatch]);

    return <RealtimeContext.Provider>{children}</RealtimeContext.Provider>;
};
