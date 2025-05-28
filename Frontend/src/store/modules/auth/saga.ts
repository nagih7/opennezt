import { all, fork, Effect } from 'redux-saga/effects'

function* loadRouteData(): Generator<Effect, void, any> {
   // Implementation placeholder
}

function* handleActions(): Generator<Effect, void, any> {
   // yield takeLatest(startRequestLoginSuccess.type, function* (action: PayloadAction<LoginSuccessPayload>) {
   //    const token = action.payload.data.access_token
   //    setAuthToken(token)
   //    yield put(getMe())
   // })
}

export default function* loadAuthSaga(): Generator<Effect, void, any> {
   yield all([fork(loadRouteData), fork(handleActions)])
}
