import { createFileRoute } from "@tanstack/react-router";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import { seo } from "@/libraries/utils/seo";

export const Route = createFileRoute("/_auth/reset-password")({
  head: () => ({
    meta: seo({
      path: "/reset-password",
      title: "Reset password",
      description: "Request a reset code and create a new password.",
    }),
  }),
  component: () => <ResetPasswordForm />,
});
