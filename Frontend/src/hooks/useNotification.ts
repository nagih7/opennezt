import { useState } from 'react'
import { postProjectDetailsActivitiesNewMember } from '~/api/activity'
import { replyNotification, markAsRead } from '~/api/notification'
import { RootState, useAppDispatch, useAppSelector } from '~/store'
import { Notification } from '~/types'

const useNotification = () => {
   const dispatch = useAppDispatch()

   // Store
   const { notifications, isLoadingReplyNotification } = useAppSelector((state: RootState) => state.notification)

   // State
   const [notificationIndex, setNotificationIndex] = useState<number | null>(null)

   // Function
   const handleReplyNotification = (notification_id: string, action: string, index?: number) => {
      if (index !== undefined) {
         setNotificationIndex(index)
      }
      dispatch(replyNotification(notification_id, action))
      if (action === 'confirm') {
         postProjectDetailsActivitiesNewMember(notification_id)
      }
   }

   const handleMarkAsRead = async (notification: Notification) => {
      if (notification.metadata?.read === false) {
         await dispatch(markAsRead(notification._id))
      }
   }

   return {
      notifications,
      notificationIndex,
      isLoadingReplyNotification,
      handleReplyNotification,
      handleMarkAsRead,
   }
}

export default useNotification
