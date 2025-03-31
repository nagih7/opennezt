import { createSlice } from '@reduxjs/toolkit'

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
                is_friend_requested: action.payload.data.is_friend_requested,
            },
            isLoadingSendFriendRequest: false,
        }),
        sendFriendRequestFail: (state) => ({
            ...state,
            isLoadingSendFriendRequest: false,
        }),
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
    // REQUEST ADD FRIEND
    requestSendFriendRequest,
    sendFriendRequestSuccess,
    sendFriendRequestFail,
} = talentSlice.actions

export default talentSlice.reducer
