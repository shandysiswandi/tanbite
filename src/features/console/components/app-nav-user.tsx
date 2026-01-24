import { Link } from "@tanstack/react-router";
import { Bell, LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfile } from "../hooks/use-profile";

export function AppNavUser() {
  const { isLoggingOut, isProfileLoading, profile, onLogout } = useProfile();

  if (isProfileLoading) {
    return (
      <Button className="rounded-full" disabled size="icon" variant="ghost">
        <Skeleton className="size-8 rounded-full" />
      </Button>
    );
  }

  const avatar = profile?.avatar?.trim();
  const user = {
    name: profile?.name ?? "User",
    avatar: avatar || undefined,
    email: profile?.email ?? "user@gobite.com",
  };
  const userInitial = user.name.trim().charAt(0) || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full" size="icon" variant="ghost">
          <Avatar className="size-8 rounded-full">
            <AvatarImage alt={user.name} src={user.avatar} />
            <AvatarFallback className="rounded-lg">
              {userInitial}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="bottom"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="size-8 rounded-full">
              <AvatarImage alt={user.name} src={user.avatar} />
              <AvatarFallback className="rounded-lg">
                {userInitial}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/console/me" viewTransition>
              <User />
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link to="/console/me/notifications" viewTransition>
              <Bell />
              Notifications
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link to="/console/me/settings" viewTransition>
              <Settings />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled={isLoggingOut}
          onClick={onLogout}
          variant="destructive"
        >
          <LogOut />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
