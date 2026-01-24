import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { SubmitEvent } from "react";
import { useAppForm } from "@/components/form/use-form";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldSeparator } from "@/components/ui/field";
import {
  twoFactorSchema,
  type VerifyMethod,
} from "@/features/auth/model/two-factor";
import type { RedirectSearch } from "@/libraries/types/redirect";
import { safeRedirectConsole } from "@/libraries/utils/redirect";
import { useTwoFactorAppMutation } from "../hooks/use-two-factor";
import { FormLayout } from "./form-layout";

interface TextCopy {
  title: string;
  label: string;
  placeholder: string;
  description: string;
  nextText: string;
  nextTitle: string;
  nextTo: string;
}

const textCopyBasedMethod: Record<VerifyMethod, TextCopy> = {
  TOTP: {
    title: "Authenticator app",
    label: "Verification code",
    placeholder: "Enter verification code",
    description:
      "Enter the code from your two-factor authentication app or browser extension below.",
    nextText: "Can't access your app?",
    nextTitle: "Use a recovery code",
    nextTo: "/two-factor/recovery",
  },
  BackupCode: {
    title: "Recovery code",
    label: "Recovery code",
    placeholder: "Enter recovery code",
    description:
      "Use one of your recovery codes to confirm it's you. Each code can be used only once.",
    nextText: "Have your authenticator app?",
    nextTitle: "Use an app",
    nextTo: "/two-factor/app",
  },
};

export const TwoFactorForm = ({ method }: { method: VerifyMethod }) => {
  const { mutateAsync } = useTwoFactorAppMutation();
  const form = useAppForm({
    defaultValues: {
      code: "",
      method,
    },
    validators: { onSubmit: twoFactorSchema },
    onSubmit: async ({ value }) => await mutateAsync({ data: value }),
  });
  const redirect = useRouterState({
    select: (s) => (s.location.search as RedirectSearch).redirect,
  });
  const redirectTo = safeRedirectConsole(redirect);

  const onSubmitDefault = (e: SubmitEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  const textCopy = textCopyBasedMethod[method];

  return (
    <form className="flex flex-col gap-6" noValidate onSubmit={onSubmitDefault}>
      <FormLayout description={textCopy.description} title={textCopy.title}>
        <form.AppField name="code">
          {(field) => (
            <field.TextField
              autoComplete="one-time-code"
              inputMode={method === "TOTP" ? "numeric" : undefined}
              label={textCopy.label}
              placeholder={textCopy.placeholder}
            />
          )}
        </form.AppField>

        <form.AppForm>
          <form.SubmitField idleText="Verify" pendingText="Verifying..." />
        </form.AppForm>

        <Field>
          <FieldDescription className="text-center">
            <span>{textCopy.nextText} </span>
            <Link search={{ redirect: redirectTo }} to={textCopy.nextTo}>
              {textCopy.nextTitle}
            </Link>
          </FieldDescription>
        </Field>

        <FieldSeparator>OR</FieldSeparator>

        <Field>
          <Button asChild type="button" variant="outline">
            <Link search={{ redirect: redirectTo }} to="/login">
              <ArrowLeft />
              Back to login
            </Link>
          </Button>
        </Field>
      </FormLayout>
    </form>
  );
};
