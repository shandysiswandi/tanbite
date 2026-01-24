import { createFileRoute, Link } from "@tanstack/react-router";
import { Google } from "@/components/logos/google";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldSeparator } from "@/components/ui/field";
import { FormLayout } from "@/features/auth/components/form-layout";
import { useLogin } from "@/features/auth/hooks/use-login";
import { m } from "@/libraries/paraglide/messages";
import { seo } from "@/libraries/utils/seo";

export const Route = createFileRoute("/_auth/login")({
  head: () => {
    return {
      meta: seo({
        path: "/login",
        title: m["login.title"](),
        description: m["login.description"](),
      }),
    };
  },
  component: () => {
    const { form, onSubmitDefault } = useLogin();

    return (
      <FormLayout
        onSubmit={onSubmitDefault}
        subtitle={m["login.description"]()}
        title={m["login.form_title"]()}
      >
        <form.AppField name="email">
          {(field) => (
            <field.TextField
              autoComplete="email"
              label={m["login.email_label"]()}
              placeholder={m["login.email_placeholder"]()}
            />
          )}
        </form.AppField>
        <form.AppField name="password">
          {(field) => (
            <field.PasswordField
              autoComplete="current-password"
              label={m["login.password_label"]()}
            />
          )}
        </form.AppField>

        <form.AppField name="rememberMe">
          {(field) => (
            <field.CheckboxField label={m["login.remember_me_label"]()} />
          )}
        </form.AppField>

        <form.AppForm>
          <form.SubmitField
            idleText={m["login.submit_idle"]()}
            pendingText={m["login.submit_pending"]()}
          />
        </form.AppForm>

        <FieldSeparator>{m["login.separator"]()}</FieldSeparator>

        <Field>
          <Button type="button" variant="outline">
            <Google />
            {m["login.google_button"]()}
          </Button>

          <FieldDescription className="text-center">
            <span>{m["login.no_account"]()} </span>
            <Link replace to="/register" viewTransition>
              {m["login.create_account"]()}
            </Link>
          </FieldDescription>

          <FieldDescription className="text-center">
            <span>{m["login.trouble_password"]()} </span>
            <Link
              className="text-sm"
              replace
              search={{ token: undefined }}
              to="/reset-password"
              viewTransition
            >
              {m["login.reset_password"]()}
            </Link>
          </FieldDescription>
        </Field>
      </FormLayout>
    );
  },
});
