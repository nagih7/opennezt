import React, { useEffect, createContext, ReactNode } from 'react'
import { useDispatch } from 'react-redux'
import { useSocket } from './index'
import {
   CONFIRM_FRIEND_REQUEST_NOTIFICATION,
   CONFIRM_PROJECT_INVITATION_NOTIFICATION,
   FRIEND_REQUEST_NOTIFICATION,
   MESSAGE_TYPE,
   PROJECT_INVITATION_NOTIFICATION,
} from 'utils/constants'
import { getConversations } from 'api/chat'
import { setNotifications } from 'store/modules/notification'
import { setMessages } from 'store/modules/chat'
import ModalMatchingProjects from 'components/common/ModalMatchingProjects'
import { Socket } from 'socket.io-client'
import { AppDispatch } from 'store/store.types'
import { Notification } from 'types/notification'
import { Message } from 'types/message'

// Define the context type
type RealtimeContextType = Record<string, unknown>

// Create the context with an empty default value
export const RealtimeContext = createContext<RealtimeContextType>({})

interface RealtimeProviderProps {
   children: ReactNode
}

export const RealtimeProvider: React.FC<RealtimeProviderProps> = ({ children }) => {
   const dispatch = useDispatch<AppDispatch>()
   const socket = useSocket() as Socket | null

   useEffect(() => {
      if (!socket) return

      // ========== FRIEND REQUEST NOTIFICATION ========== //
      socket.on(FRIEND_REQUEST_NOTIFICATION, (notification: Notification) => {
         dispatch(setNotifications(notification))
      })

      // ========== CONFIRM FRIEND REQUEST NOTIFICATION ========== //
      socket.on(CONFIRM_FRIEND_REQUEST_NOTIFICATION, (notification: Notification) => {
         dispatch(setNotifications(notification))
         dispatch(getConversations())
      }) // =========== MESSAGE ============ //
      socket.on(MESSAGE_TYPE, (message: Message) => {
         dispatch(setMessages({ message }))
      })

      // ========== PROJECT INVITATION ========== //
      socket.on(PROJECT_INVITATION_NOTIFICATION, (notification: Notification) => {
         dispatch(setNotifications(notification))
      })

      // ========== CONFIRM PROJECT INVITATION ========== //
      socket.on(CONFIRM_PROJECT_INVITATION_NOTIFICATION, (notification: Notification) => {
         dispatch(setNotifications(notification))
         dispatch(getConversations())
      })

      // Clean up
      return () => {
         socket.off(FRIEND_REQUEST_NOTIFICATION)
         socket.off(CONFIRM_FRIEND_REQUEST_NOTIFICATION)
         socket.off(MESSAGE_TYPE)
         socket.off(PROJECT_INVITATION_NOTIFICATION)
         socket.off(CONFIRM_PROJECT_INVITATION_NOTIFICATION)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [socket, dispatch])

   return (
      <RealtimeContext.Provider value={{}}>
         <ModalMatchingProjects />
         {children}
      </RealtimeContext.Provider>
   )
}
