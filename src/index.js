import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store";
import { fetchTodos } from "./store/todos.slice";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

store.dispatch(fetchTodos());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
