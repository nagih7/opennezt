import callApi from "../callApi";
import {
	startRequestChatInvitation,
	startRequestChatInvitationSuccess,
	startRequestChatInvitationFail,
	startRequestGetChatHistory,
	startRequestGetChatHistorySuccess,
	startRequestGetChatHistoryFail,
	startRequestGetChatInvitation,
	startRequestGetChatInvitationSuccess,
	startRequestGetChatInvitationFail,
	startRequestGetChatList,
	startRequestGetChatListSuccess,
	startRequestGetChatListFail,
} from "../../states/modules/chat";

export const getChatList = () => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: `chat/chat-list`,
		actionTypes: [
			startRequestGetChatList,
			startRequestGetChatListSuccess,
			startRequestGetChatListFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};

export const getChatHistory = (user_id) => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: `chat/chat-history/${user_id}`,
		actionTypes: [
			startRequestGetChatHistory,
			startRequestGetChatHistorySuccess,
			startRequestGetChatHistoryFail,
		],
		variables: {},
		dispatch,
		getState,
	});
};

export const requestChatInvitation =
	(receiver_id, receiver_name) => async (dispatch, getState) => {
		return callApi({
			method: "post",
			apiPath: `chat/chat-invitation`,
			actionTypes: [
				startRequestChatInvitation,
				startRequestChatInvitationSuccess,
				startRequestChatInvitationFail,
			],
			variables: { receiver_id, receiver_name },
			dispatch,
			getState,
		});
	};

export const getChatInvitation =
	(receiver_id) => async (dispatch, getState) => {
		return callApi({
			method: "get",
			apiPath: `chat/chat-invitation/${receiver_id}`,
			actionTypes: [
				startRequestGetChatInvitation,
				startRequestGetChatInvitationSuccess,
				startRequestGetChatInvitationFail,
			],
			variables: {},
			dispatch,
			getState,
		});
	};
