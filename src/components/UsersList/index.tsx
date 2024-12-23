import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllUsersQuery } from "@/services/api/modules/users";
import { ROUTES } from "@/constants";
import useAuth from "@/hooks/useAuth";
import Loader from "../Loader";
import Pagination from "../Pagination";
import styles from "./styles.module.css";

export default function UsersList() {
  const navigate = useNavigate();
  const { userId } = useAuth();

  const limit = 10;
  const [offset, setOffset] = useState(0);

  const { data, isLoading } = useGetAllUsersQuery({
    limit,
    offset,
  });

  const onPageChange = (newOffset: number) => {
    setOffset(newOffset);
  };

  const users = data?.results || [];
  const totalUsers = data?.total || 0;

  const userClickHandler = (selectedUserId: number) => {
    if (userId === selectedUserId) return navigate(ROUTES.PROFILE);
    return navigate(`${ROUTES.USERS}/${selectedUserId}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-6 h-full">
      <table border={1} className={styles.usersTable}>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last Name</th>
            <th>Joined at</th>
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
                <td>{user.joinedAt}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Pagination
        className="mt-auto mb-8"
        pageSize={limit}
        offset={offset}
        total={totalUsers}
        onPageChange={onPageChange}
      />
    </div>
  );
}
