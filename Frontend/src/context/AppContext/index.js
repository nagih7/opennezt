import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getConversations } from 'api/chat'
import { getNotifications } from 'api/notification'
import { getAuthRole } from 'api/auth'

export const AppContext = React.createContext()

export const AppProvider = ({ children }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAuthRole())
        dispatch(getConversations())
        dispatch(getNotifications())
    }, [dispatch])

    return <AppContext.Provider>{children}</AppContext.Provider>
}
