import React, { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAppDispatch, useAppSelector } from '~/store'
import { BaseComponentProps } from '~/types'
import {
   CONFIRM_FRIEND_REQUEST_NOTIFICATION,
   CONFIRM_PROJECT_INVITATION_NOTIFICATION,
   FRIEND_REQUEST_NOTIFICATION,
   MESSAGE_TYPE,
   PROJECT_INVITATION_NOTIFICATION,
} from 'utils/constants'
import { setNotifications } from '~/store/modules/notification'
import { Notification } from '~/types/notification'
import { API_URL } from '~/config/constants/env'

// Create a context to share socket with other components
const SocketContext = createContext<Socket | null>(null)

// Socket server URL
const SOCKET_SERVER_URL = API_URL

// Hook to use socket context with TypeScript
export const useSocket = (): Socket | null => {
   return useContext(SocketContext)
}

// Socket provider component - manages socket connection and realtime events
export const SocketProvider: React.FC<BaseComponentProps> = ({ children }) => {
   const { authUser } = useAppSelector((state) => state.auth)
   const dispatch = useAppDispatch()
   const [socket, setSocket] = useState<Socket | null>(null)

   // Connect socket when component is rendered
   useEffect(() => {
      if (authUser) {
         // Set up socket connection
         const socketInstance = io(SOCKET_SERVER_URL)

         // Handle 'connect' event when connection is established
         socketInstance.on('connect', () => {
            console.log('Connected to socket server...')

            // Get token from localStorage and emit 'login' event
            const token = localStorage.getItem('user_token')
            socketInstance.emit('login', token)
         })

         // Handle 'disconnect' event
         socketInstance.on('disconnect', () => {
            console.log('Disconnected from socket server')
         })

         setSocket(socketInstance)

         // Cleanup when component unmounts
         return () => {
            socketInstance.disconnect()
         }
      }
   }, [authUser])

   // Set up event listeners for notifications and messages
   useEffect(() => {
      if (!socket) return

      socket.on(FRIEND_REQUEST_NOTIFICATION, (notification: Notification) => {
         dispatch(setNotifications(notification))
      })

      socket.on(CONFIRM_FRIEND_REQUEST_NOTIFICATION, (notification: Notification) => {
         dispatch(setNotifications(notification))
         // dispatch(getConversations())
      })

      socket.on(PROJECT_INVITATION_NOTIFICATION, (notification: Notification) => {
         dispatch(setNotifications(notification))
      })

      socket.on(CONFIRM_PROJECT_INVITATION_NOTIFICATION, (notification: Notification) => {
         dispatch(setNotifications(notification))
         // dispatch(getConversations())
      })

      // Clean up
      return () => {
         socket.off(FRIEND_REQUEST_NOTIFICATION)
         socket.off(CONFIRM_FRIEND_REQUEST_NOTIFICATION)
         socket.off(MESSAGE_TYPE)
         socket.off(PROJECT_INVITATION_NOTIFICATION)
         socket.off(CONFIRM_PROJECT_INVITATION_NOTIFICATION)
      }
   }, [socket, dispatch])

   return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}
