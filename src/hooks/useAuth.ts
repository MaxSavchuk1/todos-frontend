import { parseToken } from "@/helpers";
import { Role } from "@/helpers/types";
import useCustomSelector from "./useCustomSelector";

const useAuth = () => {
  const accessToken = useCustomSelector((state) => state.auth.accessToken);
  const user = parseToken(accessToken);

  const userRoles = user?.roles || [];
  const userId = user?.sub as number | undefined;

  const isAdmin = userRoles.includes(Role.ADMIN);
  const isUser = userRoles.includes(Role.APP_USER);
  const isUserManager = userRoles.includes(Role.USER_MANAGER);

  const check = (roles: string[]) => {
    if (roles.includes("*") || userRoles.includes(Role.ADMIN)) return true;
    for (const role of roles) {
      if (userRoles.includes(role as Role)) return true;
    }
    return false;
  };

  return {
    isAuthenticated: !!accessToken,
    isAdmin,
    isUser,
    isUserManager,

    userRoles,
    userId,

    check,
  };
};

export default useAuth;
