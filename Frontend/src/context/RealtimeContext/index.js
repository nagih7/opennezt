import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSocket } from 'context/SocketContext'
import { getNotifications } from 'api/notification'
import { toaster } from 'components/UI/toaster'
import { CONFIRM_FRIEND_REQUEST_NOTIFICATION, FRIEND_REQUEST_NOTIFICATION, MESSAGE_TYPE } from 'utils/constants'
import { getConversations } from 'api/chat'
import { PROJECT_INVITATION_NOTIFICATION } from 'utils/constants'
import { setNotifications } from 'states/modules/notification'
import { setMessages } from 'states/modules/chat'

export const RealtimeContext = React.createContext()

export const RealtimeProvider = ({ children }) => {
    const dispatch = useDispatch()
    const socket = useSocket()
    // ======================== SOCKET EVENTS ======================== //
    const handleUpdateNotification = async (notification) => {
        dispatch(setNotifications(notification))
    }

    const handleSocketEvents = () => {
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
            })
            await handleUpdateNotification(notification)
        })

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
            })
            dispatch(getConversations())
        })

        // =========== MESSAGE ============ //
        socket.on(MESSAGE_TYPE, async (message) => {
            dispatch(setMessages({ message }))
        })

        // CONFIRM PROJECT INVITATION
        socket.on(PROJECT_INVITATION_NOTIFICATION, (notification) => {
            console.log('PROJECT_INVITATION_NOTIFICATION', notification)
            toaster.create({
                title: `${notification.user.name} invited you to join ${notification.project.name}`,
                type: 'info',
                duration: 10000,
                action: {
                    label: 'View',
                    onClick: () => console.log('View'),
                },
            })
        })
    }

    useEffect(() => {
        if (!socket) return

        // Handle new websocket events
        handleSocketEvents()

        // Clean up
        return () => {
            socket.off('new_notification')
            socket.off('confirm_add_friend')
            socket.off('confirm_project_invitation')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, dispatch])

    return <RealtimeContext.Provider>{children}</RealtimeContext.Provider>
}
