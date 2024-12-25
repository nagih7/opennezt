import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const notificationSlice = createSlice({
	name: "notification",
	initialState: {
		notifications: [],
		requestAddFriend: {},
		paginationListNotification: {
			currentPage: 1,
			perPage: 10,
			totalPage: 1,
			totalRecord: 0,
		},
		totalFriends: 0,
		loadingGetNotifications: false,
		loadingProjectInvitation: false,
		loadingSendRequestAddFriend: false,
		loadingGetRequestAddFriend: false,
		loadingReplyNotification: false,
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
			loadingReplyNotification: true,
		}),
		startRequestReplyNotificationSuccess: (state) => {
			message.success("Reply notification successfully");
			return {
				...state,
				loadingReplyNotification: false,
			};
		},
		startRequestReplyNotificationFail: (state) => {
			message.error("Reply notification failed");
			return {
				...state,
				loadingReplyNotification: false,
			};
		},
		startRequestMessage: (state) => ({
			...state,
			loadingSendRequestAddFriend: true,
		}),
		startRequestMessageSuccess: (state) => {
			message.success("Friend request sent successfully");
			return {
				...state,
				loadingSendRequestAddFriend: false,
			};
		},
		startRequestMessageFail: (state) => {
			message.error("Friend request sent failed");
			return {
				...state,
				loadingSendRequestAddFriend: false,
			};
		},
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
		startRequestProjectInvitationSuccess: (state) => {
			message.success("Project invitation sent successfully");
			return {
				...state,
				loadingProjectInvitation: false,
			};
		},
		startRequestProjectInvitationFail: (state) => ({
			...state,
			loadingProjectInvitation: false,
		}),
		startRequestGetRequestAddFriend: (state) => ({
			...state,
			loadingGetRequestAddFriend: true,
		}),
		startRequestGetRequestAddFriendSuccess: (state, action) => ({
			...state,
			requestAddFriend: action.payload.data,
			loadingGetRequestAddFriend: false,
		}),
		startRequestGetRequestAddFriendFail: (state) => ({
			...state,
			loadingGetRequestAddFriend: false,
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
	startRequestGetRequestAddFriend,
	startRequestGetRequestAddFriendSuccess,
	startRequestGetRequestAddFriendFail,
} = notificationSlice.actions;

export default notificationSlice.reducer;
