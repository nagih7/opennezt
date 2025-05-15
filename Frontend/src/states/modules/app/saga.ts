import { all, fork, takeLatest, put, call, select } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { AppState } from './types'

// Define the saga function types
function* loadRouteData(): Generator<any, void, any> {
   // Implementation will go here
}

function* handleActions(): Generator<any, void, any> {
   // Implementation will go here
}

export default function* appSaga(): Generator<any, void, any> {
   yield all([fork(loadRouteData), fork(handleActions)])
}
