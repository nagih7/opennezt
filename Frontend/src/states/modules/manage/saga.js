import { all, fork, put } from "redux-saga/effects";
import { setTitlePage } from "../app";

function* loadRouteData() {
	yield put(setTitlePage("Dashboard"));
}

function* handleActions() {
	//;
}

export default function* loadManageSaga() {
	yield all([fork(loadRouteData), fork(handleActions)]);
}
