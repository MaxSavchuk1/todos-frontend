import { DateTime } from "luxon";
import { useGetAllUsersQuery } from "@/services/api/modules/users";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants";
import Loader from "../Loader";
import useAuth from "@/hooks/useAuth";

export default function UsersList() {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const { data, isLoading } = useGetAllUsersQuery({ limit: 999, offset: 0 });
  const users = data?.results || [];

  const userClickHandler = (selectedUserId: number) => {
    if (userId === selectedUserId) return navigate(ROUTES.PROFILE);
    return navigate(`${ROUTES.USERS}/${selectedUserId}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <table border={1} className={styles.usersTable}>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last Name</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={3}>No users</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} onClick={() => userClickHandler(user.id)}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{DateTime.fromISO(user.createdAt).toFormat("f")}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
