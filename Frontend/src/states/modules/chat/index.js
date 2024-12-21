import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
	name: "chat",
	initialState: {
		chatList: [],
		chatHistory: {},
		loadingGetChatList: false,
		loadingGetChatHistory: false,
		loadingRequestChatInvitation: false,
	},
	reducers: {
		startRequestGetChatList: (state) => ({
			...state,
			loadingGetChatList: true,
		}),
		startRequestGetChatListSuccess: (state, action) => ({
			...state,
			loadingGetChatList: false,
			chatList: action.payload.data,
		}),
		startRequestGetChatListFail: (state) => ({
			...state,
			loadingGetChatList: false,
		}),

		startRequestGetChatHistory: (state) => ({
			...state,
			loadingGetChatHistory: true,
		}),
		startRequestGetChatHistorySuccess: (state, action) => ({
			...state,
			loadingGetChatHistory: false,
			chatHistory: action.payload.data,
		}),
		startRequestGetChatHistoryFail: (state) => ({
			...state,
			loadingGetChatHistory: false,
			chatHistory: {},
		}),
	},
});

export const {
	startRequestGetChatList,
	startRequestGetChatListSuccess,
	startRequestGetChatListFail,
	startRequestGetChatHistory,
	startRequestGetChatHistorySuccess,
	startRequestGetChatHistoryFail,
} = chatSlice.actions;

export default chatSlice.reducer;
