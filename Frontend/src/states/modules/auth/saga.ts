import { all, fork, takeLatest, put, Effect } from 'redux-saga/effects'
import { startRequestLoginSuccess } from './index'
import { setAuthToken } from '../../../utils/localStorage'
import { getMe } from '../../../api/auth'
import { PayloadAction } from '@reduxjs/toolkit'

// Define types for the action payloads
interface LoginSuccessPayload {
   data: {
      access_token: string
      [key: string]: any
   }
}

function* loadRouteData(): Generator<Effect, void, any> {
   // Implementation placeholder
}

function* handleActions(): Generator<Effect, void, any> {
   yield takeLatest(startRequestLoginSuccess.type, function* (action: PayloadAction<LoginSuccessPayload>) {
      const token = action.payload.data.access_token
      setAuthToken(token)
      yield put(getMe())
   })

   // yield takeLatest(startRequestRegisterSuccess.type, function* () {
   //    getNotification("success", "Register success. Please verify by email!");
   //    yield put(setLocation({ pathName: "/login" }));
   // });

   // yield takeLatest(startRequestRegisterFail.type, function* () {
   //    getNotification("error", "Register fail");
   //    yield;
   // });
}

export default function* loadAuthSaga(): Generator<Effect, void, any> {
   yield all([fork(loadRouteData), fork(handleActions)])
}
