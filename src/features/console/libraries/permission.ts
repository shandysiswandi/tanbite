import type { ProfilePermission } from "../model/profile";

export const permissions = {
  management: {
    users: "identity:management:users",
    rbac: "identity:management:rbac",
  },
} as const;

export const actions = {
  read: "read",
  create: "create",
  update: "update",
  delete: "delete",
  import: "import",
  export: "export",
} as const;

export const hasPermission = (
  permission: ProfilePermission | undefined,
  resource: string | undefined,
  action: string
) => {
  if (!(permission && resource)) {
    return false;
  }

  const globalActions = permission["*"];
  if (globalActions?.includes("*") || globalActions?.includes(action)) {
    return true;
  }

  const resourceActions = permission[resource];
  if (!resourceActions) {
    return false;
  }

  return resourceActions.includes("*") || resourceActions.includes(action);
};
