import { useStore } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
import type { SubmitEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { useAppForm } from "@/components/form/use-form";
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
import { registerSchema } from "@/features/auth/model/register";
import { m } from "@/libraries/paraglide/messages";
import { formatCountdown } from "@/libraries/utils/format";
import { useRegister } from "../hooks/use-register";
import { useResendVerification } from "../hooks/use-resend-verification";
import { FormLayout } from "./form-layout";

export const RegisterForm = () => {
  const { mutateAsync, resetState, state } = useRegister();
  const form = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      captchaToken: "",
    },
    validators: { onSubmit: registerSchema },
    onSubmit: async ({ value }) => await mutateAsync({ data: value }),
  });
  const emailValue = useStore(form.store, (state) => state.values.email);

  const onResetForm = () => {
    resetState();
    form.reset();
  };

  const onSubmitDefault = (e: SubmitEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <form className="flex flex-col gap-6" noValidate onSubmit={onSubmitDefault}>
      <FormLayout
        description={m["register.description"]()}
        title={m["register.form_title"]()}
      >
        {state === "idle" ? (
          <>
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
              />

              <FieldDescription className="text-justify text-xs">
                <span>By creating an account, you agree to the </span>
                <Link to="/terms">Terms of Service</Link>
                <span> and the </span>
                <Link to="/privacy">Privacy Policy</Link>
                <span>
                  . We&apos;ll occasionally send account-related emails.
                </span>
              </FieldDescription>
            </form.AppForm>

            <FieldSeparator>{m["register.separator"]()}</FieldSeparator>

            <Field>
              <Button type="button" variant="outline">
                <Google />
                {m["register.google_button"]()}
              </Button>

              <FieldDescription className="text-center">
                <span>{m["register.has_account"]()} </span>
                <Link to="/login">{m["register.sign_in"]()}</Link>
              </FieldDescription>
            </Field>
          </>
        ) : (
          <StatusCard
            email={emailValue}
            onResetForm={onResetForm}
            state={state}
          />
        )}
      </FormLayout>
    </form>
  );
};

const statusContent = {
  new_account: {
    title: "Account created",
    description:
      "Check your inbox to verify your email and finish setting up your account.",
  },
  exists_account: {
    title: "Account already exists",
    description: "Sign in to continue with this email address.",
    action: { label: "Go to login", to: "/login" },
  },
  block_account: {
    title: "Registration blocked",
    description:
      "We can't create an account with this email. Contact support if you think this is a mistake.",
    action: { label: "Contact support", to: "/contact" },
  },
} as const;

type StatusContent = typeof statusContent;
type StatusKey = keyof StatusContent;

const StatusCard = ({
  email,
  state,
  onResetForm,
}: {
  email: string;
  state: ReturnType<typeof useRegister>["state"];
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

  const content = statusContent[state as StatusKey];
  if (!content) {
    return null;
  }
  const action = "action" in content ? content.action : null;

  const resendLabel = () => {
    if (cooldownSeconds > 0) {
      return `Resend email in ${formatCountdown(cooldownSeconds)}`;
    }

    if (isPending) {
      return "Sending...";
    }

    return "Resend verification email";
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
            <Link to={action.to}>{action.label}</Link>
          </Button>
        )}
        <Button
          className="w-full"
          onClick={onResetForm}
          type="button"
          variant="outline"
        >
          Use another email
        </Button>
      </CardContent>
    </Card>
  );
};
