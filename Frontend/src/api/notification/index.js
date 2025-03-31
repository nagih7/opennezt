import callApi from 'api/callApi'
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
} from 'states/modules/notification'

// =========== Get Notification =========== //
export const getNotifications = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: 'notifications/read',
        actionTypes: [requestGetNotifications, getNotificationsSuccess, getNotificationsFail],
        variables: {},
        dispatch,
        getState,
    })
}

// =========== Reply Notification =========== //
export const replyNotification = (notificationId, action) => async (dispatch, getState) => {
    return callApi({
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
        }
    ) =>
    async (dispatch, getState) => {
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

        return callApi({
            method: 'get',
            apiPath: path,
            actionTypes: [startRequestReadRoot, startRequestReadRootSuccess, startRequestReadRootFail],
            variables: {},
            dispatch,
            getState,
        })
    }
