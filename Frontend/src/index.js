import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import router from "./router/route";
import { Provider } from "react-redux";
import store from "./states/configureStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
	<Provider store={store}>
  <Suspense
    fallback={
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f6f6f9" }}>
        <img 
          src="https://i.pinimg.com/originals/71/3a/32/713a3272124cc57ba9e9fb7f59e9ab3b.gif" 
          alt="Loading..." 
          style={{ width: "150px", height: "150px" }} 
        />
      </div>
    }
    
  >
    <RouterProvider router={router} />
  </Suspense>

</Provider>

);

reportWebVitals();
