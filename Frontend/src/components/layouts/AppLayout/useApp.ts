import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAuthRole } from '~/api/auth'
import { getConversations } from '~/api/chat'
import { getNotifications } from '~/api/notification'
import { AppDispatch, RootState, useAppSelector } from '~/store'

const useApp = () => {
   const dispatch = useDispatch<AppDispatch>()
   const { authRole, isAuthSuccess } = useAppSelector((state: RootState) => state.auth)

   useEffect(() => {
      dispatch(getAuthRole())
      dispatch(getConversations())
      dispatch(getNotifications())
   }, [dispatch])
   return {
      isAuth: isAuthSuccess,
      isAdmin: authRole === 'admin',
      isUser: authRole === 'user',
   }
}

export default useApp
