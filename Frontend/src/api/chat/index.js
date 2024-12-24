import callApi from "../callApi";
import {
	startRequestGetChatHistory,
	startRequestGetChatHistorySuccess,
	startRequestGetChatHistoryFail,
	startRequestGetChatList,
	startRequestGetChatListSuccess,
	startRequestGetChatListFail,
} from "../../states/modules/chat";

export const getChatList = (value) => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: `chat/chat-list?value=${value}`,
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

export const getChatHistory =
	(conversation_id) => async (dispatch, getState) => {
		return callApi({
			method: "get",
			apiPath: `chat/chat-history/${conversation_id}`,
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
