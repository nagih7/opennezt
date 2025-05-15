import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HomeState } from './types'

// Define the initial state with TypeScript typing
const initialState: HomeState = {
   value: 'Set value',
}

const homeSlice = createSlice({
   name: 'home',
   initialState,
   reducers: {
      setValue: (state: HomeState, action: PayloadAction<string>) => ({
         ...state,
         value: action.payload,
      }),
   },
})

export const { setValue } = homeSlice.actions

export default homeSlice.reducer
