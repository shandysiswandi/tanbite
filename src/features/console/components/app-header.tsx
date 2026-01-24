import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppNavBreadcrumb } from "./app-nav-breadcrumb";
import { AppNavNotification } from "./app-nav-notification";
import { AppNavUser } from "./app-nav-user";

export function AppHeader() {
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <AppNavBreadcrumb />
      </div>

      <div className="ml-auto flex items-center gap-2 pr-4">
        <AppNavNotification />
        <AppNavUser />
      </div>
    </header>
  );
}
