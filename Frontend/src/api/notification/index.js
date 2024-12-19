import callApi from "api/callApi";
import {
	startRequestGetNotifications,
	startRequestGetNotificationsSuccess,
	startRequestGetNotificationsFail,
	startRequestReplyNotification,
	startRequestReplyNotificationSuccess,
	startRequestReplyNotificationFail,
	startRequestMessage,
	startRequestMessageSuccess,
	startRequestMessageFail,
} from "states/modules/notification";

export const getNotifications = () => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: "notification",
		actionTypes: [
			startRequestGetNotifications,
			startRequestGetNotificationsSuccess,
			startRequestGetNotificationsFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};

export const replyNotification = (data) => async (dispatch, getState) => {
	return callApi({
		method: "put",
		apiPath: "notification/reply",
		actionTypes: [
			startRequestReplyNotification,
			startRequestReplyNotificationSuccess,
			startRequestReplyNotificationFail,
		],
		variables: data,
		dispatch,
		getState,
	});
};

export const requestMessage =
	(requestMessageData) => async (dispatch, getState) => {
		return callApi({
			method: "post",
			apiPath: `notification/request-message`,
			actionTypes: [
				startRequestMessage,
				startRequestMessageSuccess,
				startRequestMessageFail,
			],
			variables: requestMessageData,
			dispatch,
			getState,
		});
	};
