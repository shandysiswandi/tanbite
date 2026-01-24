import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { PageBase } from "@/features/console/components/page-base";
import { seo } from "@/libraries/utils/seo";

export const Route = createFileRoute("/console/me/settings/security")({
  head: () => ({
    meta: seo({
      path: "/console/me/settings/security",
      title: "Security settings",
      description: "Strengthen account access and monitor active sessions.",
    }),
  }),
  component: () => {
    return (
      <PageBase
        subtitle="Strengthen account access and monitor active sessions."
        title="Security settings"
      >
        <Card>
          <CardHeader>
            <CardTitle>Protection preferences</CardTitle>
            <CardDescription>
              Add extra checks to keep unauthorized activity out.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Field
              className="items-center justify-between rounded-lg border p-4"
              orientation="horizontal"
            >
              <div>
                <FieldLabel htmlFor="two-factor-authentication">
                  Two-factor authentication
                </FieldLabel>
                <FieldDescription>
                  Require a code from your authenticator app when signing in.
                </FieldDescription>
              </div>
              <Switch defaultChecked id="two-factor-authentication" />
            </Field>

            <Field
              className="items-center justify-between rounded-lg border p-4"
              orientation="horizontal"
            >
              <div>
                <FieldLabel htmlFor="login-alerts">Login alerts</FieldLabel>
                <FieldDescription>
                  Get notified about sign-ins from new devices or locations.
                </FieldDescription>
              </div>
              <Switch defaultChecked id="login-alerts" />
            </Field>

            <Field
              className="items-center justify-between rounded-lg border p-4"
              orientation="horizontal"
            >
              <div>
                <FieldLabel htmlFor="session-timeout">
                  Session timeout
                </FieldLabel>
                <FieldDescription>
                  Automatically sign out after inactivity.
                </FieldDescription>
              </div>
              <Switch id="session-timeout" />
            </Field>
          </CardContent>

          <CardFooter className="justify-between gap-2">
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <Badge variant="secondary">Recommended</Badge>
              Keep two-factor authentication enabled.
            </div>
            <Button type="button">Save security</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active sessions</CardTitle>
            <CardDescription>
              Review where your account is currently signed in.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-sm">
                  Current browser - Chrome on Linux
                </p>
                <p className="text-muted-foreground text-xs">
                  Bandung, Indonesia - Last active now
                </p>
              </div>
              <Badge>Current</Badge>
            </div>

            <Separator />

            <div className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-sm">Safari on iPhone</p>
                <p className="text-muted-foreground text-xs">
                  Jakarta, Indonesia - Last active 2 hours ago
                </p>
              </div>
              <Button size="sm" type="button" variant="outline">
                Sign out
              </Button>
            </div>

            <Button
              className="w-full sm:w-auto"
              type="button"
              variant="outline"
            >
              Sign out all other sessions
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recovery options</CardTitle>
            <CardDescription>
              Add a backup email to regain access if needed.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Field className="space-y-2">
              <FieldLabel htmlFor="backup-email">Backup email</FieldLabel>
              <Input
                defaultValue="security.backup@example.com"
                id="backup-email"
                type="email"
              />
              <FieldDescription>
                Used only for account recovery and urgent notices.
              </FieldDescription>
            </Field>
          </CardContent>

          <CardFooter className="justify-end">
            <Button type="button">Update recovery email</Button>
          </CardFooter>
        </Card>
      </PageBase>
    );
  },
});
