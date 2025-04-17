import { createSlice } from '@reduxjs/toolkit'

const linkPreviewSlice = createSlice({
    name: 'linkPreview',
    initialState: {
        linkData: {},
        linkDataArticle: {},
        success: false,
        isLoadingGetLinkPreview: false,
        isBlacklisted: false,
    },
    reducers: {
        getLinkPreview: (state) => ({
            ...state,
            isLoadingGetLinkPreview: true,
            linkData: {},
            linkDataArticle: {},
            success: false,
            isBlacklisted: false,
        }),
        getLinkPreviewSuccess: (state, action) => ({
            ...state,
            linkData: action.payload.data.data,
            linkDataArticle: action.payload.data.data,
            success: action.payload.data.success, // Use inner success flag
            isBlacklisted: action.payload.data.data?.isBlacklisted || false,
            isLoadingGetLinkPreview: false,
        }),
        getLinkPreviewFail: (state, action) => ({
            ...state,
            success: false,
            isLoadingGetLinkPreview: false,
            linkData: {},
            linkDataArticle: {},
            isBlacklisted: false,
        }),
        resetLinkPreview: (state) => ({
            ...state,
            linkData: {},
            linkDataArticle: {},
            success: false,
            isLoadingGetLinkPreview: false,
            isBlacklisted: false,
        }),
    },
})

export const { getLinkPreview, getLinkPreviewSuccess, getLinkPreviewFail, resetLinkPreview } = linkPreviewSlice.actions

export default linkPreviewSlice.reducer
