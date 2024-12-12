import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
	name: "chat",
	initialState: {
		chatList: [],
		chatHistory: {},
		loadingGetChatList: false,
		loadingGetChatHistory: false,
		loadingRequestChatInvitation: false,
		loadingGetChatInvitation: false,
		chatInvitation: "",
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

		startRequestChatInvitation: (state) => ({
			...state,
			loadingRequestChatInvitation: true,
		}),

		startRequestChatInvitationSuccess: (state) => ({
			...state,
			loadingRequestChatInvitation: false,
			chatInvitation: "waiting",
		}),

		startRequestChatInvitationFail: (state) => ({
			...state,
			loadingRequestChatInvitation: false,
		}),

		startRequestGetChatInvitation: (state) => ({
			...state,
			loadingGetChatInvitation: true,
		}),
		startRequestGetChatInvitationSuccess: (state, action) => ({
			...state,
			loadingGetChatInvitation: false,
			chatInvitation: action.payload.data.status,
		}),
		startRequestGetChatInvitationFail: (state) => ({
			...state,
			loadingGetChatInvitation: false,
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
	startRequestChatInvitation,
	startRequestChatInvitationSuccess,
	startRequestChatInvitationFail,
	startRequestGetChatInvitation,
	startRequestGetChatInvitationSuccess,
	startRequestGetChatInvitationFail,
} = chatSlice.actions;

export default chatSlice.reducer;
