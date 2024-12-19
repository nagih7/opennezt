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
		startRequestReplyNotification: (state) => ({
			...state,
		}),
		startRequestReplyNotificationSuccess: (state) => ({
			...state,
		}),
		startRequestReplyNotificationFail: (state) => ({
			...state,
		}),
		startRequestMessage: (state) => ({
			...state,
		}),
		startRequestMessageSuccess: (state) => ({
			...state,
		}),
		startRequestMessageFail: (state) => ({
			...state,
		}),
	},
});

export const {
	startRequestGetNotifications,
	startRequestGetNotificationsSuccess,
	startRequestGetNotificationsFail,
	startRequestReplyNotification,
	startRequestReplyNotificationSuccess,
	startRequestReplyNotificationFail,
	startRequestMessage,
	startRequestMessageSuccess,
	startRequestMessageFail,
} = notificationSlice.actions;

export default notificationSlice.reducer;
