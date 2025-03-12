import { redirect } from "react-router-dom";
import store from "../states/configureStore";
import { initialSaga } from "../states/modules/routing";
import { hasPermission } from "../utils/helper";
import { getMe } from "api/auth";
import { getAuthToken } from "../utils/localStorage";

export const rootLoader = async (
	{ request },
	isAuth,
	saga = null,
	permissions = []
) => {
	const url = new URL(request.url);
	if (url.pathname === "/profile") {
		await store.dispatch(getMe());
	}
	var { auth } = store.getState();

	if (
		!auth.isAuthSuccess &&
		getAuthToken() &&
		url.pathname !== "verify-authentication" &&
		url.pathname !== "forgot-password"
	) {
		await store.dispatch(getMe());
		auth = store.getState().auth;
	}

	if (isAuth) {
		if (!auth.isAuthSuccess) {
			return redirect("/login");
		}

		if (permissions.length > 0 && !hasPermission(permissions)) {
			return redirect("/403");
		}
	} else {
		if (auth.isAuthSuccess && auth.authRole === "Super Admin") {
			return redirect("/");
		} else if (auth.isAuthSuccess && auth.authRole === "User") {
			return redirect("/");
		}
		// return redirect("/");
	}

	if (saga) {
		store.dispatch(initialSaga(saga));
	}

	return null;
};
