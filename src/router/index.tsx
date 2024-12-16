import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { store } from "@/store";
import ProtectedRoute from "@/components/ProtectedRoute";
import CommonLayout from "@/layouts/CommonLayout";
import { authApi } from "@/services/api/modules/auth";
import { ROUTES } from "@/constants";

const mainPageLoader = async () => {
  if (!store.getState().auth.accessToken) return null;

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
const PasswordChange = lazy(() => import("@/views/PasswordChange"));

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
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
        path: ROUTES.BOARD,
        element: <Board />,
      },
      {
        path: ROUTES.PROFILE,
        element: <Profile />,
      },
      {
        path: ROUTES.USERS,
        element: <Users />,
      },
      {
        path: ROUTES.CHANGE_PASSWORD,
        element: <PasswordChange />,
      },
    ],
  },
  {
    path: ROUTES.SIGN_IN,
    element: <SignIn />,
  },
  {
    path: ROUTES.SIGN_UP,
    element: <SignUp />,
  },
  // {
  //   path: "/test",
  //   element: <TestPage />,
  // },
]);
