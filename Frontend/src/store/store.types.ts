/**
 * This file provides the central type definitions for the Redux store
 * Import these types when working with Redux state, actions, or middleware
 */

import store from './configureStore'
import { Action, ThunkAction } from '@reduxjs/toolkit'

// RootState type derived from the store itself
export type RootState = ReturnType<typeof store.getState>

// AppDispatch type for dispatching actions
export type AppDispatch = typeof store.dispatch

// Define a reusable AppThunk type for async actions
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

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

// Create a utility for initializing pagination
export const createInitialPagination = (): Pagination => ({
   currentPage: 1,
   perPage: 10,
   totalPage: 1,
   totalRecord: 0,
})
