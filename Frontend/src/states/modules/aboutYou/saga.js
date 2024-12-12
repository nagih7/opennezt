import { all, fork, put } from "redux-saga/effects";
import { setTitlePage } from "../app";

function* loadRouteData() {
	yield put(setTitlePage("AboutYou"));
}

function* handleActions() {
	//;
}

export default function* loadAboutYouSaga() {
	yield all([fork(loadRouteData), fork(handleActions)]);
}
