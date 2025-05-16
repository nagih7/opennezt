import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import { RootState } from './types'

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware()

// Configure the Redux store with TypeScript support
const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }).concat(sagaMiddleware),
})

// Start the root saga
sagaMiddleware.run(rootSaga)

// Export types for dispatch and selector functions
export type AppDispatch = typeof store.dispatch
export type AppGetState = () => RootState

export default store
