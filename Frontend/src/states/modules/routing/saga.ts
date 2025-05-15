import { all, fork, takeLatest, Effect } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { ROUTE_SAGAS } from '../../../router/rootSaga'
import { initialSaga } from './index'

export function* watchRouteSagas(): Generator<Effect, void, any> {
   // Explicit type for routeSagas allowing string indexing
   let routeSagas: { [key: string]: () => Generator } = ROUTE_SAGAS
   yield takeLatest(initialSaga, function* (action: PayloadAction<string>) {
      yield fork(routeSagas[action.payload])
   })
}

export default function* routes(): Generator<Effect, void, any> {
   yield all([fork(watchRouteSagas)])
}
