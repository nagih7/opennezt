import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from './types'

// Define the initial state with TypeScript typing
const initialState: AppState = {
   isShowSideBar: true,
   isThemeLight: false,
   title: 'Dashboard',
   language: 'EN',
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
   },
})

// Export actions with TypeScript typing
export const { handleSetIsShowSideBar, setTitlePage, startRequest, requestSuccess, requestError, setLanguage } =
   appSlice.actions

// Export the reducer
export default appSlice.reducer
