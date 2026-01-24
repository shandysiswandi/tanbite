import { Link, useRouter } from "@tanstack/react-router";
import type { SubmitEvent } from "react";
import { useEffect, useState } from "react";
import { useAppForm } from "@/components/form/use-form";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { verifyEmailSchema } from "@/features/auth/model/verify-email";
import { useResendVerification } from "../hooks/use-resend-verification";
import { useVerifyEmail } from "../hooks/use-verify-email";
import { FormLayout } from "./form-layout";

export const VerifyEmailForm = ({ token }: { token: string }) => {
  const { mutateAsync, isError } = useVerifyEmail();
  const form = useAppForm({
    defaultValues: {
      challengeToken: token,
    },
    validators: { onSubmit: verifyEmailSchema },
    onSubmit: async ({ value }) => await mutateAsync({ data: value }),
  });

  const onSubmitDefault = (e: SubmitEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  if (isError) {
    return <ResendVerification />;
  }

  return (
    <form className="flex flex-col gap-6" noValidate onSubmit={onSubmitDefault}>
      <FormLayout
        description="We just need to confirm it's you. Click Verify Email to proceed safely."
        title="Verify your email"
      >
        <form.AppField name="challengeToken">
          {(field) => (
            <field.TextField
              autoComplete="off"
              disabled
              label="Token"
              readOnly
            />
          )}
        </form.AppField>
        <form.AppForm>
          <form.SubmitField
            idleText="Verify email"
            pendingText="Verifying..."
          />

          <FieldDescription className="text-justify text-xs">
            <span>By creating an account, you agree to the </span>
            <Link to="/terms">Terms of Service</Link>
            <span> and the </span>
            <Link to="/privacy">Privacy Policy</Link>
            <span>. We&apos;ll occasionally send account-related emails.</span>
          </FieldDescription>
        </form.AppForm>
      </FormLayout>
    </form>
  );
};

function ResendVerification() {
  const router = useRouter();
  const { mutateAsync, isPending, isSuccess } = useResendVerification();
  const [resendEmail, setResendEmail] = useState("");

  const onResendVerification = async () => {
    await mutateAsync({ data: { email: resendEmail.trim() } });
  };

  useEffect(() => {
    if (isSuccess) {
      router.navigate({ to: "/login", replace: true });
    }
  }, [isSuccess, router]);

  return (
    <form className="flex flex-col gap-6" noValidate>
      <FormLayout
        description="If the token expired or is invalid, request a fresh verification link."
        title="Resend verification"
      >
        <Field>
          <FieldLabel htmlFor="resend-email">Email</FieldLabel>
          <Input
            autoComplete="email"
            id="resend-email"
            onChange={(event) => setResendEmail(event.target.value)}
            placeholder="m@example.com"
            type="email"
            value={resendEmail}
          />
          <Button
            disabled={isPending || !resendEmail.trim()}
            onClick={onResendVerification}
            type="button"
          >
            {isPending ? "Sending..." : "Resend verification email"}
          </Button>
          <FieldDescription className="text-xs">
            We&apos;ll send a new verification link to your email address.
          </FieldDescription>
        </Field>
      </FormLayout>
    </form>
  );
}
