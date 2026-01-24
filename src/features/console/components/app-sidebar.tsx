import { Link, useLocation } from "@tanstack/react-router";
import {
  Bell,
  Bot,
  Gauge,
  KeyRound,
  LayoutDashboard,
  Link2,
  Palette,
  Shield,
  ShieldCheck,
  SquareTerminal,
  User,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { APP } from "@/libraries/constants/app";
import { type Locale, locales } from "@/libraries/paraglide/runtime";
import type { NavData } from "../model/layout";
import { AppNav } from "./app-nav";

const data: NavData = {
  navOverview: [
    {
      title: "Dashboard",
      to: "/console",
      exact: true,
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
      title: "Dashboard",
      to: "/console/managements",
      exact: true,
      icon: LayoutDashboard,
      permission: "identity:management:dashboard",
    },
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
  userSettings: [
    {
      title: "Account",
      to: "/console/me/settings",
      exact: true,
      icon: User,
    },
    {
      title: "Appearance",
      to: "/console/me/settings/appearance",
      icon: Palette,
    },
    {
      title: "Notification",
      to: "/console/me/settings/notifications",
      icon: Bell,
    },
    {
      title: "Connection",
      to: "/console/me/settings/connections",
      icon: Link2,
    },
    {
      title: "Password",
      to: "/console/me/settings/password",
      icon: KeyRound,
    },
    {
      title: "Security",
      to: "/console/me/settings/security",
      icon: Shield,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { pathname } = useLocation();
  const pathSegments = pathname.split("/").filter(Boolean);
  const hasLocalePrefix = locales.includes(pathSegments[0] as Locale);
  const pathnameWithoutLocale = `/${
    hasLocalePrefix ? pathSegments.slice(1).join("/") : pathSegments.join("/")
  }`;
  const isUserSettingsPage = pathnameWithoutLocale.startsWith(
    "/console/me/settings"
  );

  return (
    <Sidebar className="p-0" variant="inset" {...props}>
      <SidebarHeader className="h-16">
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
        {isUserSettingsPage ? (
          <AppNav items={data.userSettings} label="User settings" />
        ) : (
          <>
            <AppNav items={data.navOverview} />
            <AppNav items={data.navFeatures} label="Features" />
            <AppNav items={data.navManagements} label="Managements" />
          </>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
