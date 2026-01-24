import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getTokensServerFn } from "@/app/servers/cookies";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/features/console/components/app-header";
import { AppSidebar } from "@/features/console/components/app-sidebar";
import { seo } from "@/libraries/utils/seo";

export const Route = createFileRoute("/console")({
  beforeLoad: async ({ location }) => {
    const tokens = await getTokensServerFn();
    if (!tokens.accessToken) {
      throw redirect({
        to: "/login",
        replace: true,
        search: { redirect: location.href },
      });
    }
  },
  head: () => ({
    meta: seo({
      path: "/console",
      title: "Console",
      description: "Description Console",
    }),
  }),
  component: () => {
    return (
      <SidebarProvider className="h-svh overflow-hidden">
        <AppSidebar />
        <SidebarInset className="flex min-w-0 flex-col">
          <AppHeader />
          <main className="min-h-0 flex-1 overflow-auto">
            <div className="flex min-w-0 flex-col gap-4 p-4">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    );
  },
});
