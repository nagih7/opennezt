import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSocket } from 'context/SocketContext'
import {
    CONFIRM_FRIEND_REQUEST_NOTIFICATION,
    CONFIRM_PROJECT_INVITATION_NOTIFICATION,
    FRIEND_REQUEST_NOTIFICATION,
    MESSAGE_TYPE,
} from 'utils/constants'
import { getConversations } from 'api/chat'
import { PROJECT_INVITATION_NOTIFICATION } from 'utils/constants'
import { setNotifications } from 'states/modules/notification'
import { setMessages } from 'states/modules/chat'
import ModalMatchingProjects from 'components/common/ModalMatchingProjects'

export const RealtimeContext = React.createContext()

export const RealtimeProvider = ({ children }) => {
    const dispatch = useDispatch()
    const socket = useSocket()
    // ======================== SOCKET EVENTS ======================== //
    const handleSocketEvents = () => {
        // ========== FRIEND REQUEST NOTIFICATION ========== //
        socket.on(FRIEND_REQUEST_NOTIFICATION, async (notification) => {
            dispatch(setNotifications(notification))
        })

        // ========== CONFIRM FRIEND REQUEST NOTIFICATION ========== //
        socket.on(CONFIRM_FRIEND_REQUEST_NOTIFICATION, async (notification) => {
            dispatch(setNotifications(notification))
            dispatch(getConversations())
        })

        // =========== MESSAGE ============ //
        socket.on(MESSAGE_TYPE, async (message) => {
            dispatch(setMessages({ message }))
        })

        // CONFIRM PROJECT INVITATION
        socket.on(PROJECT_INVITATION_NOTIFICATION, async (notification) => {
            dispatch(setNotifications(notification))
        })

        // ========== CONFIRM PROJECT INVITATION ========== //
        socket.on(CONFIRM_PROJECT_INVITATION_NOTIFICATION, async (notification) => {
            dispatch(setNotifications(notification))
            dispatch(getConversations())
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

    return (
        <RealtimeContext.Provider>
            <ModalMatchingProjects />
            {children}
        </RealtimeContext.Provider>
    )
}
