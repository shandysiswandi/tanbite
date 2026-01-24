import { Link } from "@tanstack/react-router";
import type { SubmitEvent } from "react";
import { useAppForm } from "@/components/form/use-form";
import { Google } from "@/components/logos/google";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldSeparator } from "@/components/ui/field";
import { loginSchema } from "@/features/auth/model/login";
import { m } from "@/libraries/paraglide/messages";
import { useLogin } from "../hooks/use-login";
import { FormLayout } from "./form-layout";

export const LoginForm = () => {
  const { mutateAsync } = useLogin();
  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: { onSubmit: loginSchema },
    onSubmit: async ({ value }) => await mutateAsync({ data: value }),
  });

  const onSubmitDefault = (e: SubmitEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <form className="flex flex-col gap-6" noValidate onSubmit={onSubmitDefault}>
      <FormLayout
        description={m["login.description"]()}
        title={m["login.form_title"]()}
      >
        <form.AppField name="email">
          {(field) => (
            <field.TextField
              autoComplete="email"
              label={m["login.email_label"]()}
              placeholder="m@example.com"
            />
          )}
        </form.AppField>
        <form.AppField name="password">
          {(field) => (
            <field.PasswordField
              autoComplete="current-password"
              forgotLabel={m["login.forgot_password"]()}
              forgotLink="/reset-password"
              label={m["login.password_label"]()}
            />
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
            <Link to="/register">{m["login.create_account"]()}</Link>
          </FieldDescription>
        </Field>
      </FormLayout>
    </form>
  );
};
