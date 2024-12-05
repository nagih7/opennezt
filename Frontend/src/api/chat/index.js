import callApi from "../callApi";
import {
	startRequestChatInvitation,
	startRequestChatInvitationSuccess,
	startRequestChatInvitationFail,
	startRequestGetChatInvitation,
	startRequestGetChatInvitationSuccess,
	startRequestGetChatInvitationFail,
} from "../../states/modules/chat";

export const requestChatInvitation =
	(receiver_id) => async (dispatch, getState) => {
		return callApi({
			method: "post",
			apiPath: `chat/chat-invitation`,
			actionTypes: [
				startRequestChatInvitation,
				startRequestChatInvitationSuccess,
				startRequestChatInvitationFail,
			],
			variables: { receiver_id },
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
