import { createSlice } from '@reduxjs/toolkit'

const interviewSlice = createSlice({
    name: 'Interview',
    initialState: {
        project: {},
        conversation: {},
        messages: [],
        hasJoined: false,
        currentAction: 'speaking',
        isLoadingStartInterview: false,
        isLoadingReplyInterview: false,
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
            messages: [
                ...state.messages.map((msg) => {
                    if (msg.key === action.payload.data.key) {
                        return { ...msg, status: 'sent' }
                    }
                    return msg
                }),

                action.payload.data.message,
            ],
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
    addMessage,
    requestReplyInterview,
    replyInterviewSuccess,
    replyInterviewFail,
    setCurrentAction,
} = interviewSlice.actions

export default interviewSlice.reducer
