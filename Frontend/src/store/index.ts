import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware()

// Configure the store with TypeScript support
export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }).concat(sagaMiddleware),
})

// Start the root saga
sagaMiddleware.run(rootSaga)

// Export types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
