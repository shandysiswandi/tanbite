import type { QueryClient } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import { delTokensServerFn } from "@/app/servers/cookies";
import { ACTIONS } from "@/libraries/constants/permission";
import type { ProfilePermission } from "../model/profile";
import { profileQueryOptions } from "../queries/profile-query";

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

interface RequirePermissionInput {
  queryClient: QueryClient;
  permission: string;
  action?: string;
  locationHref: string;
  fallbackTo?: string;
}

export const requirePermission = async ({
  queryClient,
  permission,
  action = ACTIONS.read,
  locationHref,
  fallbackTo = "/console",
}: RequirePermissionInput) => {
  try {
    const profile = await queryClient.ensureQueryData(profileQueryOptions());

    if (hasPermission(profile?.permission, permission, action)) {
      return;
    }
  } catch (error) {
    const statusCode =
      typeof error === "object" && error && "statusCode" in error
        ? Number(error.statusCode)
        : null;

    if (statusCode === 401 || statusCode === 403) {
      await delTokensServerFn();
      throw redirect({
        to: "/login",
        search: { redirect: locationHref },
        replace: true,
        viewTransition: true,
      });
    }

    throw error;
  }

  throw redirect({ to: fallbackTo, viewTransition: true });
};
