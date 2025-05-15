import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InterviewState } from './types'

// Define the initial state with TypeScript typing
const initialState: InterviewState = {
   project: {},
   conversation: {},
   messages: [],
   hasJoined: false,
   currentAction: 'speaking',
   isLoadingStartInterview: false,
   isLoadingReplyInterview: false,
   isLoadingCloseInterview: false,
   isOpenModalInterview: false,
}

const interviewSlice = createSlice({
   name: 'interview',
   initialState,
   reducers: {
      requestStartInterview: (state) => ({
         ...state,
         isLoadingStartInterview: true,
      }),
      startInterviewSuccess: (state, action) => ({
         ...state,
         conversation: action.payload.data.interview,
         messages: [action.payload.data.message],
         hasJoined: true,
         isOpenModalInterview: true,
         isLoadingStartInterview: false,
      }),
      startInterviewFail: (state) => ({
         ...state,
         isLoadingStartInterview: false,
      }),
      requestCloseInterview: (state) => ({
         ...state,
         isLoadingCloseInterview: true,
      }),
      closeInterviewSuccess: (state) => ({
         ...state,
         conversation: {},
         messages: [],
         hasJoined: false,
         isOpenModalInterview: false,
         isLoadingCloseInterview: false,
      }),
      closeInterviewFail: (state) => ({
         ...state,
         isLoadingCloseInterview: false,
      }),

      setOpenModalInterview: (state, action) => ({
         ...state,
         isOpenModalInterview: action.payload,
      }),

      setProjectInterview: (state, action) => ({
         ...state,
         project: action.payload,
      }),

      requestReplyInterview: (state) => ({
         ...state,
         isLoadingReplyInterview: true,
      }),
      replyInterviewSuccess: (state, action) => ({
         ...state,
         messages: [...state.messages, ...action.payload.data.messages],
         isLoadingReplyInterview: false,
      }),
      replyInterviewFail: (state) => ({
         ...state,
         isLoadingReplyInterview: false,
      }),

      setCurrentAction: (state, action) => ({
         ...state,
         currentAction: action.payload,
      }),
   },
})

export const {
   requestStartInterview,
   startInterviewSuccess,
   startInterviewFail,
   requestCloseInterview,
   closeInterviewSuccess,
   closeInterviewFail,
   setProjectInterview,
   requestReplyInterview,
   replyInterviewSuccess,
   replyInterviewFail,
   setCurrentAction,
   setOpenModalInterview,
} = interviewSlice.actions

export default interviewSlice.reducer
