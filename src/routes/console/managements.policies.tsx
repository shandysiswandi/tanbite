import { createFileRoute, redirect } from "@tanstack/react-router";
import {
  actions,
  hasPermission,
  permissions,
} from "@/features/console/libraries/permission";
import { profileQueryOptions } from "@/features/console/queries/profile-query";

export const Route = createFileRoute("/console/managements/policies")({
  loader: async ({ context }) => {
    const profile = await context.queryClient.ensureQueryData(
      profileQueryOptions()
    );

    if (
      !hasPermission(
        profile?.permission,
        permissions.management.rbac,
        actions.read
      )
    ) {
      throw redirect({ to: "/console", viewTransition: true });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/console/managements/policies"!</div>;
}
