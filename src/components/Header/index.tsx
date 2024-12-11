import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui";
import { useAppDispatch } from "@/store";
import { clearTokens } from "@/store/auth.slice";
import { clearTodos } from "@/store/todos.slice";

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const logOut = () => {
    dispatch(clearTokens());
    dispatch(clearTodos());
    navigate("/sing-in");
  };
  return (
    <header className="flex items-center justify-between">
      <h1
        className="text-3xl font-bold text-blue-500 mb-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Jeera 🤪
      </h1>

      <div className="flex items-center justify-center">
        {pathname !== "/profile" && (
          <Link to="/profile" className="router-link mr-4">
            My profile
          </Link>
        )}
        <Button
          type="button"
          onClick={logOut}
          className="bg-red-950 hover:bg-red-900 text-white"
        >
          Log out
        </Button>
      </div>
    </header>
  );
}
