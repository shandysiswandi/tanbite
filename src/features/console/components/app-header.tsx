import { ModeSwitcher } from "@/components/mode-switcher";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppNavBreadcrumb } from "./app-nav-breadcrumb";
import { AppNavLanguage } from "./app-nav-language";
import { AppNavNotification } from "./app-nav-notification";
import { AppNavUser } from "./app-nav-user";

export function AppHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          className="mr-2 data-[orientation=vertical]:h-4"
          orientation="vertical"
        />

        <AppNavBreadcrumb />
      </div>

      <div className="ml-auto flex items-center gap-2 pr-4">
        <AppNavLanguage />
        <ModeSwitcher />
        <AppNavNotification />
        <AppNavUser />
      </div>
    </header>
  );
}
