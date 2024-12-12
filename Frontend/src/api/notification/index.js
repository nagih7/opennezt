import callApi from "api/callApi";
import {
	startRequestGetNotifications,
	startRequestGetNotificationsSuccess,
	startRequestGetNotificationsFail,
	startRequestUpdateChatInvitation,
	startRequestUpdateChatInvitationSuccess,
	startRequestUpdateChatInvitationFail,
} from "states/modules/notification";

export const getNotifications = () => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: "users/notifications",
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

export const updateChatInvitation = (data) => async (dispatch, getState) => {
	return callApi({
		method: "put",
		apiPath: "notification/chat-invitation",
		actionTypes: [
			startRequestUpdateChatInvitation,
			startRequestUpdateChatInvitationSuccess,
			startRequestUpdateChatInvitationFail,
		],
		variables: data,
		dispatch,
		getState,
	});
};
