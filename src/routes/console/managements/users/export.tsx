import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageBase } from "@/features/console/components/page-base";
import { requirePermission } from "@/features/console/libraries/permission";
import { ACTIONS, PERMISSIONS } from "@/libraries/constants/permission";
import { seo } from "@/libraries/utils/seo";

export const Route = createFileRoute("/console/managements/users/export")({
  head: () => ({
    meta: seo({
      path: "/console/managements/users/export",
      title: "Export users",
      description:
        "Download workspace users with selected fields in CSV format.",
    }),
  }),
  loader: async ({ context, location }) => {
    await requirePermission({
      queryClient: context.queryClient,
      permission: PERMISSIONS.management.users,
      action: ACTIONS.export,
      locationHref: location.href,
    });
  },
  component: () => {
    const router = useRouter();

    return (
      <PageBase
        subtitle="Download a users report for audits, backups, or offline review."
        title="Export users"
      >
        <Card>
          <CardContent>
            <form
              className="space-y-6"
              id="export-users-form"
              onSubmit={(event) => event.preventDefault()}
            >
              <Field>
                <FieldLabel htmlFor="file-format">File format</FieldLabel>
                <Select defaultValue="csv" name="file-format">
                  <SelectTrigger
                    className="w-full sm:max-w-xs"
                    id="file-format"
                  >
                    <SelectValue placeholder="Select file format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="xlsx">XLSX</SelectItem>
                  </SelectContent>
                </Select>
                <FieldDescription className="text-xs">
                  Choose the file type you want to download.
                </FieldDescription>
              </Field>

              <FieldSet>
                <FieldLegend variant="label">Field columns</FieldLegend>
                <div className="flex- flex-col">
                  <Field orientation="horizontal">
                    <Checkbox
                      defaultChecked
                      id="column-full-name"
                      name="columns"
                      value="fullName"
                    />
                    <FieldLabel htmlFor="column-full-name">
                      Full name
                    </FieldLabel>
                  </Field>

                  <Field orientation="horizontal">
                    <Checkbox
                      defaultChecked
                      id="column-email-address"
                      name="columns"
                      value="emailAddress"
                    />
                    <FieldLabel htmlFor="column-email-address">
                      Email address
                    </FieldLabel>
                  </Field>

                  <Field orientation="horizontal">
                    <Checkbox
                      defaultChecked
                      id="column-role"
                      name="columns"
                      value="role"
                    />
                    <FieldLabel htmlFor="column-role">Role</FieldLabel>
                  </Field>

                  <Field orientation="horizontal">
                    <Checkbox
                      defaultChecked
                      id="column-account-status"
                      name="columns"
                      value="accountStatus"
                    />
                    <FieldLabel htmlFor="column-account-status">
                      Account status
                    </FieldLabel>
                  </Field>
                </div>
              </FieldSet>
            </form>
          </CardContent>
          <CardFooter className="w-full justify-between border-t">
            <Button
              onClick={() => router.history.back()}
              type="button"
              variant="outline"
            >
              <ArrowLeft />
              Back
            </Button>
            <Button form="export-users-form" type="submit">
              <Download />
              Export users
            </Button>
          </CardFooter>
        </Card>
      </PageBase>
    );
  },
});
