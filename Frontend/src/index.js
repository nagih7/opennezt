import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import router from "./router/route";
import { Provider } from "react-redux";
import store from "./states/configureStore";
import "bootstrap/dist/css/bootstrap.min.css";
import { SocketProvider } from "components/common/SocketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<SocketProvider>
			<RouterProvider router={router} />
		</SocketProvider>
	</Provider>
);

reportWebVitals();
