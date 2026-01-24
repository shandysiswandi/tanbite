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
import { useProfile } from "../hooks/use-profile";
import { actions, hasPermission } from "../libraries/permission";
import type { NavItem, NavItemGroup } from "../model/layout";
import type { ProfilePermission } from "../model/profile";

const isNavGroup = (item: NavItem): item is NavItemGroup => "items" in item;

const filterNavItems = (items: NavItem[], permissionMap?: ProfilePermission) =>
  items.reduce<NavItem[]>((accumulator, item) => {
    if (
      item.permission &&
      !hasPermission(permissionMap, item.permission, actions.read)
    ) {
      return accumulator;
    }

    if (isNavGroup(item)) {
      const filteredItems = item.items.filter((subItem) =>
        subItem.permission
          ? hasPermission(permissionMap, subItem.permission, actions.read)
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
  const { profile } = useProfile();
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
          const isMainActive = !isGroup && pathname === item.to;
          const isSubItemActive =
            isGroup && item.items.some((sub) => sub.to === pathname);
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
                        const isSubActive = pathname === subItem.to;

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
