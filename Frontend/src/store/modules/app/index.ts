import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from './types'

// Define the initial state with TypeScript typing
const initialState: AppState = {
   isShowSideBar: true,
   isThemeLight: false,
   title: 'Dashboard',
   language: 'EN',
   // Web push related state
   isLoadingWebPush: false,
   isSubscribed: false,
   subscription: null,
   registration: null,
   stats: null,
   error: null,
}

// Create a typed slice for app state
const appSlice = createSlice({
   name: 'app',
   initialState,
   reducers: {
      startRequest: (state) => ({
         ...state,
         list: null,
      }),
      requestSuccess: (state, action: PayloadAction<any>) => ({
         ...state,
         list: action.payload,
      }),
      requestError: (state) => ({
         ...state,
         list: '',
      }),
      handleSetIsShowSideBar: (state, action: PayloadAction<boolean>) => ({
         ...state,
         isShowSideBar: action.payload,
      }),
      setTitlePage: (state, action: PayloadAction<string>) => ({
         ...state,
         title: action.payload,
      }),
      setLanguage: (state, action: PayloadAction<string>) => ({
         ...state,
         language: action.payload,
      }),

      // Web push related reducers
      requestWebPush: (state) => ({
         ...state,
         isLoadingWebPush: true,
      }),
      webPushSuccess: (state) => ({
         ...state,
         isLoadingWebPush: false,
      }),
      webPushFail: (state) => ({
         ...state,
         isLoadingWebPush: false,
      }),
   },
})

// Export actions with TypeScript typing
export const {
   handleSetIsShowSideBar,
   setTitlePage,
   startRequest,
   requestSuccess,
   requestError,
   setLanguage,
   // Web push related actions
   requestWebPush,
   webPushSuccess,
   webPushFail,
} = appSlice.actions

// Export the reducer
export default appSlice.reducer
