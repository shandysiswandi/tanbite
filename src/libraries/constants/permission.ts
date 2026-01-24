export const PERMISSIONS = {
  management: {
    users: "identity:management:users",
    rbac: "identity:management:rbac",
  },
} as const;

export const ACTIONS = {
  read: "read",
  create: "create",
  update: "update",
  delete: "delete",
  import: "import",
  export: "export",
} as const;
