import type { LucideIcon } from "lucide-react";
import type { FileRouteTypes } from "@/app/route-tree.gen";

interface NavBase {
  title: string;
  icon?: LucideIcon;
  permission?: string;
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
  navOverview: NavItem[];
  navFeatures: NavItem[];
  navManagements: NavItem[];
  userSettings: NavItem[];
}
