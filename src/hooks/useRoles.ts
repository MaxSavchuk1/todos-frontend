import { Role } from "@/helpers/types";
import { useGetProfileQuery } from "@/services/api/modules/auth";

const useRoles = (trigger?: string) => {
  const { data: user } = useGetProfileQuery();
  trigger && console.log(trigger);

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
    isAdmin,
    isUser,
    userRoles,
    check,
  };
};

export default useRoles;
