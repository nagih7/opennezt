import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

// Define Redux state root type
export interface RootState {
   auth: AuthState
   [key: string]: any
}

// Auth state example
export interface AuthState {
   isAuthenticated: boolean
   user: User | null
   loading: boolean
   error: string | null
}

export interface User {
   id: string
   name: string
   email: string
   // Add more user properties as needed
   [key: string]: any
}

// Action types
export interface Action<T = any> {
   type: string
   payload?: T
   error?: boolean
   meta?: any
}

// Thunk type
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

// Typed dispatch
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>

// API call state
export interface ApiCallState<T = any> {
   data: T | null
   loading: boolean
   error: string | null
   success: boolean
}

// Create a generic for all API calls
export function createInitialApiState<T = any>(): ApiCallState<T> {
   return {
      data: null,
      loading: false,
      error: null,
      success: false,
   }
}

// You can add more types as needed for your application
