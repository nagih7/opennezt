import { createSlice } from '@reduxjs/toolkit'
import { NotificationState } from './types'
import { toast } from 'sonner'

// Define the initial state with TypeScript typing
const initialState: NotificationState = {
   // =========== Get Notification =========== //
   notifications: [],
   isLoadingGetNotifications: false,
   // =========== Reply Notification =========== //
   requestAddFriend: {},
   paginationListNotification: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
   },
   totalFriends: 0,
   loadingGetNotifications: false,
   loadingSendRequestAddFriend: false,
   isLoadingReplyNotification: false,
   loadingMarkAsRead: false,
}

const notificationSlice = createSlice({
   name: 'notification',
   initialState,
   reducers: {
      startRequestReadRoot: (state) => ({
         ...state,
      }),
      startRequestReadRootSuccess: (state, action) => ({
         ...state,
         notifications: action.payload.data.notifications,
         loadingGetNotifications: false,
         paginationListNotification: {
            currentPage: action.payload.data.page,
            perPage: action.payload.data.per_page,
            totalPage: action.payload.data.last_page,
            totalRecord: action.payload.data.total,
         },
      }),
      startRequestReadRootFail: (state) => ({
         ...state,
         loadingGetNotifications: false,
      }),
      // =========== Get Notification =========== //
      requestGetNotifications: (state) => ({
         ...state,
         isLoadingGetNotifications: true,
      }),
      getNotificationsSuccess: (state, action) => ({
         ...state,
         notifications: action.payload.data,
         isLoadingGetNotifications: false,
      }),
      getNotificationsFail: (state) => ({
         ...state,
         isLoadingGetNotifications: false,
      }),
      requestReplyNotification: (state) => ({
         ...state,
         isLoadingReplyNotification: true,
      }),
      replyNotificationSuccess: (state, action) => {
         const newNotification = action.payload.data

         toast.success('Reply notification successfully.')
         return {
            ...state,
            notifications: state.notifications.map((notification) => {
               if (notification._id === newNotification._id) {
                  return {
                     ...notification,
                     metadata: newNotification.metadata,
                  }
               }
               return notification
            }),
            isLoadingReplyNotification: false,
         }
      },
      replyNotificationFail: (state) => {
         toast.error('Reply notification failed.')
         return {
            ...state,
            isLoadingReplyNotification: false,
         }
      },
      // =========== Set Notification =========== //
      setNotifications: (state, action) => ({
         ...state,
         notifications: [action.payload, ...state.notifications],
      }),
      // ========== Mask as read ========== //
      loadingMarkAsRead: (state) => ({
         ...state,
         loadingMarkAsRead: true,
      }),
      markAsReadSuccess: (state, action) => {
         const newNotification = action.payload.data
         return {
            ...state,
            notifications: state.notifications.map((notification) => {
               if (notification._id === newNotification._id) {
                  return {
                     ...notification,
                     metadata: newNotification.metadata,
                  }
               }
               return notification
            }),
            loadingMarkAsRead: false,
         }
      },
      markAsReadFail: (state) => {
         return {
            ...state,
            loadingMarkAsRead: false,
         }
      },
   },
})

export const {
   startRequestReadRoot,
   startRequestReadRootSuccess,
   startRequestReadRootFail,
   // =========== Get Notification =========== //
   requestGetNotifications,
   getNotificationsSuccess,
   getNotificationsFail,
   // =========== Reply Notification =========== //
   requestReplyNotification,
   replyNotificationSuccess,
   replyNotificationFail,
   // ========== Set Notification =========== //
   setNotifications,
   // ========== Mask as read ========== //
   loadingMarkAsRead,
   markAsReadSuccess,
   markAsReadFail,
} = notificationSlice.actions

export default notificationSlice.reducer
