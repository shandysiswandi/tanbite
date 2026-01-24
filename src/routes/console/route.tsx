import { createFileRoute, redirect } from "@tanstack/react-router";
import { getTokensServerFn } from "@/app/servers/cookies";
import { AppLayout } from "@/features/console/components/app-layout";
import { AppNotFound } from "@/features/console/components/app-not-found";
import { AppearanceProvider } from "@/features/console/providers/appearance-provider";
import { ProfileProvider } from "@/features/console/providers/profile-provider";
import { seo } from "@/libraries/utils/seo";

export const Route = createFileRoute("/console")({
  beforeLoad: async ({ location }) => {
    const tokens = await getTokensServerFn();
    if (!tokens.accessToken) {
      throw redirect({
        to: "/login",
        replace: true,
        viewTransition: true,
        search: { redirect: location.href },
      });
    }
  },
  head: () => ({
    meta: seo({
      path: "/console",
      title: "Console",
      description: "Manage your console dashboard and workspace operations.",
    }),
  }),
  notFoundComponent: AppNotFound,
  component: () => {
    return (
      <ProfileProvider>
        <AppearanceProvider>
          <AppLayout />
        </AppearanceProvider>
      </ProfileProvider>
    );
  },
});
