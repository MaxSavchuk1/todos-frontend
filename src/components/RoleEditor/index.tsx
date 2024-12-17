import { memo, useMemo } from "react";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Role, User } from "@/helpers/types";
import {
  useAddRoleMutation,
  useRemoveRoleMutation,
} from "@/services/api/modules/roles";

function RoleEditor({ user }: { user: User }) {
  const [addRoleRequest] = useAddRoleMutation();
  const [removeRoleRequest] = useRemoveRoleMutation();

  const availableRoles = useMemo(
    () => Object.values(Role).filter((role) => !user.roles.includes(role)),
    [user.roles]
  );

  const updateRole = async (type: "add" | "remove", role: Role) => {
    const body = { userId: user.id, role };
    if (type === "add") {
      await addRoleRequest(body);
    } else {
      await removeRoleRequest(body);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h3 className="mb-2 font-semibold underline">Available Roles</h3>
        <ul className="space-y-2">
          {availableRoles.map((role) => (
            <li
              key={role}
              className="flex items-center justify-between max-w-24"
            >
              <span>{role}</span>
              <PlusCircleIcon
                className="w-6 cursor-pointer"
                onClick={() => updateRole("add", role)}
              />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-2 font-semibold underline">Assigned Roles</h3>
        <ul className="space-y-2">
          {user.roles.map((role) => (
            <li
              key={role}
              className="flex items-center justify-between max-w-24"
            >
              <span>{role}</span>
              <MinusCircleIcon
                className="w-6 cursor-pointer"
                onClick={() => updateRole("remove", role)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default memo(RoleEditor);
