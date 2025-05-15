import { all, fork, put, takeLatest, call, Effect } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { setTitlePage } from '../app'
import { changePasswordFailed, changePasswordSuccess, updateInfoUserFailed, updateInfoUserSuccess } from './index'
import { getNotification } from '../../../utils/helper'
import { getMe } from '../../../api/auth'
import _ from 'lodash'

function* loadRouteData(): Generator<Effect, void, any> {
   yield put(setTitlePage('Profile'))
}

function* handleActions(): Generator<Effect, void, any> {
   // Implement action handlers as needed
}

export default function* profileSaga(): Generator<Effect, void, any> {
   yield all([fork(loadRouteData), fork(handleActions)])
}
