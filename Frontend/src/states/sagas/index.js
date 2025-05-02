import {fork, all} from 'redux-saga/effects'
import appSaga from '../modules/app/saga';
import routeSaga from '../modules/routing/saga';

export default function* sagas() {
  yield all([
    fork(routeSaga),
    fork(appSaga),
  ]);
}
