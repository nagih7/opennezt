import callReduxApi from '../callReduxApi'
import { requestWebPush, webPushSuccess, webPushFail } from '../../store/modules/app'

// ========== WEB PUSH ========== //
export const subscribe = (payload) => async (dispatch, getState) => {
   return callReduxApi({
      method: 'post',
      apiPath: '/subscribe',
      actionTypes: [requestWebPush, webPushSuccess, webPushFail],
      variables: payload,
      dispatch,
      getState,
   })
}

export const unsubscribe = (payload) => async (dispatch, getState) => {
   return callReduxApi({
      method: 'post',
      apiPath: '/subscribe/unsubscribe',
      actionTypes: [requestWebPush, webPushSuccess, webPushFail],
      variables: payload,
      dispatch,
      getState,
   })
}

export const trackingEvent = (payload) => async (dispatch, getState) => {
   return callReduxApi({
      method: 'post',
      apiPath: '/subscribe/notification-event',
      actionTypes: [requestWebPush, webPushSuccess, webPushFail],
      variables: payload,
      dispatch,
      getState,
   })
}

export const fetchStats = () => async (dispatch, getState) => {
   return callReduxApi({
      method: 'get',
      apiPath: '/subscribe/stats',
      actionTypes: [requestWebPush, webPushSuccess, webPushFail],
      variables: {},
      dispatch,
      getState,
   })
}
