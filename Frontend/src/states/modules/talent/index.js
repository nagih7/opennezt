import { createSlice } from '@reduxjs/toolkit'
import { toaster } from 'components/UI/toaster'
const talentSlice = createSlice({
    name: 'Talent',
    initialState: {
        // RECRUIT TALENTS
        talents: [],
        formRecruitTalents: {
            keySearch: '',
            industry: '',
            experienceLevel: '',
            category: '',
            subcategory: '',
            skill: '',
            page: 1,
            perPage: 6,
        },
        isLoadingRecruitTalents: false,
        paginationRecruitTalents: {
            currentPage: 1,
            perPage: 10,
            totalPage: 1,
            totalRecord: 0,
        },
        // TALENT DETAILS
        talentDetails: null,
        isLoadingGetTalentDetails: false,
        // REQUEST ADD FRIEND
        isLoadingSendFriendRequest: false,
        // REPLY FRIEND REQUEST
        isLoadingReplyFriendRequest: false,
        // BOOKMARK TALENTS

        bookmarks: [], // Danh sách các talent đã bookmark
        isLoadingBookmarkTalent: false,
    },
    reducers: {
        // ========== RECRUIT TALENTS ========== //
        requestRecruitTalents: (state) => ({
            ...state,
            isLoadingRecruitTalents: true,
        }),
        recruitTalentsSuccess: (state, action) => ({
            ...state,
            talents: action.payload.data.talents,
            paginationRecruitTalents: {
                currentPage: action.payload.data.page,
                perPage: action.payload.data.per_page,
                totalPage: action.payload.data.total_page,
                totalRecord: action.payload.data.total,
            },
            isLoadingRecruitTalents: false,
        }),
        recruitTalentsFail: (state) => ({
            ...state,
            talents: [],
            isLoadingRecruitTalents: false,
        }),

        setFormRecruitTalents: (state, action) => {
            const { event, nameSelect } = action.payload
            if (nameSelect) {
                return {
                    ...state,
                    formRecruitTalents: {
                        ...state.formRecruitTalents,
                        [nameSelect]: event.value[0],
                        page: 1,
                    },
                }
            }
            return {
                ...state,
                formRecruitTalents: {
                    ...state.formRecruitTalents,
                    [event.target.name]: event.target.value,
                    page: 1,
                },
            }
        },

        // ========== TALENT DETAILS ========== //
        requestGetTalentDetails: (state) => ({
            ...state,
            isLoadingGetTalentDetails: true,
        }),
        getTalentDetailsSuccess: (state, action) => ({
            ...state,
            talentDetails: action.payload.data,
            isLoadingGetTalentDetails: false,
        }),
        getTalentDetailsFail: (state) => ({
            ...state,
            talentDetails: null,
            isLoadingGetTalentDetails: false,
        }),

        // REQUEST ADD FRIEND
        requestSendFriendRequest: (state) => ({
            ...state,
            isLoadingSendFriendRequest: true,
        }),
        sendFriendRequestSuccess: (state, action) => ({
            ...state,
            talentDetails: {
                ...state.talentDetails,
                friend_request: action.payload.data,
            },
            isLoadingSendFriendRequest: false,
        }),
        sendFriendRequestFail: (state) => ({
            ...state,
            isLoadingSendFriendRequest: false,
        }),
        // =========== REPLY FRIEND REQUEST =========== //
        requestReplyFriendRequest: (state) => ({
            ...state,
            isLoadingReplyFriendRequest: true,
        }),
        replyFriendRequestSuccess: (state, action) => ({
            ...state,
            talentDetails: {
                ...state.talentDetails,
                friend_request: action.payload.data,
            },
            isLoadingReplyFriendRequest: false,
        }),
        replyFriendRequestFail: (state) => ({
            ...state,
            isLoadingReplyFriendRequest: false,
        }),
        // ========== HANDLE BOOKMARK TALENT ========== //
        bookmarkTalent: (state) => ({
            ...state,
            isLoadingBookmarkTalent: true,
        }),
        bookmarkTalentSuccess: (state, action) => ({
            ...state,
            isLoadingBookmarkTalent: false,
            bookmarks: [...state.bookmarks, action.payload],
        }),
        bookmarkTalentFail: (state) => ({
            ...state,
            isLoadingBookmarkTalent: false,
        }),
        updateTalentBookmarks: (state, action) => {
            const { talent_id, marked } = action.payload;
            if (marked === 'yes') {
                state.bookmarks.push({ talent_id });
            } else {
                state.bookmarks = state.bookmarks.filter(
                    (bookmark) => bookmark.talent_id !== talent_id
                );
            }
        },

    },
})

export const {
    // ========== RECRUIT TALENTS ========== //
    requestRecruitTalents,
    recruitTalentsSuccess,
    recruitTalentsFail,
    setFormRecruitTalents,
    // ========== TALENT DETAILS ========== //
    requestGetTalentDetails,
    getTalentDetailsSuccess,
    getTalentDetailsFail,
    // ========== REQUEST ADD FRIEND ========== //
    requestSendFriendRequest,
    sendFriendRequestSuccess,
    sendFriendRequestFail,
    // =========== REPLY FRIEND REQUEST =========== //
    requestReplyFriendRequest,
    replyFriendRequestSuccess,
    replyFriendRequestFail,
    // ========== HANDLE BOOKMARK TALENT ========== //
    bookmarkTalent,
    bookmarkTalentSuccess,
    bookmarkTalentFail,
    updateTalentBookmarks,

} = talentSlice.actions

export default talentSlice.reducer
