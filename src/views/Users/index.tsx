import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui";
import UsersList from "@/components/UsersList";
import { ROUTES } from "@/constants";

export default function Users() {
  return (
    <div className="flex flex-col mb-3 h-full">
      <UsersHeader />

      <UsersList />
    </div>
  );
}

function UsersHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center max-w-3xl">
      <h2 className="text-2xl my-5">Users</h2>

      <Button
        className="!bg-blue-800 !text-white"
        onClick={() => navigate(ROUTES.CREATE_USER)}
      >
        Add user
      </Button>
    </div>
  );
}
