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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PageBase } from "@/features/console/components/page-base";
import { seo } from "@/libraries/utils/seo";

export const Route = createFileRoute("/console/me/settings/notifications")({
  head: () => ({
    meta: seo({
      path: "/console/me/settings/notifications",
      title: "Notification settings",
      description: "Control when and where updates are delivered.",
    }),
  }),
  component: () => {
    return (
      <PageBase
        subtitle="Control when and where updates are delivered."
        title="Notification settings"
      >
        <Card>
          <CardHeader>
            <CardTitle>Notification channels</CardTitle>
            <CardDescription>
              Enable the channels you want us to use for account activity.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Field
              className="items-center justify-between rounded-lg border p-4"
              orientation="horizontal"
            >
              <div>
                <FieldLabel htmlFor="email-notifications">
                  Email notifications
                </FieldLabel>
                <FieldDescription>
                  Product updates, billing receipts, and security alerts.
                </FieldDescription>
              </div>
              <Switch defaultChecked id="email-notifications" />
            </Field>

            <Field
              className="items-center justify-between rounded-lg border p-4"
              orientation="horizontal"
            >
              <div>
                <FieldLabel htmlFor="push-notifications">
                  Push notifications
                </FieldLabel>
                <FieldDescription>
                  Realtime updates in your browser when events happen.
                </FieldDescription>
              </div>
              <Switch defaultChecked id="push-notifications" />
            </Field>

            <Field
              className="items-center justify-between rounded-lg border p-4"
              orientation="horizontal"
            >
              <div>
                <FieldLabel htmlFor="marketing-notifications">
                  Marketing emails
                </FieldLabel>
                <FieldDescription>
                  Monthly news, feature highlights, and educational content.
                </FieldDescription>
              </div>
              <Switch id="marketing-notifications" />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delivery preferences</CardTitle>
            <CardDescription>
              Fine tune frequency to reduce noise during focused work.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-5 md:grid-cols-2">
            <Field className="space-y-2">
              <FieldLabel htmlFor="digest-frequency">
                Digest frequency
              </FieldLabel>
              <Select defaultValue="daily">
                <SelectTrigger className="w-full" id="digest-frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instant">Instant</SelectItem>
                  <SelectItem value="daily">Daily digest</SelectItem>
                  <SelectItem value="weekly">Weekly digest</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field className="space-y-2">
              <FieldLabel htmlFor="quiet-hours">Quiet hours</FieldLabel>
              <Select defaultValue="22-07">
                <SelectTrigger className="w-full" id="quiet-hours">
                  <SelectValue placeholder="Select schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Disabled</SelectItem>
                  <SelectItem value="22-07">10:00 PM - 7:00 AM</SelectItem>
                  <SelectItem value="23-08">11:00 PM - 8:00 AM</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </CardContent>

          <CardFooter className="justify-between gap-2">
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <Badge variant="secondary">Live</Badge>
              Security notifications are always sent.
            </div>
            <Button type="button">Save preferences</Button>
          </CardFooter>
        </Card>
      </PageBase>
    );
  },
});
