/**
 * This file provides the central type definitions for the Redux store
 * Import these types when working with Redux state, actions, or middleware
 */

import { RootState, AppDispatch } from './index'
import { Action as ReduxToolkitAction, ThunkAction } from '@reduxjs/toolkit'

// Re-export the types from index
export type { RootState, AppDispatch }

// Define a reusable AppThunk type for async actions
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ReduxToolkitAction<string>>

// Common action types
export interface Action<T = any> {
   type: string
   payload?: T
}

// Common utility type for async state tracking
export interface AsyncState<T = any> {
   data: T | null
   isLoading: boolean
   error: string | null
}

// Create a utility for initializing async state
export const createInitialAsyncState = <T>(): AsyncState<T> => ({
   data: null,
   isLoading: false,
   error: null,
})

// Common pagination interface used across multiple modules
export interface Pagination {
   currentPage: number
   perPage: number
   totalPage: number
   totalRecord: number
}

// Standard async action types
export type AsyncActionTypes = [string, string, string]

// Generate async action types helper
export const createAsyncTypes = (base: string): AsyncActionTypes => [
   `${base}_REQUEST`,
   `${base}_SUCCESS`,
   `${base}_FAILURE`,
]
