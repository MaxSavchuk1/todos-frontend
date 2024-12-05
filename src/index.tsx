import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

import App from "./App";
import { store } from "./store/index";
import { fetchTodos } from "./store/todos.slice.ts";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

store.dispatch(fetchTodos());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>
);
