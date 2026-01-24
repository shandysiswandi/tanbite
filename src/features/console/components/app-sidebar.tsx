import { Link } from "@tanstack/react-router";
import { Bot, Gauge, ShieldCheck, SquareTerminal, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { APP } from "@/libraries/constants/app";
import type { NavData } from "../model/layout";
import { AppNav } from "./app-nav";

const data: NavData = {
  navOverview: [
    {
      title: "Dashboard",
      to: "/console",
      icon: Gauge,
    },
  ],
  navFeatures: [
    {
      title: "Feature 1",
      icon: SquareTerminal,
      items: [
        {
          title: "Page 1",
          to: "/console/feature1/page1",
        },
        {
          title: "Page 2",
          to: "/console/feature1/page2",
        },
      ],
    },
    {
      title: "Feature 2",
      icon: Bot,
      items: [
        {
          title: "Page 1",
          to: "/console/feature2/page1",
        },
        {
          title: "Page 2",
          to: "/console/feature2/page2",
        },
      ],
    },
  ],
  navManagements: [
    {
      title: "Users",
      to: "/console/managements/users",
      icon: Users,
      permission: "identity:management:users",
    },
    {
      title: "Policies",
      to: "/console/managements/policies",
      icon: ShieldCheck,
      permission: "identity:management:rbac",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link to="/console" viewTransition>
                <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
                  <img
                    alt="icon console"
                    className="size-8 object-contain"
                    height="32"
                    src="/logo192.png"
                    width="32"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{APP.siteName}</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <AppNav items={data.navOverview} />
        <AppNav items={data.navFeatures} label="Features" />
        <AppNav items={data.navManagements} label="Managements" />
      </SidebarContent>
    </Sidebar>
  );
}
