import { Role } from "./helpers/types";

export const STATUSES = ["new", "in process", "testing", "done"] as const;

export const ROUTES = {
  HOME: "/",
  BOARD: "/board",
  PROFILE: "/profile",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  USERS: "/users",
  CREATE_USER: "/users/create",
  CHANGE_PASSWORD: "/change-password",
};

export const sidebarLinks = [
  { path: ROUTES.HOME, label: "Home", canAccess: ["*"] },
  { path: ROUTES.BOARD, label: "Board", canAccess: [Role.APP_USER] },
  { path: ROUTES.USERS, label: "Users", canAccess: [Role.USER_MANAGER] },
];
