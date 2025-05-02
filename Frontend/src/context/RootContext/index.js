import React from 'react'
import { useSelector } from 'react-redux'
import { SocketProvider } from 'context/SocketContext'
import { WebPushProvider } from 'context/WebPushContext'
import { AppProvider } from 'context/AppContext'

export const RootContext = React.createContext()

export const RootProvider = ({ children }) => {
    const { isAuthSuccess } = useSelector((state) => state.auth)
    switch (isAuthSuccess) {
        case true:
            return (
                <RootContext.Provider>
                    <SocketProvider>
                        <AppProvider>
                            <WebPushProvider>{children}</WebPushProvider>
                        </AppProvider>
                    </SocketProvider>
                </RootContext.Provider>
            )
        default:
            return <RootContext.Provider>{children}</RootContext.Provider>
    }
}
