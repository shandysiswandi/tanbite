import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function AppHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          className="mr-2 data-[orientation=vertical]:h-4"
          orientation="vertical"
        />

        {/* <NavBreadcrumb /> */}
      </div>

      <div className="ml-auto flex items-center gap-2 pr-3">
        {/* <NavLanguage />
        <NavNotification />
        <NavUser /> */}
      </div>
    </header>
  );
}
