import callApi from "api/callApi";
import {
	startRequestGetNotifications,
	startRequestGetNotificationsSuccess,
	startRequestGetNotificationsFail,
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
