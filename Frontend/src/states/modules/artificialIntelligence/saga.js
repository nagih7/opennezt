import { all, fork } from "redux-saga/effects";

function* loadRouteData() {
	//
}

function* handleActions() {}

export default function* loadAISaga() {
	yield all([fork(loadRouteData), fork(handleActions)]);
}
