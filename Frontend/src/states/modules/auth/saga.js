import { all, fork, takeLatest, put } from "redux-saga/effects";
import {
	startRequestLoginSuccess,
	startRequestRegisterFail,
	startRequestRegisterSuccess,
} from "./index";
import { setAuthToken } from "../../../utils/localStorage";
import { getMe } from "../../../api/auth";
import { setLocation } from "../app";
import { getNotification } from "../../../utils/helper";

function* loadRouteData() {
	//
}

function* handleActions() {
	yield takeLatest(startRequestLoginSuccess, function* (action) {
		let token = action.payload.data.access_token;
		setAuthToken(token);
		yield put(getMe());
	});

	yield takeLatest(startRequestRegisterSuccess, function* () {
		getNotification("success", "Register success");
		yield put(setLocation({ pathName: "/login" }));
	});

	yield takeLatest(startRequestRegisterFail, function* () {
		getNotification("error", "Register fail");
		yield;
	});
}

export default function* loadAuthSaga() {
	yield all([fork(loadRouteData), fork(handleActions)]);
}
