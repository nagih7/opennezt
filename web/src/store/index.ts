import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'

// Configure the store with TypeScript support
export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
})

// Export types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

export * from './hooks'
