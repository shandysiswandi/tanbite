import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Compass,
  LayoutGrid,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { m } from "@/libraries/paraglide/messages";

const quickLinks: Array<{
  key: "home" | "login" | "register" | "console";
  to: string;
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    key: "home",
    to: "/",
    icon: Compass,
    title: m["quick_links.home_title"](),
    description: m["quick_links.home_description"](),
  },
  {
    key: "login",
    to: "/login",
    icon: LogIn,
    title: m["quick_links.login_title"](),
    description: m["quick_links.login_description"](),
  },
  {
    key: "console",
    to: "/console",
    icon: LayoutGrid,
    title: m["quick_links.console_title"](),
    description: m["quick_links.console_description"](),
  },
  {
    key: "register",
    to: "/register",
    icon: UserPlus,
    title: m["quick_links.register_title"](),
    description: m["quick_links.register_description"](),
  },
];

export const QuickLinks = () => {
  return (
    <Card className="fade-in-0 slide-in-from-bottom-50 animate-in duration-700">
      <CardHeader>
        <CardTitle className="text-muted-foreground text-xs uppercase tracking-widest">
          {m["quick_links.label"]()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {quickLinks.map(({ key, to, icon: Icon, title, description }) => (
          <Link
            className="group flex items-start gap-3 rounded-xl border border-border/60 bg-background/70 p-4 transition hover:border-border hover:bg-accent/40"
            key={key}
            to={to}
            viewTransition
          >
            <span className="flex size-10 items-center justify-center rounded-lg bg-muted text-foreground">
              <Icon className="size-5" />
            </span>
            <div className="flex-1 space-y-1">
              <p className="font-medium text-sm">{title}</p>
              <p className="text-muted-foreground text-sm">{description}</p>
            </div>
            <span className="mt-1 flex size-8 items-center justify-center rounded-full border border-transparent text-muted-foreground transition group-hover:border-border group-hover:text-foreground">
              <ArrowUpRight className="size-4" />
            </span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};
