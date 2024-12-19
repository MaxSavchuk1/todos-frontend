import { memo, useMemo } from "react";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Role, User } from "@/helpers/types";
import {
  useAddRoleMutation,
  useRemoveRoleMutation,
} from "@/services/api/modules/roles";
import styles from "./styles.module.css";
import Alert from "../ui/Alert";

function RoleEditor({ user }: { user: User }) {
  const [addRoleRequest] = useAddRoleMutation();
  const [removeRoleRequest] = useRemoveRoleMutation();

  const availableRoles = useMemo(
    () => Object.values(Role).filter((role) => !user.roles.includes(role)),
    [user.roles]
  );
  const showAdminAlert =
    user.roles.includes(Role.ADMIN) && user.roles.length > 1;

  const updateRole = async (type: "add" | "remove", role: Role) => {
    const body = { userId: user.id, role };
    if (type === "add") {
      await addRoleRequest(body);
    } else {
      await removeRoleRequest(body);
    }
  };

  return (
    <>
      {showAdminAlert && (
        <Alert type="info">
          Admin role grant access to all app, you don't need to assign other
          roles
        </Alert>
      )}

      <div className={styles.container}>
        <section>
          <h3 className={styles.sectionHeader}>Available Roles</h3>
          <ul className="space-y-2">
            {availableRoles.map((role) => (
              <li key={role} className={styles.sectionItem}>
                <span>{role}</span>
                <PlusCircleIcon
                  className={styles.sectionItemIcon}
                  onClick={() => updateRole("add", role)}
                />
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className={styles.sectionHeader}>Assigned Roles</h3>
          <ul className="space-y-2">
            {user.roles.map((role) => (
              <li key={role} className={styles.sectionItem}>
                <span>{role}</span>
                <MinusCircleIcon
                  className={styles.sectionItemIcon}
                  onClick={() => updateRole("remove", role)}
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default memo(RoleEditor);
