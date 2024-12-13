import { useGetAllUsersQuery } from "@/services/api/modules/users";
import ListItem from "./list-item";

export default function UsersList() {
  const { data } = useGetAllUsersQuery({ limit: 999, offset: 0 });
  const users = data?.results || [];

  return (
    <div>
      <h2 className="text-2xl my-5">Users</h2>
      <ul className="flex flex-col gap-3">
        {users?.map((user) => (
          <ListItem key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
}
