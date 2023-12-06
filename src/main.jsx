import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./utils/interceptors.js";
import "./index.css";
import { Provider } from "react-redux";
import ConfigureStore from "./redux/store/index.js";
const store = ConfigureStore();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
