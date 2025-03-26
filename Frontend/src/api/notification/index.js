import callApi from "api/callApi";
import {
	startRequestReadRoot,
	startRequestReadRootSuccess,
	startRequestReadRootFail,
	startRequestGetNotifications,
	startRequestGetNotificationsSuccess,
	startRequestGetNotificationsFail,
	startRequestReplyNotification,
	startRequestReplyNotificationSuccess,
	startRequestReplyNotificationFail,
	startRequestMessage,
	startRequestMessageSuccess,
	startRequestMessageFail,
	startRequestGetTotalFriends,
	startRequestGetTotalFriendsSuccess,
	startRequestGetTotalFriendsFail,
	startRequestProjectInvitation,
	startRequestProjectInvitationSuccess,
	startRequestProjectInvitationFail,
	startRequestGetRequestAddFriend,
	startRequestGetRequestAddFriendSuccess,
	startRequestGetRequestAddFriendFail,
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

export const getRequestAddFriend = (user_id) => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: `notification/request-add-friend/${user_id}`,
		actionTypes: [
			startRequestGetRequestAddFriend,
			startRequestGetRequestAddFriendSuccess,
			startRequestGetRequestAddFriendFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};

export const getTotalFriends = () => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: "notification/total-friends",
		actionTypes: [
			startRequestGetTotalFriends,
			startRequestGetTotalFriendsSuccess,
			startRequestGetTotalFriendsFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};

export const readRoot =
	(
		dataFilter = {
			perPage: 10,
			page: 1,
		}
	) =>
	async (dispatch, getState) => {
		let path = `notification/notifications?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

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
			path += `&order=${dataFilter.order}`;
		}

		return callApi({
			method: "get",
			apiPath: path,
			actionTypes: [
				startRequestReadRoot,
				startRequestReadRootSuccess,
				startRequestReadRootFail,
			],
			variables: {},
			dispatch,
			getState,
		});
	};

export const sendProjectInvitation = (data) => async (dispatch, getState) => {
	return callApi({
		method: "post",
		apiPath: "notification/project-invitation",
		actionTypes: [
			startRequestProjectInvitation,
			startRequestProjectInvitationSuccess,
			startRequestProjectInvitationFail,
		],
		variables: data,
		dispatch,
		getState,
	});
};
