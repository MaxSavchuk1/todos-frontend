export const STATUSES = ["new", "in process", "testing", "done"] as const;

export const REQUEST_STATUTES = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
} as const;

export const ROUTES = {
  HOME: "/",
  BOARD: "/board",
  PROFILE: "/profile",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  USERS: "/users",
  CHANGE_PASSWORD: "/change-password",
};

export const sidebarLinks = [
  { path: ROUTES.HOME, label: "Home", canAccess: ["*"] },
  { path: ROUTES.BOARD, label: "Board", canAccess: ["user"] },
  { path: ROUTES.USERS, label: "Users", canAccess: ["admin"] },
];
