import { all, fork, put } from "redux-saga/effects";
import { setTitlePage } from "../app";

function* loadRouteData() {
	yield put(setTitlePage("Talent"));
}

function* handleActions() {
	//;
}

export default function* loadTalentSaga() {
	yield all([fork(loadRouteData), fork(handleActions)]);
}
