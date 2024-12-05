import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
	name: "chat",
	initialState: {
		loadingRequestChatInvitation: false,
		loadingGetChatInvitation: false,
		chatInvitation: "",
	},
	reducers: {
		startRequestChatInvitation: (state) => ({
			...state,
			loadingRequestChatInvitation: true,
		}),

		startRequestChatInvitationSuccess: (state) => ({
			...state,
			loadingRequestChatInvitation: false,
			chatInvitation: "pending",
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
			chatInvitation: action.payload.status,
		}),
		startRequestGetChatInvitationFail: (state) => ({
			...state,
			loadingGetChatInvitation: false,
		}),
	},
});

export const {
	startRequestChatInvitation,
	startRequestChatInvitationSuccess,
	startRequestChatInvitationFail,
	startRequestGetChatInvitation,
	startRequestGetChatInvitationSuccess,
	startRequestGetChatInvitationFail,
} = chatSlice.actions;

export default chatSlice.reducer;
