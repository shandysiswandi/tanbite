import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { MultiSelect } from "@/components/multi-select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageBase } from "@/features/console/components/page-base";
import { requirePermission } from "@/features/console/libraries/permission";
import { ACTIONS, PERMISSIONS } from "@/libraries/constants/permission";
import { seo } from "@/libraries/utils/seo";

export const Route = createFileRoute("/console/managements/users/create")({
  head: () => ({
    meta: seo({
      path: "/console/managements/users/create",
      title: "Create user",
      description: "Add a new workspace user and assign role access.",
    }),
  }),
  loader: async ({ context, location }) => {
    await requirePermission({
      queryClient: context.queryClient,
      permission: PERMISSIONS.management.users,
      action: ACTIONS.create,
      locationHref: location.href,
    });
  },
  component: () => {
    const router = useRouter();
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    return (
      <PageBase
        subtitle="Create a new workspace account, set role access, and send an invite."
        title="Create user"
      >
        <Card>
          <CardContent>
            <form
              className="grid gap-5 md:grid-cols-2"
              id="create-user-form"
              onSubmit={(event) => event.preventDefault()}
            >
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input id="name" placeholder="Jane Doe" type="text" />
              </Field>

              <Field>
                <FieldLabel htmlFor="email-address">Email address</FieldLabel>
                <Input
                  id="email-address"
                  placeholder="jane.doe@company.com"
                  type="email"
                />
                <FieldDescription className="text-xs">
                  The user will use this email to sign in and receive invites.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="roles">Roles</FieldLabel>
                <MultiSelect
                  id="roles"
                  name="roles"
                  onValueChange={setSelectedRoles}
                  options={[
                    { label: "Owner", value: "owner" },
                    { label: "Admin", value: "admin" },
                    { label: "Member", value: "member" },
                    { label: "Viewer", value: "viewer" },
                  ]}
                  placeholder="Select roles"
                  searchPlaceholder="Search roles..."
                  value={selectedRoles}
                />
                <FieldDescription className="text-xs">
                  Assign one or more roles for this user.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="status">Account status</FieldLabel>
                <Select name="status">
                  <SelectTrigger className="w-full" id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">
                        Pending activation
                      </SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
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

            <div className="flex items-center gap-2">
              <Button form="create-user-form" type="reset" variant="outline">
                Reset
              </Button>
              <Button form="create-user-form" type="submit">
                Create user
              </Button>
            </div>
          </CardFooter>
        </Card>
      </PageBase>
    );
  },
});
