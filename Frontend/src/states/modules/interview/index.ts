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
      requestStartInterview: (state: InterviewState) => ({
         ...state,
         isLoadingStartInterview: true,
      }),
      startInterviewSuccess: (state: InterviewState, action: PayloadAction<any>) => ({
         ...state,
         conversation: action.payload.data.interview,
         messages: [action.payload.data.message],
         hasJoined: true,
         isOpenModalInterview: true,
         isLoadingStartInterview: false,
      }),
      startInterviewFail: (state: InterviewState) => ({
         ...state,
         isLoadingStartInterview: false,
      }),
      requestCloseInterview: (state: InterviewState) => ({
         ...state,
         isLoadingCloseInterview: true,
      }),
      closeInterviewSuccess: (state: InterviewState) => ({
         ...state,
         conversation: {},
         messages: [],
         hasJoined: false,
         isOpenModalInterview: false,
         isLoadingCloseInterview: false,
      }),
      closeInterviewFail: (state: InterviewState) => ({
         ...state,
         isLoadingCloseInterview: false,
      }),
      requestReplyInterview: (state: InterviewState) => ({
         ...state,
         isLoadingReplyInterview: true,
      }),
      replyInterviewSuccess: (state: InterviewState, action: PayloadAction<any>) => ({
         ...state,
         messages: [...state.messages, action.payload.data.message],
         isLoadingReplyInterview: false,
      }),
      replyInterviewFail: (state: InterviewState) => ({
         ...state,
         isLoadingReplyInterview: false,
      }),
      setProject: (state: InterviewState, action: PayloadAction<any>) => ({
         ...state,
         project: action.payload,
      }),
      receiveMessage: (state: InterviewState, action: PayloadAction<any>) => ({
         ...state,
         messages: [...state.messages, action.payload],
      }),
      setCurrentAction: (state: InterviewState, action: PayloadAction<string>) => ({
         ...state,
         currentAction: action.payload,
      }),
      setOpenModalInterview: (state: InterviewState, action: PayloadAction<boolean>) => ({
         ...state,
         isOpenModalInterview: action.payload,
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
   requestReplyInterview,
   replyInterviewSuccess,
   replyInterviewFail,
   setProject,
   receiveMessage,
   setCurrentAction,
   setOpenModalInterview,
} = interviewSlice.actions

export default interviewSlice.reducer
