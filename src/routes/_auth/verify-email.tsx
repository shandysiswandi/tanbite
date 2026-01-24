import {
  createFileRoute,
  Link,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FormLayout } from "@/features/auth/components/form-layout";
import { useResendVerification } from "@/features/auth/hooks/use-resend-verification";
import { useVerifyEmail } from "@/features/auth/hooks/use-verify-email";
import { m } from "@/libraries/paraglide/messages";
import { seo } from "@/libraries/utils/seo";

const TOKEN_LENGTH = 64;
export const Route = createFileRoute("/_auth/verify-email")({
  validateSearch: (search: Record<string, unknown>) => ({
    token: typeof search.token === "string" ? search.token : "",
  }),
  beforeLoad: ({ search }) => {
    if (!search.token || search.token.length !== TOKEN_LENGTH) {
      throw redirect({
        to: "/register",
        replace: true,
        viewTransition: true,
      });
    }
  },
  head: () => ({
    meta: seo({
      path: "/verify-email",
      title: "Verification account",
      description: "Verify your account to complete registration.",
    }),
  }),
  component: () => {
    const { token } = Route.useSearch();
    const { form, isError, onSubmitDefault } = useVerifyEmail({ token });

    if (isError) {
      return <ResendVerificationContent />;
    }

    return (
      <FormLayout
        onSubmit={onSubmitDefault}
        subtitle={m["verify_email.subtitle"]()}
        title={m["verify_email.title"]()}
      >
        <form.AppField name="challengeToken">
          {(field) => (
            <field.TextField
              autoComplete="off"
              disabled
              label={m["verify_email.token_label"]()}
              readOnly
            />
          )}
        </form.AppField>
        <form.AppForm>
          <form.SubmitField
            idleText={m["verify_email.submit_idle"]()}
            pendingText={m["verify_email.submit_pending"]()}
          >
            <FieldDescription className="text-xs">
              <span>{m["auth.terms_prefix"]()} </span>
              <Link to="/terms" viewTransition>
                Terms of Service
              </Link>
              <span> {m["auth.terms_and"]()} </span>
              <Link to="/privacy" viewTransition>
                Privacy Policy
              </Link>
              <span>{m["auth.terms_suffix"]()}</span>
            </FieldDescription>
          </form.SubmitField>
        </form.AppForm>
      </FormLayout>
    );
  },
});

const ResendVerificationContent = () => {
  const router = useRouter();
  const { mutateAsync, isPending, isSuccess } = useResendVerification();
  const [resendEmail, setResendEmail] = useState("");

  const onResendVerification = async () => {
    await mutateAsync({ data: { email: resendEmail.trim() } });
  };

  useEffect(() => {
    if (isSuccess) {
      router.navigate({ to: "/login", replace: true, viewTransition: true });
    }
  }, [isSuccess, router]);

  return (
    <FormLayout
      subtitle={m["verify_email.resend_subtitle"]()}
      title={m["verify_email.resend_title"]()}
    >
      <Field>
        <FieldLabel htmlFor="resend-email">
          {m["verify_email.resend_email_label"]()}
        </FieldLabel>
        <Input
          autoComplete="email"
          id="resend-email"
          onChange={(event) => setResendEmail(event.target.value)}
          placeholder={m["verify_email.resend_email_placeholder"]()}
          type="email"
          value={resendEmail}
        />
        <Button
          disabled={isPending || !resendEmail.trim()}
          onClick={onResendVerification}
          type="button"
        >
          {isPending
            ? m["verify_email.resend_sending"]()
            : m["verify_email.resend_button"]()}
        </Button>
        <FieldDescription className="text-xs">
          {m["verify_email.resend_description"]()}
        </FieldDescription>
      </Field>
    </FormLayout>
  );
};
