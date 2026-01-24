import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription } from "@/components/ui/field";
import { FormLayout } from "@/features/auth/components/form-layout";
import { useForgotPassword } from "@/features/auth/hooks/use-forgot-password";
import { useResetPassword } from "@/features/auth/hooks/use-reset-password";
import { m } from "@/libraries/paraglide/messages";
import { seo } from "@/libraries/utils/seo";

const TOKEN_LENGTH = 64;
export const Route = createFileRoute("/_auth/reset-password")({
  validateSearch: (search: Record<string, unknown>) => ({
    token:
      typeof search.token === "string" && search.token.length === TOKEN_LENGTH
        ? search.token
        : undefined,
  }),
  head: () => ({
    meta: seo({
      path: "/reset-password",
      title: "Reset password",
      description: "Request a reset code and create a new password.",
    }),
  }),
  component: () => {
    const { token } = Route.useSearch();
    if (token) {
      return <ResetPasswordWithToken token={token} />;
    }

    return <ForgotPasswordContent />;
  },
});

const ResetPasswordWithToken = ({ token }: { token: string }) => {
  const { form, onSubmitDefault } = useResetPassword({ token });

  return (
    <FormLayout
      onSubmit={onSubmitDefault}
      subtitle={m["reset_password.reset_subtitle"]()}
      title={m["reset_password.reset_title"]()}
    >
      <form.AppField name="password">
        {(field) => (
          <field.PasswordField
            autoComplete="new-password"
            label={m["reset_password.new_password_label"]()}
          />
        )}
      </form.AppField>
      <form.AppField name="confirmPassword">
        {(field) => (
          <field.PasswordField
            autoComplete="new-password"
            label={m["reset_password.confirm_password_label"]()}
          />
        )}
      </form.AppField>

      <form.AppForm>
        <form.SubmitField
          idleText={m["reset_password.reset_submit_idle"]()}
          pendingText={m["reset_password.reset_submit_pending"]()}
        />
      </form.AppForm>
      <Field>
        <FieldDescription className="text-center">
          <span>{m["reset_password.remembered_prompt"]()} </span>
          <Link replace to="/login" viewTransition>
            {m["reset_password.sign_in"]()}
          </Link>
        </FieldDescription>
      </Field>
    </FormLayout>
  );
};

const ForgotPasswordContent = () => {
  const { form, onSubmitDefault, state, email, errorMessage, onResetState } =
    useForgotPassword();

  if (state === "success") {
    return (
      <FormLayout
        subtitle={m["reset_password.success_subtitle"]()}
        title={m["reset_password.success_title"]()}
      >
        <Field>
          <FieldDescription className="text-center">
            <span>{m["reset_password.success_prefix"]()} </span>
            <span className="font-medium text-foreground">{email}</span>
            <span>{m["reset_password.success_suffix"]()}</span>
          </FieldDescription>
        </Field>
        <Field>
          <Button asChild>
            <Link to="/login" viewTransition>
              {m["reset_password.back_to_sign_in"]()}
            </Link>
          </Button>
        </Field>
      </FormLayout>
    );
  }

  if (state === "error") {
    return (
      <FormLayout
        subtitle={m["reset_password.error_subtitle"]()}
        title={m["reset_password.error_title"]()}
      >
        <Field>
          <FieldDescription className="text-center">
            {errorMessage || m["reset_password.error_default_message"]()}
          </FieldDescription>
        </Field>
        <Field>
          <Button onClick={onResetState} type="button">
            {m["reset_password.try_again"]()}
          </Button>
          <FieldDescription className="text-center">
            <span>{m["reset_password.remembered_prompt"]()} </span>
            <Link to="/login" viewTransition>
              {m["reset_password.sign_in"]()}
            </Link>
          </FieldDescription>
        </Field>
      </FormLayout>
    );
  }

  return (
    <FormLayout
      onSubmit={onSubmitDefault}
      subtitle={m["reset_password.request_subtitle"]()}
      title={m["reset_password.request_title"]()}
    >
      <form.AppField name="email">
        {(field) => (
          <field.TextField
            autoComplete="email"
            label={m["reset_password.email_label"]()}
            placeholder={m["reset_password.email_placeholder"]()}
          />
        )}
      </form.AppField>
      <form.AppField name="captchaToken">
        {(field) => <field.TurnstileField />}
      </form.AppField>
      <form.AppForm>
        <form.SubmitField
          idleText={m["reset_password.request_submit_idle"]()}
          pendingText={m["reset_password.request_submit_pending"]()}
        />
      </form.AppForm>
      <Field>
        <FieldDescription className="text-center">
          <span>{m["reset_password.remembered_prompt"]()} </span>
          <Link replace to="/login" viewTransition>
            {m["reset_password.sign_in"]()}
          </Link>
        </FieldDescription>
      </Field>
    </FormLayout>
  );
};
