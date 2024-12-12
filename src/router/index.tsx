import { lazy } from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import { store } from "@/store";
import { todosApi } from "@/services/api/modules/todos";
import ProtectedRoute from "@/components/ProtectedRoute";
import CommonLayout from "@/layouts/CommonLayout";
import TestPage from "@/views/TestPage";
import { authApi } from "@/services/api/modules/auth";

const mainPageLoader = async () => {
  if (!store.getState().auth.loggedUserId) return null;

  await Promise.all([
    store.dispatch(todosApi.endpoints.getTodos.initiate()),
    store.dispatch(authApi.endpoints.getProfile.initiate()),
  ]);

  return null;
};

const Board = lazy(() => import("@/views/Board"));
const Profile = lazy(() => import("@/views/Profile"));
const SignIn = lazy(() => import("@/views/SignIn"));
const SignUp = lazy(() => import("@/views/SignUp"));
const ErrorPage = lazy(() => import("@/views/ErrorPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <CommonLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
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
  {
    path: "test",
    element: <TestPage />,
  },
]);
