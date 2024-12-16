import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import Userbar from "./user-bar";
import styles from "./styles.module.css";
import useAuth from "@/hooks/useAuth";
import { sidebarLinks } from "@/constants";

export default function Sidebar() {
  const { check } = useAuth();
  const { pathname } = useLocation();

  const isCurrentRoute = (route: string) => pathname === route;

  return (
    <nav className={styles.container}>
      <h1 className={styles.logo}>Jeera 🤪</h1>

      <div className={styles.links}>
        {sidebarLinks
          .filter((link) => check(link.canAccess))
          .map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={clsx(isCurrentRoute(link.path) && styles.currentRoute)}
            >
              {link.label}
            </Link>
          ))}
      </div>

      <div className="mx-auto mb-5 mt-auto">
        <Userbar />
      </div>
    </nav>
  );
}
