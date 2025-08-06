import { useAppSelector } from '~/store'
import { RootState } from '~/store'

const useHeader = () => {
   const authUser = useAppSelector((state: RootState) => state.auth.authUser)
   const { notifications } = useAppSelector((state: RootState) => state.notification)
   const unreadNotifications = notifications.filter((notification) => notification.metadata?.read === false)

   return {
      authUser,
      notifications,
      unreadNotifications,
   }
}

export default useHeader
