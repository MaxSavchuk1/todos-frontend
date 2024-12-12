import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useAppDispatch } from "@/store";
import { clearTokens } from "@/store/auth.slice";
import { clearTodos } from "@/store/todos.slice";
import { clearUser } from "@/store/user.slice";
import useCustomSelector from "@/hooks/useCustomSelector";
import styles from "./styles.module.css";

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useCustomSelector((state) => state.user.user);

  const logOut = () => {
    dispatch(clearTokens());
    dispatch(clearTodos());
    dispatch(clearUser());
    navigate("/sing-in");
  };

  return (
    <header className={styles.container}>
      <h1 className={styles.logo} onClick={() => navigate("/")}>
        Jeera 🤪
      </h1>

      <Menu as="div" className="relative">
        <MenuButton className="-m-1.5 flex items-center p-1.5">
          <img
            alt=""
            src="/no-profile-picture.png"
            className="size-8 rounded-full bg-gray-50"
          />

          <div className="flex items-center">
            <span className={styles.fullName}>
              {user?.firstName} {user?.lastName}
            </span>
            <ChevronDownIcon
              aria-hidden="true"
              className="ml-2 size-5 text-gray-400"
            />
          </div>
        </MenuButton>

        <MenuItems transition className={styles.dropdown}>
          {pathname !== "/profile" && (
            <MenuItem>
              <Link to="/profile" className="router-link">
                Your profile
              </Link>
            </MenuItem>
          )}

          <MenuItem>
            <div onClick={logOut} className={styles.logOut}>
              Log out
            </div>
          </MenuItem>
        </MenuItems>
      </Menu>
    </header>
  );
}
