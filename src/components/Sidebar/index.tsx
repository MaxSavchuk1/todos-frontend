import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import Userbar from "./user-bar";
import styles from "./styles.module.css";
import useRoles from "@/hooks/useRoles";
import { routes } from "@/constants";

export default function Sidebar() {
  const { check } = useRoles();
  const { pathname } = useLocation();

  const isCurrentRoute = (route: string) => pathname === route;

  return (
    <nav className={styles.container}>
      <h1 className={styles.logo}>Jeera 🤪</h1>

      <div className={styles.links}>
        {routes
          .filter((route) => check(route.canAccess))
          .map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={clsx(
                isCurrentRoute(route.path) && styles.currentRoute
              )}
            >
              {route.label}
            </Link>
          ))}
      </div>

      <div className="mx-auto mb-5 mt-auto">
        <Userbar />
      </div>
    </nav>
  );
}
