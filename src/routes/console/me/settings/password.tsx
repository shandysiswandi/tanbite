import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageBase } from "@/features/console/components/page-base";
import { useSettingPassword } from "@/features/console/hooks/use-setting-password";
import { seo } from "@/libraries/utils/seo";

export const Route = createFileRoute("/console/me/settings/password")({
  head: () => ({
    meta: seo({
      path: "/console/me/settings/password",
      title: "Password settings",
      description:
        "Keep your account protected by using a unique and strong password.",
    }),
  }),
  component: () => {
    const { form, isPending, onSubmitDefault } = useSettingPassword();

    return (
      <PageBase
        subtitle="Keep your account protected by using a unique and strong password."
        title="Password settings"
      >
        <Card>
          <CardHeader>
            <CardTitle>Update password</CardTitle>
            <CardDescription>
              New password must be different from your previous password.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form className="space-y-5" onSubmit={onSubmitDefault}>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div className="sm:col-span-2 lg:col-span-1">
                  <form.AppField name="currentPassword">
                    {(field) => (
                      <field.PasswordField
                        autoComplete="current-password"
                        description="You must provide your current password in order to change it."
                        label="Current password"
                      />
                    )}
                  </form.AppField>
                </div>

                <form.AppField name="newPassword">
                  {(field) => (
                    <field.PasswordField
                      autoComplete="new-password"
                      description="Password should be at least 8 characters including a number and a lowercase letter."
                      label="New password"
                    />
                  )}
                </form.AppField>

                <form.AppField name="confirmPassword">
                  {(field) => (
                    <field.PasswordField
                      autoComplete="new-password"
                      label="Confirm new password"
                    />
                  )}
                </form.AppField>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2">
                <Button disabled={isPending} type="submit">
                  {isPending ? "Saving password..." : "Save new password"}
                </Button>

                <Button asChild variant="outline">
                  <Link
                    search={{ token: undefined }}
                    to="/reset-password"
                    viewTransition
                  >
                    Forgot your password?
                  </Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </PageBase>
    );
  },
});
