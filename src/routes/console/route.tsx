import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { delTokensServerFn, getTokensServerFn } from "@/app/servers/cookies";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/features/console/components/app-header";
import { AppNotFound } from "@/features/console/components/app-not-found";
import { AppSidebar } from "@/features/console/components/app-sidebar";
import { ProfileProvider } from "@/features/console/providers/profile-provider";
import { profileQueryOptions } from "@/features/console/queries/profile-query";
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
  loader: async ({ context, location }) => {
    // Prefetch profile for SSR so navigation renders consistently.
    try {
      await context.queryClient.ensureQueryData(profileQueryOptions());
    } catch (error) {
      const statusCode =
        typeof error === "object" && error && "statusCode" in error
          ? Number(error.statusCode)
          : null;

      if (statusCode === 403) {
        await delTokensServerFn();

        throw redirect({
          to: "/login",
          replace: true,
          viewTransition: true,
          search: { redirect: location.href },
        });
      }
    }
  },
  head: () => ({
    meta: seo({
      path: "/console",
      title: "Console",
      description: "Description Console",
    }),
  }),
  notFoundComponent: AppNotFound,
  component: () => {
    return (
      <ProfileProvider>
        <SidebarProvider className="h-svh overflow-hidden">
          <AppSidebar />
          <SidebarInset className="flex min-w-0 flex-col">
            <AppHeader />
            <main className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-auto p-4 will-change-[transform,opacity] [view-transition-name:console-content]">
              <Outlet />
            </main>
          </SidebarInset>
        </SidebarProvider>
      </ProfileProvider>
    );
  },
});
