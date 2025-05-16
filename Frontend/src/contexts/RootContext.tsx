import React, { ReactNode, createContext } from 'react'
import { useSelector } from 'react-redux'
import { SocketProvider } from './SocketContext'
import { WebPushProvider } from './WebPushContext'
import { AppProvider } from './AppContext'

// Define the context type
type RootContextType = any // Use a more specific type if needed

// Create the context with an initial value
export const RootContext = createContext<RootContextType>(undefined)

interface RootProviderProps {
   children: ReactNode
}

interface AuthState {
   isAuthSuccess: boolean
}

const RootProvider: React.FC<RootProviderProps> = ({ children }) => {
   const { isAuthSuccess } = useSelector((state: { auth: AuthState }) => state.auth)

   switch (isAuthSuccess) {
      case true:
         return (
            <RootContext.Provider value={undefined}>
               <SocketProvider>
                  <AppProvider>
                     <WebPushProvider>{children}</WebPushProvider>
                  </AppProvider>
               </SocketProvider>
            </RootContext.Provider>
         )
      default:
         return <RootContext.Provider value={undefined}>{children}</RootContext.Provider>
   }
}

export default RootProvider
