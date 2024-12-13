import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store";
import { useGetProfileQuery } from "@/services/api/modules/auth";
import { api } from "@/services/api";
import { clearTokens } from "@/store/auth.slice";
import styles from "./styles.module.css";

export default function Userbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data: user } = useGetProfileQuery();

  const logOut = () => {
    dispatch(api.util.resetApiState());
    dispatch(clearTokens());
    navigate("/sign-in");
  };

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center p-1.5">
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

      <MenuItems transition anchor="top" className={styles.dropdown}>
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
  );
}
