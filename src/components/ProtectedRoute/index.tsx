import { Navigate, useLocation } from "react-router-dom";
import { memo } from "react";
import useCustomSelector from "@/hooks/useCustomSelector";
import useAuth from "@/hooks/useAuth";
import { ROUTES } from "@/constants";

type useAuthReturnType = ReturnType<typeof useAuth>;
type Props = {
  children: React.ReactNode;
};

const userRoutes = [ROUTES.BOARD];

const adminRoutes = [ROUTES.USERS];

const checkPrivateRoutes = (
  children: Props["children"],
  { isAdmin, isUser }: useAuthReturnType,
  pathname: string
) => {
  if (!isAdmin && adminRoutes.includes(pathname)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  if (!isUser && userRoutes.includes(pathname)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return children;
};

function ProtectedRoute({ children }: Props) {
  const { pathname } = useLocation();
  const accessToken = useCustomSelector((state) => state.auth.accessToken);
  const useAuthHook = useAuth();

  if (!accessToken) {
    return <Navigate to={ROUTES.SIGN_IN} replace />;
  }

  return checkPrivateRoutes(children, useAuthHook, pathname);
}

export default memo(ProtectedRoute);
