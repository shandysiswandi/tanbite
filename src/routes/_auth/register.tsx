import { useStore } from "@tanstack/react-form";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Google } from "@/components/logos/google";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldSeparator } from "@/components/ui/field";
import { FormLayout } from "@/features/auth/components/form-layout";
import { useRegister } from "@/features/auth/hooks/use-register";
import { useResendVerification } from "@/features/auth/hooks/use-resend-verification";
import type { RegisterState } from "@/features/auth/model/register";
import { m } from "@/libraries/paraglide/messages";
import { formatCountdown } from "@/libraries/utils/format";
import { seo } from "@/libraries/utils/seo";

export const Route = createFileRoute("/_auth/register")({
  head: () => ({
    meta: seo({
      path: "/register",
      title: m["register.title"](),
      description: m["register.description"](),
    }),
  }),
  component: () => {
    const { form, state, onSubmitDefault, onResetForm } = useRegister();
    const emailValue = useStore(form.store, (state) => state.values.email);

    if (state !== "idle") {
      return (
        <StatusCard
          email={emailValue}
          onResetForm={onResetForm}
          state={state}
        />
      );
    }

    return (
      <FormLayout
        onSubmit={onSubmitDefault}
        subtitle={m["register.description"]()}
        title={m["register.form_title"]()}
      >
        <form.AppField name="name">
          {(field) => (
            <field.TextField
              autoComplete="name"
              label={m["register.name_label"]()}
              placeholder={m["register.name_placeholder"]()}
            />
          )}
        </form.AppField>
        <form.AppField name="email">
          {(field) => (
            <field.TextField
              autoComplete="email"
              description={m["register.email_description"]()}
              label={m["register.email_label"]()}
              placeholder={m["register.email_placeholder"]()}
            />
          )}
        </form.AppField>
        <form.AppField name="password">
          {(field) => (
            <field.PasswordField
              autoComplete="new-password"
              description={m["register.password_description"]()}
              label={m["register.password_label"]()}
            />
          )}
        </form.AppField>
        <form.AppField name="captchaToken">
          {(field) => <field.TurnstileField />}
        </form.AppField>
        <form.AppForm>
          <form.SubmitField
            idleText={m["register.submit_idle"]()}
            pendingText={m["register.submit_pending"]()}
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

        <FieldSeparator>{m["register.separator"]()}</FieldSeparator>
        <Field>
          <Button type="button" variant="outline">
            <Google />
            {m["register.google_button"]()}
          </Button>

          <FieldDescription className="text-center">
            <span>{m["register.has_account"]()} </span>
            <Link replace to="/login" viewTransition>
              {m["register.sign_in"]()}
            </Link>
          </FieldDescription>
        </Field>
      </FormLayout>
    );
  },
});

const getStatusContent = () =>
  ({
    new_account: {
      title: m["register.status_new_title"](),
      description: m["register.status_new_description"](),
    },
    exists_account: {
      title: m["register.status_exists_title"](),
      description: m["register.status_exists_description"](),
      action: { label: m["register.status_exists_action"](), to: "/login" },
    },
    block_account: {
      title: m["register.status_block_title"](),
      description: m["register.status_block_description"](),
      action: { label: m["register.status_block_action"](), to: "/contact" },
    },
  }) as const;

type StatusContent = ReturnType<typeof getStatusContent>;
type StatusKey = keyof StatusContent;

const StatusCard = ({
  email,
  state,
  onResetForm,
}: {
  email: string;
  state: RegisterState;
  onResetForm: () => void;
}) => {
  const { mutateAsync, isPending } = useResendVerification();
  const resendAttemptsRef = useRef(0);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  useEffect(() => {
    if (cooldownSeconds <= 0) {
      return undefined;
    }

    const interval = setInterval(() => {
      setCooldownSeconds((seconds) => (seconds > 0 ? seconds - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldownSeconds]);

  const onResendVerification = async () => {
    await mutateAsync({ data: { email } });
    resendAttemptsRef.current += 1;
    setCooldownSeconds(60 * 2 ** (resendAttemptsRef.current - 1));
  };

  const content = getStatusContent()[state as StatusKey];
  if (!content) {
    return null;
  }
  const action = "action" in content ? content.action : null;

  const resendLabel = () => {
    if (cooldownSeconds > 0) {
      return `${m["register.resend_countdown_prefix"]()} ${formatCountdown(
        cooldownSeconds
      )}`;
    }

    if (isPending) {
      return m["register.resend_sending"]();
    }

    return m["register.resend_action"]();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <CardDescription>{content.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {state === "new_account" && (
          <Button
            className="w-full"
            disabled={isPending || cooldownSeconds > 0}
            onClick={onResendVerification}
            type="button"
          >
            {resendLabel()}
          </Button>
        )}
        {action && (
          <Button asChild className="w-full">
            <Link to={action.to} viewTransition>
              {action.label}
            </Link>
          </Button>
        )}
        <Button
          className="w-full"
          onClick={onResetForm}
          type="button"
          variant="outline"
        >
          {m["register.use_another_email"]()}
        </Button>
      </CardContent>
    </Card>
  );
};
