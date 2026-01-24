import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useProfile } from "@/features/console/hooks/use-profile";

export const Route = createFileRoute("/console/me/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const { profile, isProfileLoading } = useProfile();
  const name = profile?.name ?? "Sasha Cullen";
  const email = profile?.email ?? "sasha@gobite.com";
  const avatar = profile?.avatar?.trim() || undefined;
  const status = profile?.status ?? "Active";
  const initials = name.trim().charAt(0) || "U";

  const stats = [
    { label: "Member since", value: "Jan 2022" },
    { label: "Last sign-in", value: "Today, 9:12 AM" },
    { label: "Plan", value: "Pro Console" },
    { label: "Access", value: "Admin" },
  ];

  const securityItems = [
    {
      title: "Two-factor authentication",
      description: "Extra verification with authenticator apps.",
      status: "Enabled",
      action: "Manage",
    },
    {
      title: "Password",
      description: "Last updated 2 months ago.",
      status: "Strong",
      action: "Change",
    },
    {
      title: "Active sessions",
      description: "3 devices signed in.",
      status: "Review",
      action: "View",
    },
  ];

  const connectedApps = [
    { name: "Stripe", detail: "Payments sync", status: "Connected" },
    { name: "Slack", detail: "Order alerts", status: "Connected" },
    { name: "Google", detail: "Calendar pickup", status: "Pending" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p className="font-medium text-muted-foreground text-sm">
            Account profile
          </p>
          <h1 className="font-semibold text-2xl tracking-tight">
            Your personal details
          </h1>
          <p className="text-muted-foreground text-sm">
            Review the information tied to your console account, update
            preferences, and manage security settings.
          </p>
        </div>
        <Badge variant="secondary">{status}</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile overview</CardTitle>
              <CardDescription>
                Keep your public-facing details accurate and current.
              </CardDescription>
              <CardAction>
                <Button size="sm" variant="outline">
                  Edit profile
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="relative">
                <Avatar className="size-16">
                  <AvatarImage alt={name} src={avatar} />
                  <AvatarFallback className="text-lg">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute -right-1 -bottom-1 rounded-full border bg-background p-1 text-muted-foreground">
                  <Sparkles className="size-3" />
                </span>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="font-semibold text-lg">{name}</p>
                  <p className="text-muted-foreground text-sm">{email}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Profile verified</Badge>
                  <Badge variant="secondary">Primary admin</Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between border-t">
              <p className="text-muted-foreground text-sm">
                {isProfileLoading
                  ? "Syncing profile..."
                  : "Last updated 3 days ago."}
              </p>
              <Button size="sm">Save changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personal information</CardTitle>
              <CardDescription>
                This information appears on invoices and team records.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="profile-name">Full name</Label>
                <Input defaultValue={name} id="profile-name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-email">Email address</Label>
                <Input defaultValue={email} id="profile-email" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-role">Role</Label>
                <Input defaultValue="Operations lead" id="profile-role" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-phone">Phone</Label>
                <Input defaultValue="+1 (415) 555-0199" id="profile-phone" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="profile-bio">Short bio</Label>
                <Textarea
                  defaultValue="Focused on making kitchen-to-customer experiences feel effortless."
                  id="profile-bio"
                  rows={4}
                />
              </div>
            </CardContent>
            <CardFooter className="justify-between border-t">
              <p className="text-muted-foreground text-sm">
                Data is visible to organization admins only.
              </p>
              <Button size="sm" variant="outline">
                Update details
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Tailor your daily experience in the console.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border p-4">
                <p className="font-medium text-sm">Workspace language</p>
                <p className="text-muted-foreground text-sm">English (US)</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="font-medium text-sm">Timezone</p>
                <p className="text-muted-foreground text-sm">
                  GMT-08:00 Pacific Time
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="font-medium text-sm">Digest schedule</p>
                <p className="text-muted-foreground text-sm">
                  Mondays at 9:00 AM
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="font-medium text-sm">Theme</p>
                <p className="text-muted-foreground text-sm">Light, sunrise</p>
              </div>
            </CardContent>
            <CardFooter className="justify-between border-t">
              <p className="text-muted-foreground text-sm">
                Preferences sync across all devices.
              </p>
              <Button size="sm" variant="outline">
                Customize
              </Button>
            </CardFooter>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account snapshot</CardTitle>
              <CardDescription>
                Overview of your access and activity.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.map((item, index) => (
                <div className="space-y-2" key={item.label}>
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground text-sm">
                      {item.label}
                    </p>
                    <p className="font-medium text-sm">{item.value}</p>
                  </div>
                  {index < stats.length - 1 ? <Separator /> : null}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Keep your account protected and monitored.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {securityItems.map((item, index) => (
                <div className="space-y-3" key={item.title}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="size-4 text-muted-foreground" />
                        <p className="font-medium text-sm">{item.title}</p>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="outline">{item.status}</Badge>
                      <Button size="sm" variant="outline">
                        {item.action}
                      </Button>
                    </div>
                  </div>
                  {index < securityItems.length - 1 ? <Separator /> : null}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connected apps</CardTitle>
              <CardDescription>
                Services authorized to access your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {connectedApps.map((app) => (
                <div
                  className="flex items-center justify-between rounded-lg border p-3"
                  key={app.name}
                >
                  <div>
                    <p className="font-medium text-sm">{app.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {app.detail}
                    </p>
                  </div>
                  <Badge
                    variant={
                      app.status === "Connected" ? "secondary" : "outline"
                    }
                  >
                    {app.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
            <CardFooter className="border-t">
              <Button className="w-full" size="sm" variant="outline">
                Manage connections
              </Button>
            </CardFooter>
          </Card>
        </aside>
      </div>
    </div>
  );
}
