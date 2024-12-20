import { createSlice } from "@reduxjs/toolkit";
const notificationSlice = createSlice({
	name: "notification",
	initialState: {
		notifications: [],
		paginationListNotification: {
			currentPage: 1,
			perPage: 10,
			totalPage: 1,
			totalRecord: 0,
		},
		totalFriends: 0,
		loadingGetNotifications: false,
		loadingProjectInvitation: false,
	},
	reducers: {
		startRequestReadRoot: (state) => ({
			...state,
		}),
		startRequestReadRootSuccess: (state, action) => ({
			...state,
			notifications: action.payload.data.notifications,
			loadingGetNotifications: false,
			paginationListNotification: {
				currentPage: action.payload.data.page,
				perPage: action.payload.data.per_page,
				totalPage: action.payload.data.last_page,
				totalRecord: action.payload.data.total,
			},
		}),
		startRequestReadRootFail: (state) => ({
			...state,
			loadingGetNotifications: false,
		}),
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
		startRequestGetTotalFriends: (state) => ({
			...state,
		}),
		startRequestGetTotalFriendsSuccess: (state, action) => ({
			...state,
			totalFriends: action.payload.data,
			loadingGetTotalFriends: false,
		}),
		startRequestGetTotalFriendsFail: (state) => ({
			...state,
			loadingGetTotalFriends: false,
		}),
		startRequestProjectInvitation: (state) => ({
			...state,
			loadingProjectInvitation: true,
		}),
		startRequestProjectInvitationSuccess: (state) => ({
			...state,
			loadingProjectInvitation: false,
		}),
		startRequestProjectInvitationFail: (state) => ({
			...state,
			loadingProjectInvitation: false,
		}),
	},
});

export const {
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
} = notificationSlice.actions;

export default notificationSlice.reducer;
