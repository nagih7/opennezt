import { createSlice } from "@reduxjs/toolkit";
const notificationSlice = createSlice({
	name: "notification",
	initialState: {
		notifications: [],
		loadingGetNotifications: false,
	},
	reducers: {
		startRequestGetNotifications: (state) => ({
			...state,
		}),
		startRequestGetNotificationsSuccess: (state, action) => ({
			...state,
			notifications: action.payload.data,
			loadingGetNotifications: false,
		}),
		startRequestGetNotificationsFail: (state) => ({
			...state,
			loadingGetNotifications: false,
		}),
		startRequestUpdateChatInvitation: (state) => ({
			...state,
		}),
		startRequestUpdateChatInvitationSuccess: (state) => ({
			...state,
		}),
		startRequestUpdateChatInvitationFail: (state) => ({
			...state,
		}),
	},
});

export const {
	startRequestGetNotifications,
	startRequestGetNotificationsSuccess,
	startRequestGetNotificationsFail,
	startRequestUpdateChatInvitation,
	startRequestUpdateChatInvitationSuccess,
	startRequestUpdateChatInvitationFail,
} = notificationSlice.actions;

export default notificationSlice.reducer;
