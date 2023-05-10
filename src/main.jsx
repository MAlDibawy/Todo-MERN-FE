import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import "bootstrap/dist/js/bootstrap.bundle";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./app/store";

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
