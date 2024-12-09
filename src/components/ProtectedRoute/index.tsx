import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "@/store";

export const ProtectedRoute: React.FC = () => {
  const accessToken = useSelector((state: AppState) => state.auth.accessToken);

  if (!accessToken) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};
