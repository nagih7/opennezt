import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RoutingState } from './types'

// Define the initial state with TypeScript typing
const initialState: RoutingState = {}

const routingSlice = createSlice({
   name: 'routing',
   initialState,
   reducers: {
      initialSaga: (state: RoutingState, action: PayloadAction<string>) => ({ ...state }),
   },
})

export const { initialSaga } = routingSlice.actions

export default routingSlice.reducer
