import { createSlice } from '@reduxjs/toolkit'
import { toaster } from 'components/UI/toaster'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        // =========== Get Notification =========== //
        notifications: [],
        isLoadingGetNotifications: false,
        // =========== Reply Notification =========== //
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
        isLoadingReplyNotification: false,
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
        // =========== Get Notification =========== //
        requestGetNotifications: (state) => ({
            ...state,
            isLoadingGetNotifications: true,
        }),
        getNotificationsSuccess: (state, action) => ({
            ...state,
            notifications: action.payload.data,
            isLoadingGetNotifications: false,
        }),
        getNotificationsFail: (state) => ({
            ...state,
            isLoadingGetNotifications: false,
        }),
        requestReplyNotification: (state) => ({
            ...state,
            isLoadingReplyNotification: true,
        }),
        replyNotificationSuccess: (state, action) => {
            const { notification_id, status } = action.payload
            toaster.create({
                title: `Reply notification successfully.`,
                type: 'success',
            })
            return {
                ...state,
                notifications: state.notifications.map((notification) => {
                    if (notification.notification_id === notification_id) {
                        return {
                            ...notification,
                            metadata: {
                                ...notification.metadata,
                                status: status,
                            },
                        }
                    }
                    return notification
                }),
                isLoadingReplyNotification: false,
            }
        },
        replyNotificationFail: (state) => {
            toaster.create({
                title: `Reply notification failed.`,
                type: 'error',
            })
            return {
                ...state,
                isLoadingReplyNotification: false,
            }
        },
        startRequestMessage: (state) => ({
            ...state,
            loadingSendRequestAddFriend: true,
        }),
        startRequestMessageSuccess: (state) => {
            toaster.create({
                title: `Friend request sent successfully.`,
                type: 'success',
            })
            return {
                ...state,
                loadingSendRequestAddFriend: false,
            }
        },
        startRequestMessageFail: (state) => {
            toaster.create({
                title: `Friend request sent failed.`,
                type: 'error',
            })
            return {
                ...state,
                loadingSendRequestAddFriend: false,
            }
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
            toaster.create({
                title: `Project invitation sent successfully.`,
                type: 'success',
            })
            return {
                ...state,
                loadingProjectInvitation: false,
            }
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
        // =========== Set Notification =========== //
        setNotifications: (state, action) => ({
            ...state,
            notifications: [action.payload, ...state.notifications],
        }),
    },
})

export const {
    startRequestReadRoot,
    startRequestReadRootSuccess,
    startRequestReadRootFail,
    // =========== Get Notification =========== //
    requestGetNotifications,
    getNotificationsSuccess,
    getNotificationsFail,
    // =========== Reply Notification =========== //
    requestReplyNotification,
    replyNotificationSuccess,
    replyNotificationFail,
    // ========== Set Notification =========== //
    setNotifications,
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
} = notificationSlice.actions

export default notificationSlice.reducer
