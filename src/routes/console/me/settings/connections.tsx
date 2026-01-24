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
import { Separator } from "@/components/ui/separator";
import { PageBase } from "@/features/console/components/page-base";
import { seo } from "@/libraries/utils/seo";

export const Route = createFileRoute("/console/me/settings/connections")({
  head: () => ({
    meta: seo({
      path: "/console/me/settings/connections",
      title: "Connection settings",
      description:
        "Review and manage third-party services linked to your account.",
    }),
  }),
  component: () => {
    return (
      <PageBase
        subtitle="Review and manage third-party services linked to your account."
        title="Connection settings"
      >
        <Card>
          <CardHeader>
            <CardTitle>Connected services</CardTitle>
            <CardDescription>
              Revoke access anytime to keep your account secure.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-sm">Google Workspace</p>
                <p className="text-muted-foreground text-xs">
                  Used for single sign-on and calendar sync.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge>Connected</Badge>
                <Button size="sm" type="button" variant="outline">
                  Manage
                </Button>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-sm">Slack</p>
                <p className="text-muted-foreground text-xs">
                  Receive workspace alerts directly in your Slack channels.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Not connected</Badge>
                <Button size="sm" type="button">
                  Connect
                </Button>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-sm">GitHub</p>
                <p className="text-muted-foreground text-xs">
                  Link repositories to trigger deployment workflows.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge>Connected</Badge>
                <Button size="sm" type="button" variant="outline">
                  Disconnect
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </PageBase>
    );
  },
});
