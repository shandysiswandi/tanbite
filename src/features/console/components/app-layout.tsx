import { Outlet } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAppearance } from "@/features/console/hooks/use-appearance";
import { cn } from "@/libraries/utils/tailwind";
import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";

export function AppLayout() {
  const { density } = useAppearance();

  return (
    <SidebarProvider className="h-svh overflow-hidden">
      <AppSidebar />
      <SidebarInset className="flex min-w-0 flex-col border">
        <AppHeader />
        <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-auto will-change-[transform,opacity] [view-transition-name:console-content]">
          <main
            className={cn("mx-auto w-full p-4", {
              "max-w-5xl": density === "compact",
              "max-w-7xl": density === "comfortable",
              "max-w-none": density === "spacious",
            })}
          >
            <Outlet />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
