import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authReducer from './state'
import { api } from "./state/api";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
  devTools: true,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
