import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

import { store } from "./store/index";
import "./index.css";
import Loader from "./components/Loader";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider>
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>
);
