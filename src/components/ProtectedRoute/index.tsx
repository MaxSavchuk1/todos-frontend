import { Navigate, useLocation } from "react-router-dom";
import useCustomSelector from "@/hooks/useCustomSelector";
import useRoles from "@/hooks/useRoles";
import { memo } from "react";

type Props = {
  children: React.ReactNode;
};

type useRolesReturnType = ReturnType<typeof useRoles>;

const userRoutes = ["/board"];

const adminRoutes = ["/users"];

const checkPrivateRoutes = (
  children: Props["children"],
  { isAdmin, isUser }: useRolesReturnType,
  pathname: string
) => {
  if (!isAdmin && adminRoutes.includes(pathname)) {
    return <Navigate to="/" />;
  }

  if (!isUser && userRoutes.includes(pathname)) {
    return <Navigate to="/" />;
  }

  return children;
};

function ProtectedRoute({ children }: Props) {
  const useRolesHook = useRoles();
  const { pathname } = useLocation();
  const accessToken = useCustomSelector((state) => state.auth.accessToken);

  if (!accessToken) {
    return <Navigate to="/sign-in" replace />;
  }

  return checkPrivateRoutes(children, useRolesHook, pathname);
}

export default memo(ProtectedRoute);
