import { all, fork, Effect } from 'redux-saga/effects'
import appSaga from './modules/app/saga'
import authSaga from './modules/auth/saga'

export default function* rootSaga(): Generator<Effect, void, any> {
   yield all([fork(appSaga), fork(authSaga)])
}
