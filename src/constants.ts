export const STATUSES = ["new", "in process", "testing", "done"] as const;

export const REQUEST_STATUTES = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
} as const;

export const routes = [
  { path: "/", label: "Home", canAccess: ["*"] },
  { path: "/board", label: "Board", canAccess: ["user"] },
  { path: "/users", label: "Users", canAccess: ["admin"] },
];
