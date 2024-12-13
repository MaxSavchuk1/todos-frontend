import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { store } from "@/store";
import { todosApi } from "@/services/api/modules/todos";
import ProtectedRoute from "@/components/ProtectedRoute";
import CommonLayout from "@/layouts/CommonLayout";
import TestPage from "@/views/TestPage";
import { authApi } from "@/services/api/modules/auth";

const mainPageLoader = async () => {
  if (!store.getState().auth.accessToken) return null;

  await store.dispatch(todosApi.endpoints.getTodos.initiate());
  await store.dispatch(authApi.endpoints.getProfile.initiate());

  return null;
};

const Home = lazy(() => import("@/views/Home"));
const Board = lazy(() => import("@/views/Board"));
const Profile = lazy(() => import("@/views/Profile"));
const SignIn = lazy(() => import("@/views/SignIn"));
const SignUp = lazy(() => import("@/views/SignUp"));
const ErrorPage = lazy(() => import("@/views/ErrorPage"));
const Users = lazy(() => import("@/views/Users"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <CommonLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    loader: mainPageLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "board",
        element: <Board />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "users",
        element: <Users />,
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
