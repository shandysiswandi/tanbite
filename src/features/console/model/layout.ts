import type { LucideIcon } from "lucide-react";
import type { FileRouteTypes } from "@/app/route-tree.gen";

interface NavBase {
  icon?: LucideIcon;
  permission?: string;
  title: string;
}

export type NavItemLink = NavBase & {
  to: FileRouteTypes["to"];
  exact?: boolean;
  items?: never;
};

export type NavItemGroup = NavBase & {
  items: NavItemLink[];
  to?: never;
};

export type NavItem = NavItemLink | NavItemGroup;

export interface NavData {
  navFeatures: NavItem[];
  navManagements: NavItem[];
  navOverview: NavItem[];
  userSettings: NavItem[];
}
