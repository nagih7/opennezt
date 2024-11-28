import { redirect } from "react-router-dom";
import store from "../states/configureStore";
import { initialSaga } from "../states/modules/routing";
import { hasPermission } from "../utils/helper";
import { getMe } from "api/auth";
import { getAuthToken } from "../utils/localStorage";
import { getTotalUsers } from "api/manage";

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
	if (url.pathname === "/admin/manage") {
		await store.dispatch(getTotalUsers());
	}
	if (url.pathname === "/about-you") {
		await store.dispatch(getMe());
	}
	let { auth } = store.getState();

	if (!auth.isAuthSuccess && getAuthToken()) {
		await store.dispatch(getMe());
	}

	if (isAuth) {
		if (!auth.isAuthSuccess) {
			return redirect("/login");
		}

		if (permissions.length > 0 && !hasPermission(permissions)) {
			return redirect("/403");
		}
	} else {
		if (auth.isAuthSuccess && auth.authorize === "admin") {
			return redirect("/");
		} else if (auth.isAuthSuccess && auth.authorize === "user") {
			return redirect("/");
		}
		// return redirect("/");
	}

	if (saga) {
		store.dispatch(initialSaga(saga));
	}

	return null;
};
