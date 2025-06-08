import callReduxApi from './callReduxApi'
import {
   startRequestReadRoot,
   startRequestReadRootSuccess,
   startRequestReadRootFail,
   // =========== Get Notification =========== //
   requestGetNotifications,
   getNotificationsSuccess,
   getNotificationsFail,
   // ========== Reply Notification =========== //
   requestReplyNotification,
   replyNotificationSuccess,
   replyNotificationFail,
   // ========== Mask as read ========== //
   loadingMarkAsRead,
   markAsReadSuccess,
   markAsReadFail,
} from '~/store/modules/notification'
import { AppDispatch } from '~/store'

// =========== Get Notification =========== //
export const getNotifications = () => async (dispatch: AppDispatch, getState: () => any) => {
   return callReduxApi({
      method: 'get',
      apiPath: 'notifications/read',
      actionTypes: [requestGetNotifications, getNotificationsSuccess, getNotificationsFail],
      variables: {},
      dispatch,
      getState,
   })
}

// =========== Reply Notification =========== //
export const replyNotification =
   (notificationId: string, action: () => any) => async (dispatch: AppDispatch, getState: () => any) => {
      return callReduxApi({
         method: 'put',
         apiPath: `notifications/${notificationId}/reply`,
         actionTypes: [requestReplyNotification, replyNotificationSuccess, replyNotificationFail],
         variables: { action },
         dispatch,
         getState,
      })
   }

export const readRoot =
   (
      dataFilter = {
         perPage: 10,
         page: 1,
         order: null,
      }
   ) =>
   async (dispatch: AppDispatch, getState: () => any) => {
      let path = `notification/notifications?per_page=${dataFilter.perPage}&page=${dataFilter.page}`

      // if (dataFilter.keySearch) {
      // 	path += `&q=${dataFilter.keySearch}`;
      // }

      // if (dataFilter.status && dataFilter.status.length > 0) {
      // 	path += `&status=${dataFilter.status}`;
      // }

      // if (dataFilter.order && dataFilter.column) {
      // 	path += `&order=${dataFilter.order}&column=${dataFilter.column}`;
      // }
      if (dataFilter.order) {
         path += `&order=${dataFilter.order}`
      }

      return callReduxApi({
         method: 'get',
         apiPath: path,
         actionTypes: [startRequestReadRoot, startRequestReadRootSuccess, startRequestReadRootFail],
         variables: {},
         dispatch,
         getState,
      })
   }

// =========== Mask as read =========== //
export const markAsRead = (notificationId: string) => async (dispatch: AppDispatch, getState: () => any) => {
   return callReduxApi({
      method: 'put',
      apiPath: `notifications/${notificationId}/read`,
      actionTypes: [loadingMarkAsRead, markAsReadSuccess, markAsReadFail],
      variables: {},
      dispatch,
      getState,
   })
}
