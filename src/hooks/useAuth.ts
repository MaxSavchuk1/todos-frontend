import { parseToken } from "@/helpers";
import { Role } from "@/helpers/types";
import useCustomSelector from "./useCustomSelector";

const useAuth = () => {
  const accessToken = useCustomSelector((state) => state.auth.accessToken);
  const user = parseToken(accessToken);

  const userRoles = user?.roles || [];
  const isAdmin = userRoles.includes(Role.Admin);
  const isUser = userRoles.includes(Role.User);

  const check = (roles: string[]) => {
    if (roles.includes("*")) return true;
    for (const role of roles) {
      if (userRoles.includes(role as Role)) return true;
    }
    return false;
  };

  return {
    isAuthenticated: !!accessToken,
    isAdmin,
    isUser,
    userRoles,
    check,
  };
};

export default useAuth;
