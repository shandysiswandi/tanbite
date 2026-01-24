import { Link, useLocation } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { ACTIONS } from "@/libraries/constants/permission";
import { type Locale, locales } from "@/libraries/paraglide/runtime";
import { useProfile } from "../hooks/use-profile";
import { hasPermission } from "../libraries/permission";
import type { NavItem, NavItemGroup } from "../model/layout";
import type { ProfilePermission } from "../model/profile";

const isNavGroup = (item: NavItem): item is NavItemGroup => "items" in item;

const normalizePath = (path: string) => {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }

  return path;
};

const stripLocalePrefix = (path: string) => {
  const segments = path.split("/").filter(Boolean);
  const hasLocalePrefix = locales.includes(segments[0] as Locale);
  const segmentsWithoutLocale = hasLocalePrefix ? segments.slice(1) : segments;

  return normalizePath(`/${segmentsWithoutLocale.join("/")}`);
};

const isPathActive = (pathname: string, targetPath: string, exact = false) => {
  const currentPath = stripLocalePrefix(pathname);
  const normalizedTargetPath = normalizePath(targetPath);

  if (exact) {
    return currentPath === normalizedTargetPath;
  }

  if (normalizedTargetPath === "/") {
    return currentPath === normalizedTargetPath;
  }

  return (
    currentPath === normalizedTargetPath ||
    currentPath.startsWith(`${normalizedTargetPath}/`)
  );
};

const filterNavItems = (items: NavItem[], permissionMap?: ProfilePermission) =>
  items.reduce<NavItem[]>((accumulator, item) => {
    if (
      item.permission &&
      !hasPermission(permissionMap, item.permission, ACTIONS.read)
    ) {
      return accumulator;
    }

    if (isNavGroup(item)) {
      const filteredItems = item.items.filter((subItem) =>
        subItem.permission
          ? hasPermission(permissionMap, subItem.permission, ACTIONS.read)
          : true
      );

      if (filteredItems.length === 0) {
        return accumulator;
      }

      accumulator.push({ ...item, items: filteredItems });
      return accumulator;
    }

    accumulator.push(item);
    return accumulator;
  }, []);

export function AppNav({ items, label }: { label?: string; items: NavItem[] }) {
  const { pathname } = useLocation();
  const { isProfileLoading, profile } = useProfile();

  if (isProfileLoading) {
    const placeholderCount = Math.min(items.length, 3);

    return (
      <SidebarGroup>
        {label && (
          <SidebarGroupLabel>
            <Skeleton className="h-4 w-16" />
          </SidebarGroupLabel>
        )}
        <SidebarMenu>
          {Array.from({ length: placeholderCount }).map((_, index) => (
            <SidebarMenuItem
              key={`placeholder-${label ?? "overview"}-${index + 1}`}
            >
              <SidebarMenuButton disabled>
                <Skeleton className="size-4 rounded-sm" />
                <Skeleton
                  className={index % 2 === 0 ? "h-4 w-20" : "h-4 w-24"}
                />
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  const filteredItems = filterNavItems(items, profile?.permission);

  if (filteredItems.length === 0) {
    return null;
  }

  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {filteredItems.map((item) => {
          const isGroup = isNavGroup(item);
          const isMainActive =
            !isGroup && isPathActive(pathname, item.to, item.exact);
          const isSubItemActive =
            isGroup &&
            item.items.some((sub) => isPathActive(pathname, sub.to, sub.exact));
          const isOpen = Boolean(isSubItemActive);

          return (
            <Collapsible
              asChild
              className="group/collapsible"
              defaultOpen={isOpen}
              key={item.title}
            >
              <SidebarMenuItem>
                {isGroup ? (
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className="group"
                      // Pass isActive here if you want the parent highlighted when a child is active
                      // usually this remains false for the parent trigger, but you can change to `isActive={isSubItemActive}`
                      isActive={isMainActive}
                      tooltip={item.title}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform group-data-[state=open]:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                ) : (
                  <SidebarMenuButton
                    asChild
                    className="duration-200 ease-linear data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                    isActive={isMainActive}
                    tooltip={item.title}
                  >
                    <Link to={item.to} viewTransition>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                )}

                {isGroup && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => {
                        const isSubActive = isPathActive(
                          pathname,
                          subItem.to,
                          subItem.exact
                        );

                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              className="duration-200 ease-linear data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                              isActive={isSubActive}
                            >
                              <Link to={subItem.to} viewTransition>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
