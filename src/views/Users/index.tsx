import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui";
import UsersList from "@/components/UsersList";
import { ROUTES } from "@/constants";

export default function Users() {
  const navigate = useNavigate();
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center max-w-screen-sm">
        <h2 className="text-2xl my-5">Users</h2>

        <Button
          className="!bg-sky-200"
          onClick={() => navigate(ROUTES.CREATE_USER)}
        >
          Add user
        </Button>
      </div>

      <UsersList />
    </div>
  );
}
