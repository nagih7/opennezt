import React, { useEffect, createContext, ReactNode } from 'react'
import { useDispatch } from 'react-redux'
import { getConversations } from 'api/chat'
import { getNotifications } from 'api/notification'
import { getAuthRole } from 'api/auth'
import { AppDispatch } from 'store/store.types'

// Define the context type
type AppContextType = Record<string, unknown>

// Create the context with an initial empty object
export const AppContext = createContext<AppContextType>({})

interface AppProviderProps {
   children: ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
   const dispatch = useDispatch<AppDispatch>()

   useEffect(() => {
      dispatch(getAuthRole())
      dispatch(getConversations())
      dispatch(getNotifications())
   }, [dispatch])

   return <AppContext.Provider value={{}}>{children}</AppContext.Provider>
}
