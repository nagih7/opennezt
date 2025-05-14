// Wrapped app actions with proper TypeScript compatibility
import { subscribe as subscribeOriginal } from '../api/app'
import { createAppAsyncThunk } from './reduxThunkWrapper'

// Export wrapped versions of your thunk actions
export const subscribeWrapped = createAppAsyncThunk(subscribeOriginal)
