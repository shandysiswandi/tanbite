import { createFileRoute, Link } from "@tanstack/react-router";
import { BellDot, CheckCheck, Settings } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PageBase } from "@/features/console/components/page-base";
import type { Notification } from "@/features/console/model/notifications";
import { seo } from "@/libraries/utils/seo";

const initialNotifications: Notification[] = [
  {
    id: "notif-1",
    title: "Weekly report is ready",
    message: "Your growth summary for last week is available in analytics.",
    category: "Report",
    time: "2 min ago",
    status: "unread",
  },
  {
    id: "notif-2",
    title: "New sign-in from Chrome on macOS",
    message: "If this wasn't you, reset your password immediately.",
    category: "Security",
    time: "18 min ago",
    status: "unread",
  },
  {
    id: "notif-3",
    title: "Policy update applied",
    message: "RBAC policy changes were deployed successfully.",
    category: "System",
    time: "1 hour ago",
    status: "read",
  },
  {
    id: "notif-4",
    title: "2 team members joined",
    message: "Ari Putra and Dinda Nabilah accepted your invites.",
    category: "Team",
    time: "Yesterday",
    status: "read",
  },
];

export const Route = createFileRoute("/console/me/notifications")({
  head: () => ({
    meta: seo({
      path: "/console/me/notifications",
      title: "All notifications",
      description:
        "Stay up to date with account activity, security alerts, and workspace updates.",
    }),
  }),
  component: () => {
    const [notifications, setNotifications] =
      useState<Notification[]>(initialNotifications);

    const handleMarkAsRead = (notificationId: string) => {
      setNotifications((previousNotifications) =>
        previousNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, status: "read" }
            : notification
        )
      );
    };

    const handleMarkAllAsRead = () => {
      setNotifications((previousNotifications) =>
        previousNotifications.map((notification) => ({
          ...notification,
          status: "read",
        }))
      );
    };

    const readNotifications = notifications.filter(
      (notification) => notification.status === "read"
    );
    const unreadNotifications = notifications.filter(
      (notification) => notification.status === "unread"
    );

    return (
      <PageBase
        subtitle="Stay up to date with account activity, security alerts, and workspace updates."
        title="All notifications"
      >
        <div className="flex flex-wrap items-center justify-end gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={handleMarkAllAsRead} size="sm" variant="outline">
              <CheckCheck />
              Mark all as read
            </Button>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild size="icon-sm" variant="outline">
                  <Link to="/console/me/settings/notifications" viewTransition>
                    <Settings />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notification settings</TooltipContent>
            </Tooltip>
          </div>
        </div>

        <Card>
          <CardContent>
            <Tabs className="gap-4" defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="read">Read</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
              </TabsList>

              <TabsContent className="space-y-0" value="all">
                <NotificationsList
                  notifications={notifications}
                  onMarkAsRead={handleMarkAsRead}
                />
              </TabsContent>
              <TabsContent className="space-y-0" value="read">
                <NotificationsList notifications={readNotifications} />
              </TabsContent>
              <TabsContent className="space-y-0" value="unread">
                <NotificationsList
                  notifications={unreadNotifications}
                  onMarkAsRead={handleMarkAsRead}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </PageBase>
    );
  },
});

function NotificationsList({
  notifications,
  onMarkAsRead,
}: {
  notifications: Notification[];
  onMarkAsRead?: (notificationId: string) => void;
}) {
  if (notifications.length === 0) {
    return (
      <div className="rounded-lg border border-dashed py-10 text-center">
        <p className="font-medium text-sm">No notifications found</p>
        <p className="mt-1 text-muted-foreground text-sm">
          You're all caught up for this tab.
        </p>
      </div>
    );
  }

  return (
    <>
      {notifications.map((notification, index) => (
        <div key={notification.id}>
          <article className="flex gap-3 py-4">
            <div className="pt-0.5">
              <div className="flex size-8 items-center justify-center rounded-full bg-muted">
                <BellDot className="size-4" />
              </div>
            </div>

            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-sm">{notification.title}</p>
                <Badge
                  variant={
                    notification.status === "unread" ? "default" : "secondary"
                  }
                >
                  {notification.category}
                </Badge>
                {notification.status === "unread" ? (
                  <Badge variant="outline">New</Badge>
                ) : null}
              </div>
              <p className="text-muted-foreground text-sm">
                {notification.message}
              </p>
            </div>

            <p className="shrink-0 text-muted-foreground text-xs">
              {notification.time}
            </p>
            {notification.status === "unread" && onMarkAsRead && (
              <Button
                className="rounded-full"
                onClick={() => onMarkAsRead(notification.id)}
                size="icon-xs"
                variant="outline"
              >
                <CheckCheck />
              </Button>
            )}
          </article>
          {index < notifications.length - 1 ? <Separator /> : null}
        </div>
      ))}
    </>
  );
}
