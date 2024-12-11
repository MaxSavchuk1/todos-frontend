import { createBrowserRouter, redirect } from "react-router-dom";
import { store } from "@/store";
import { api } from "@/services/api";
import { setTodos } from "@/store/todos.slice";
import ProtectedRoute from "@/components/ProtectedRoute";
import Board from "@/views/Board";
import SignIn from "@/views/SignIn";
import SignUp from "@/views/SignUp";
import CommonLayout from "@/layouts/CommonLayout";
import Profile from "@/views/Profile";

const mainPageLoader = async () => {
  const result = await store.dispatch(api.endpoints.getTodos.initiate());
  store.dispatch(setTodos(result.data));
  return null;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <CommonLayout />
      </ProtectedRoute>
    ),
    // HydrateFallback: null,
    children: [
      {
        index: true,
        loader: () => redirect("/board"),
      },
      {
        path: "board",
        element: <Board />,
        loader: mainPageLoader,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "sign-in",
    element: <SignIn />,
  },
  {
    path: "sign-up",
    element: <SignUp />,
  },
]);
