import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/console/me/notifications")({
  component: RouteComponent,
});

function RouteComponent() {
  const preferences = [
    {
      title: "Order updates",
      description: "Status changes, delivery windows, and pickup reminders.",
      enabled: true,
    },
    {
      title: "Promotions",
      description:
        "Personalized offers, seasonal bundles, and loyalty rewards.",
      enabled: true,
    },
    {
      title: "Product feedback",
      description: "Follow-ups asking about your purchase experience.",
      enabled: false,
    },
    {
      title: "Account security",
      description: "Sign-ins from new devices and password changes.",
      enabled: true,
    },
  ];

  const channels = [
    { label: "Email", detail: "Primary inbox" },
    { label: "SMS", detail: "Saved mobile" },
    { label: "Push", detail: "This device" },
  ];

  const quietHourOptions = ["Everyday", "Weekdays", "Custom"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p className="font-medium text-muted-foreground text-sm">
            Notification center
          </p>
          <h1 className="font-semibold text-2xl tracking-tight">
            Manage how we reach you
          </h1>
          <p className="text-muted-foreground text-sm">
            Control alerts for orders, promotions, and account updates. Changes
            sync instantly across devices.
          </p>
        </div>
        <Badge variant="secondary">2 channels active</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Choose which notifications you want to receive.
              </CardDescription>
              <CardAction>
                <Button size="sm" variant="outline">
                  Manage defaults
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="space-y-5">
              {preferences.map((item, index) => (
                <div className="space-y-4" key={item.title}>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={item.enabled ? "secondary" : "outline"}>
                        {item.enabled ? "On" : "Off"}
                      </Badge>
                      <Switch
                        aria-label={`${item.title} notifications`}
                        defaultChecked={item.enabled}
                        size="sm"
                      />
                    </div>
                  </div>
                  {index < preferences.length - 1 ? <Separator /> : null}
                </div>
              ))}
            </CardContent>
            <CardFooter className="justify-between border-t">
              <p className="text-muted-foreground text-sm">
                Last updated 2 hours ago.
              </p>
              <Button size="sm">Save changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weekly digest</CardTitle>
              <CardDescription>
                A summary of activity every Monday at 9:00 AM.
              </CardDescription>
            </CardHeader>
            <CardFooter className="justify-between border-t">
              <Badge variant="outline">Enabled</Badge>
              <Button size="sm" variant="outline">
                Customize digest
              </Button>
            </CardFooter>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Channels</CardTitle>
              <CardDescription>
                Connected destinations for alerts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {channels.map((channel) => (
                <div
                  className="flex items-center justify-between rounded-lg border p-3"
                  key={channel.label}
                >
                  <div>
                    <p className="font-medium text-sm">{channel.label}</p>
                    <p className="text-muted-foreground text-xs">
                      {channel.detail}
                    </p>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quiet hours</CardTitle>
              <CardDescription>
                Only security alerts during this window.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold text-lg">10:00 PM - 7:00 AM</p>
                <p className="text-muted-foreground text-sm">
                  Adjust the schedule or keep it always on.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {quietHourOptions.map((option) => (
                  <Button
                    className="min-w-23"
                    key={option}
                    size="sm"
                    variant={option === "Everyday" ? "default" : "outline"}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips</CardTitle>
              <CardDescription>
                Fine-tune your delivery preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-4 text-muted-foreground text-sm">
                <li>Keep SMS on for delivery hand-offs.</li>
                <li>Route promos to your secondary inbox.</li>
                <li>Use quiet hours to avoid late-night pings.</li>
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
