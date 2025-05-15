import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toaster } from 'components/UI/toaster'
import { NotificationState } from './types'

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
      startRequestReadRoot: (state: NotificationState) => ({
         ...state,
      }),
      startRequestReadRootSuccess: (state: NotificationState, action: PayloadAction<any>) => ({
         ...state,
         notifications: action.payload.data.notifications,
         loadingGetNotifications: false,
         paginationListNotification: {
            currentPage: action.payload.data.page,
            perPage: action.payload.data.per_page,
            totalPage: action.payload.data.total_page,
            totalRecord: action.payload.data.total,
         },
      }),
      startRequestReadRootFail: (state: NotificationState) => ({
         ...state,
         loadingGetNotifications: false,
      }),

      // =========== GET NOTIFICATIONS =========== //
      requestGetNotifications: (state: NotificationState) => ({
         ...state,
         loadingGetNotifications: true,
      }),
      getNotificationsSuccess: (state: NotificationState, action: PayloadAction<any>) => ({
         ...state,
         notifications: action.payload.data,
         isLoadingGetNotifications: false,
      }),
      getNotificationsFail: (state: NotificationState) => ({
         ...state,
         loadingGetNotifications: false,
      }),

      // =========== REPLY NOTIFICATION =========== //
      requestReplyNotification: (state: NotificationState) => ({
         ...state,
         isLoadingReplyNotification: true,
      }),
      replyNotificationSuccess: (state: NotificationState, action: PayloadAction<any>) => {
         const newNotification = action.payload.data
         toaster.create({
            title: `Reply notification successfully.`,
            type: 'success',
         })
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
      replyNotificationFail: (state: NotificationState) => ({
         ...state,
         isLoadingReplyNotification: false,
      }),

      // =========== MARK AS READ =========== //
      requestMarkAsRead: (state: NotificationState) => ({
         ...state,
         loadingMarkAsRead: true,
      }),
      markAsReadSuccess: (state: NotificationState, action: PayloadAction<any>) => {
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
      markAsReadFail: (state: NotificationState) => ({
         ...state,
         loadingMarkAsRead: false,
      }),
   },
})

export const {
   startRequestReadRoot,
   startRequestReadRootSuccess,
   startRequestReadRootFail,
   // =========== GET NOTIFICATIONS =========== //
   requestGetNotifications,
   getNotificationsSuccess,
   getNotificationsFail,
   // =========== REPLY NOTIFICATION =========== //
   requestReplyNotification,
   replyNotificationSuccess,
   replyNotificationFail,
   // =========== MARK AS READ =========== //
   requestMarkAsRead,
   markAsReadSuccess,
   markAsReadFail,
} = notificationSlice.actions

export default notificationSlice.reducer
