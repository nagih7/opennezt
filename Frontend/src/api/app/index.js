import callApi from '../callApi'
import {
   // startRequest,
   // requestSuccess,
   // requestError,
   // ========== WEB PUSH ========== //
   requestWebPush,
   webPushSuccess,
   webPushFail,
} from '../../store/modules/app'

// export const getList = () => async (dispatch, getState) => {
//     return callApi({
//         method: 'get',
//         url: '/starter-pack/whitelist-round-status',
//         actionTypes: [startRequest, requestSuccess, requestError],
//         variables: {},
//         dispatch,
//         getState,
//     })
// }

// ========== WEB PUSH ========== //
export const subscribe = (payload) => async (dispatch, getState) => {
   return callApi({
      method: 'post',
      apiPath: '/subscribe',
      actionTypes: [requestWebPush, webPushSuccess, webPushFail],
      variables: payload,
      dispatch,
      getState,
   })
}

export const unsubscribe = (payload) => async (dispatch, getState) => {
   return callApi({
      method: 'post',
      apiPath: '/subscribe/unsubscribe',
      actionTypes: [requestWebPush, webPushSuccess, webPushFail],
      variables: payload,
      dispatch,
      getState,
   })
}

export const trackingEvent = (payload) => async (dispatch, getState) => {
   return callApi({
      method: 'post',
      apiPath: '/subscribe/notification-event',
      actionTypes: [requestWebPush, webPushSuccess, webPushFail],
      variables: payload,
      dispatch,
      getState,
   })
}

export const fetchStats = () => async (dispatch, getState) => {
   return callApi({
      method: 'get',
      apiPath: '/subscribe/stats',
      actionTypes: [requestWebPush, webPushSuccess, webPushFail],
      variables: {},
      dispatch,
      getState,
   })
}
