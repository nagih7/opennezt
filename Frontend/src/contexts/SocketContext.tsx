import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { io, Socket } from 'socket.io-client'
import { RootState } from 'store/store.types'

// Create a context to share socket with other components
const SocketContext = createContext<Socket | null>(null)

// Socket server URL
const SOCKET_SERVER_URL = import.meta.env.VITE_API_URL

// Hook to use socket context with TypeScript
export const useSocket = (): Socket | null => {
   return useContext(SocketContext)
}

// Define props type for the SocketProvider component
interface SocketProviderProps {
   children: ReactNode
}

// Socket provider component - manages socket connection
export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
   const { authUser } = useSelector((state: RootState) => state.auth)
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
            const token = localStorage.getItem('token')
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

   return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}
