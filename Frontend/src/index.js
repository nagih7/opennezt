import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import router from "./router/route";
import { Provider } from "react-redux";
import store from "./states/configureStore";
import "bootstrap/dist/css/bootstrap.min.css";
import { RootProvider } from "context/RootContext";
import Mobile_Responsive from "components/common/Mobile_Responsive";

const root = ReactDOM.createRoot(document.getElementById("root"));

const isMobileDevice = () => {
	return /Mobi|Android/i.test(navigator.userAgent);
};

root.render(
	<Provider store={store}>
		<RootProvider>
			{isMobileDevice() ? (
				<Mobile_Responsive />
			) : (
				<RouterProvider router={router} />
			)}
		</RootProvider>
	</Provider>
);

reportWebVitals();
