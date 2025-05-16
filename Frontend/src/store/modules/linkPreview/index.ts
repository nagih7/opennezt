import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LinkPreviewState } from './types'

// Define the initial state with TypeScript typing
const initialState: LinkPreviewState = {
   linkData: {},
   linkDataArticle: {},
   success: false,
   isLoadingGetLinkPreview: false,
   isBlacklisted: false,
}

const linkPreviewSlice = createSlice({
   name: 'linkPreview',
   initialState,
   reducers: {
      getLinkPreview: (state: LinkPreviewState) => ({
         ...state,
         isLoadingGetLinkPreview: true,
         linkData: {},
         linkDataArticle: {},
         success: false,
         isBlacklisted: false,
      }),
      getLinkPreviewSuccess: (state: LinkPreviewState, action: PayloadAction<any>) => ({
         ...state,
         linkData: action.payload.data.data,
         linkDataArticle: action.payload.data.data,
         success: action.payload.data.success, // Use inner success flag
         isBlacklisted: action.payload.data.data?.isBlacklisted || false,
         isLoadingGetLinkPreview: false,
      }),
      getLinkPreviewFail: (state: LinkPreviewState, action: PayloadAction<any>) => ({
         ...state,
         success: false,
         isLoadingGetLinkPreview: false,
         linkData: {},
         linkDataArticle: {},
         isBlacklisted: false,
      }),
      resetLinkPreview: (state: LinkPreviewState) => ({
         ...state,
         linkData: {},
         linkDataArticle: {},
         success: false,
         isBlacklisted: false,
      }),
   },
})

export const { getLinkPreview, getLinkPreviewSuccess, getLinkPreviewFail, resetLinkPreview } = linkPreviewSlice.actions

export default linkPreviewSlice.reducer
