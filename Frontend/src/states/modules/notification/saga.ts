import { all, fork, put, takeLatest, call, Effect } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { setTitlePage } from '../app'

function* loadRouteData(): Generator<Effect, void, any> {
   yield put(setTitlePage('Notification'))
}

function* handleActions(): Generator<Effect, void, any> {
   // No actions defined yet
}

export default function* notificationSaga(): Generator<Effect, void, any> {
   yield all([fork(loadRouteData), fork(handleActions)])
}
