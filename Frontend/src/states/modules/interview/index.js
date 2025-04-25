import { createSlice } from '@reduxjs/toolkit'

const interviewSlice = createSlice({
    name: 'Interview',
    initialState: {
        project: {},
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

        setProjectInterview: (state, action) => ({
            ...state,
            project: action.payload,
        }),

        // Add new reducer for handling new message
        addMessage: (state, action) => ({
            ...state,
            messages: [...state.messages, action.payload],
        }),

        requestReplyInterview: (state) => ({
            ...state,
            isLoadingReplyInterview: true,
        }),
        replyInterviewSuccess: (state, action) => ({
            ...state,
            messages: [...state.messages, action.payload.data.message],
            isLoadingReplyInterview: false,
        }),
        replyInterviewFail: (state) => ({
            ...state,
            isLoadingReplyInterview: false,
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
    addMessage,
    requestReplyInterview,
    replyInterviewSuccess,
    replyInterviewFail,
} = interviewSlice.actions

export default interviewSlice.reducer
