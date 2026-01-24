import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { PageBase } from "@/features/console/components/page-base";
import { requirePermission } from "@/features/console/libraries/permission";
import { PERMISSIONS } from "@/libraries/constants/permission";
import { seo } from "@/libraries/utils/seo";

export const Route = createFileRoute("/console/managements/policies")({
  head: () => ({
    meta: seo({
      path: "/console/managements/policies",
      title: "Policy management",
      description:
        "Configure governance rules and enforcement for your workspace.",
    }),
  }),
  loader: async ({ context, location }) => {
    await requirePermission({
      queryClient: context.queryClient,
      permission: PERMISSIONS.management.rbac,
      locationHref: location.href,
    });
  },
  component: () => {
    return (
      <PageBase
        subtitle="Configure governance rules and enforcement for your workspace."
        title="Policy management"
      >
        <Card>
          <CardHeader>
            <CardTitle>Access policies</CardTitle>
            <CardDescription>
              Define security requirements for all member sessions.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Field
              className="items-center justify-between rounded-lg border p-4"
              orientation="horizontal"
            >
              <div>
                <FieldLabel htmlFor="require-two-factor">
                  Require two-factor authentication
                </FieldLabel>
                <FieldDescription>
                  Enforce 2FA for every member before accessing protected areas.
                </FieldDescription>
              </div>
              <Switch defaultChecked id="require-two-factor" />
            </Field>

            <Field
              className="items-center justify-between rounded-lg border p-4"
              orientation="horizontal"
            >
              <div>
                <FieldLabel htmlFor="block-untrusted-devices">
                  Block untrusted devices
                </FieldLabel>
                <FieldDescription>
                  Require device verification for new browsers and locations.
                </FieldDescription>
              </div>
              <Switch defaultChecked id="block-untrusted-devices" />
            </Field>

            <Field
              className="items-center justify-between rounded-lg border p-4"
              orientation="horizontal"
            >
              <div>
                <FieldLabel htmlFor="strict-session-timeout">
                  Strict session timeout
                </FieldLabel>
                <FieldDescription>
                  Automatically end inactive sessions after 20 minutes.
                </FieldDescription>
              </div>
              <Switch id="strict-session-timeout" />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Role controls</CardTitle>
            <CardDescription>
              Review and adjust default permission scopes.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-sm">Workspace Admin</p>
                  <p className="text-muted-foreground text-xs">
                    Full access to users, billing, and policy configuration.
                  </p>
                </div>
                <Badge>Critical</Badge>
              </div>
            </div>

            <Separator />

            <div className="rounded-lg border p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-sm">Manager</p>
                  <p className="text-muted-foreground text-xs">
                    Manage teams and reports without billing access.
                  </p>
                </div>
                <Badge variant="secondary">Standard</Badge>
              </div>
            </div>

            <Separator />

            <div className="rounded-lg border p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-sm">Viewer</p>
                  <p className="text-muted-foreground text-xs">
                    Read-only access to dashboards and operational reports.
                  </p>
                </div>
                <Badge variant="outline">Limited</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Policy note</CardTitle>
            <CardDescription>
              Attach an internal note for your compliance team.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Field className="space-y-2">
              <FieldLabel htmlFor="policy-note">Internal note</FieldLabel>
              <Input
                defaultValue="Quarterly access review scheduled for next Monday."
                id="policy-note"
                type="text"
              />
              <FieldDescription>
                This note is visible to workspace administrators only.
              </FieldDescription>
            </Field>

            <div className="flex flex-wrap items-center justify-end gap-2">
              <Button type="button" variant="outline">
                Reset
              </Button>
              <Button type="button">Save policies</Button>
            </div>
          </CardContent>
        </Card>
      </PageBase>
    );
  },
});
