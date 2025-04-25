import { createSlice } from '@reduxjs/toolkit'

const interviewSlice = createSlice({
    name: 'Interview',
    initialState: {
        conversation: {},
        messages: [],
        hasJoined: false,
        isLoadingStartInterview: false,
        isLoadingCloseInterview: false,
    },
    reducers: {
        requestStartInterview: (state) => ({
            ...state,
            isLoadingStartInterview: true,
        }),
        startInterviewSuccess: (state, action) => ({
            ...state,
            conversation: action.payload.data.conversation,
            messages: [action.payload.data.message],
            hasJoined: true,
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
            isLoadingCloseInterview: false,
        }),
        closeInterviewFail: (state) => ({
            ...state,
            isLoadingCloseInterview: false,
        }),

        // Add new reducer for handling new message
        addMessage: (state, action) => ({
            ...state,
            messages: [...state.messages, action.payload],
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
    addMessage,
} = interviewSlice.actions

export default interviewSlice.reducer
