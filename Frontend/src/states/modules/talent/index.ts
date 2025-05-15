import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TalentState, TalentFormRecruitPayload, TalentPayload } from './types'

// Define the initial state with TypeScript typing
const initialState: TalentState = {
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
}

const talentSlice = createSlice({
   name: 'talent',
   initialState,
   reducers: {
      // ========== RECRUIT TALENTS ========== //
      requestRecruitTalents: (state: TalentState) => ({
         ...state,
         isLoadingRecruitTalents: true,
      }),
      recruitTalentsSuccess: (state: TalentState, action: PayloadAction<any>) => ({
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
      recruitTalentsFail: (state: TalentState) => ({
         ...state,
         talents: [],
         isLoadingRecruitTalents: false,
      }),

      setFormRecruitTalents: (state: TalentState, action: PayloadAction<{ event: any; nameSelect?: string }>) => {
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
      requestGetTalentDetails: (state: TalentState) => ({
         ...state,
         isLoadingGetTalentDetails: true,
      }),
      getTalentDetailsSuccess: (state: TalentState, action: PayloadAction<any>) => ({
         ...state,
         talentDetails: action.payload.data,
         isLoadingGetTalentDetails: false,
      }),
      getTalentDetailsFail: (state: TalentState) => ({
         ...state,
         talentDetails: null,
         isLoadingGetTalentDetails: false,
      }),

      // REQUEST ADD FRIEND
      requestSendFriendRequest: (state: TalentState) => ({
         ...state,
         isLoadingSendFriendRequest: true,
      }),
      sendFriendRequestSuccess: (state: TalentState, action: PayloadAction<any>) => ({
         ...state,
         talentDetails: {
            ...state.talentDetails,
            friend_request: action.payload.data,
         },
         isLoadingSendFriendRequest: false,
      }),
      sendFriendRequestFail: (state: TalentState) => ({
         ...state,
         isLoadingSendFriendRequest: false,
      }),
      // =========== REPLY FRIEND REQUEST =========== //
      requestReplyFriendRequest: (state: TalentState) => ({
         ...state,
         isLoadingReplyFriendRequest: true,
      }),
      replyFriendRequestSuccess: (state: TalentState, action: PayloadAction<any>) => ({
         ...state,
         talentDetails: {
            ...state.talentDetails,
            friend_request: action.payload.data,
         },
         isLoadingReplyFriendRequest: false,
      }),
      replyFriendRequestFail: (state: TalentState) => ({
         ...state,
         isLoadingReplyFriendRequest: false,
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
   // ========== REQUEST ADD FRIEND ========== //
   requestSendFriendRequest,
   sendFriendRequestSuccess,
   sendFriendRequestFail,
   // =========== REPLY FRIEND REQUEST =========== //
   requestReplyFriendRequest,
   replyFriendRequestSuccess,
   replyFriendRequestFail,
} = talentSlice.actions

export default talentSlice.reducer
