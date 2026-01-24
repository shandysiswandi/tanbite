import { useStore } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Mail } from "lucide-react";
import type { SubmitEvent } from "react";
import { toast } from "sonner";
import { useAppForm } from "@/components/form/use-form";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldSeparator } from "@/components/ui/field";
import { resetPasswordSchema } from "@/features/auth/model/reset-password";
import { useForgotPassword } from "../hooks/use-forgot-password";
import { useResetPassword } from "../hooks/use-reset-password";
import { FormLayout } from "./form-layout";

export const ResetPasswordForm = () => {
  const { mutateAsync } = useResetPassword();
  const { mutateAsync: forgotAsync, isPending: isSending } =
    useForgotPassword();
  const form = useAppForm({
    defaultValues: {
      email: "",
      code: "",
      password: "",
      confirmPassword: "",
    },
    validators: { onSubmit: resetPasswordSchema },
    onSubmit: async ({ value }) => await mutateAsync({ data: value }),
  });

  const emailValue = useStore(form.store, (state) => state.values.email);

  const onSubmitDefault = (e: SubmitEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  const onSendReset = async () => {
    if (!emailValue) {
      toast.error("Enter your email to request a reset code.");
      return;
    }

    await forgotAsync({ data: { email: emailValue } });
  };

  return (
    <form className="flex flex-col gap-6" noValidate onSubmit={onSubmitDefault}>
      <FormLayout
        description="Request a reset code and create a new password for your account."
        title="Reset password"
      >
        <form.AppField name="email">
          {(field) => (
            <field.TextField
              autoComplete="email"
              label="Email"
              placeholder="m@example.com"
            />
          )}
        </form.AppField>

        <form.AppField name="code">
          {(field) => (
            <field.TextField
              autoComplete="one-time-code"
              inputMode="numeric"
              label="Reset code"
              placeholder="123456"
            />
          )}
        </form.AppField>

        <form.AppField name="password">
          {(field) => (
            <field.PasswordField
              autoComplete="new-password"
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

        <form.AppForm>
          <form.SubmitField idleText="Reset password" pendingText="Saving..." />
        </form.AppForm>

        <Field>
          <Button
            disabled={isSending}
            onClick={onSendReset}
            type="button"
            variant="secondary"
          >
            <Mail />
            {isSending ? "Sending..." : "Send reset code"}
          </Button>
          <FieldDescription className="text-center">
            We&apos;ll email you a reset code to continue.
          </FieldDescription>
        </Field>

        <FieldSeparator>OR</FieldSeparator>

        <Field>
          <Button asChild type="button" variant="outline">
            <Link to="/login">
              <ArrowLeft />
              Back to login
            </Link>
          </Button>
        </Field>
      </FormLayout>
    </form>
  );
};
