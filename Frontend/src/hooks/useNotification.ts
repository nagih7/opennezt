import { useSelector, useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { RootState, Notification } from 'types'
import store from 'store/configureStore'
import { markAsRead, replyNotification } from 'api/notification'

/**
 * Custom hook for notification functionality
 * @returns Notification state and functions
 */
export const useNotification = () => {
   const dispatch = useDispatch()
   const { notifications, isLoadingReplyNotification } = useSelector((state: RootState) => state.notification)

   /**
    * Mark a notification as read
    * @param notification Notification to mark as read
    */
   const markNotificationAsRead = useCallback(async (notification: Notification) => {
      if (notification.metadata?.read === false) {
         await store.dispatch(markAsRead(notification._id))
      }
   }, [])

   /**
    * Reply to a notification
    * @param notificationId ID of notification
    * @param action Action to take ('confirm' or 'delete')
    */
   const replyToNotification = useCallback(async (notificationId: string, action: string) => {
      await store.dispatch(replyNotification(notificationId, action))
   }, [])

   /**
    * Get unread notifications
    * @returns Array of unread notifications
    */
   const getUnreadNotifications = useCallback((): Notification[] => {
      return notifications.filter((notification) => notification.metadata?.read === false)
   }, [notifications])

   /**
    * Get read notifications
    * @returns Array of read notifications
    */
   const getReadNotifications = useCallback((): Notification[] => {
      return notifications.filter((notification) => notification.metadata?.read === true)
   }, [notifications])

   /**
    * Get notification count
    * @returns Total number of notifications
    */
   const getNotificationCount = useCallback((): number => {
      return notifications.length
   }, [notifications])

   /**
    * Get unread notification count
    * @returns Number of unread notifications
    */
   const getUnreadNotificationCount = useCallback((): number => {
      return getUnreadNotifications().length
   }, [getUnreadNotifications])

   return {
      notifications,
      unreadNotifications: getUnreadNotifications(),
      readNotifications: getReadNotifications(),
      isLoadingReplyNotification,
      markNotificationAsRead,
      replyToNotification,
      getNotificationCount,
      getUnreadNotificationCount,
   }
}

export default useNotification
