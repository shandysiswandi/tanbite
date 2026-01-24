import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldSeparator } from "@/components/ui/field";
import type { VerifyMethod } from "@/features/auth/model/two-factor";
import { m } from "@/libraries/paraglide/messages";
import { useTwoFactor } from "../hooks/use-two-factor";
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

const getTextCopyBasedMethod = (): Record<VerifyMethod, TextCopy> =>
  ({
    TOTP: {
      title: m["two_factor.totp_title"](),
      label: m["two_factor.totp_label"](),
      placeholder: m["two_factor.totp_placeholder"](),
      description: m["two_factor.totp_description"](),
      nextText: m["two_factor.totp_next_text"](),
      nextTitle: m["two_factor.totp_next_title"](),
      nextTo: "/two-factor/recovery",
    },
    BackupCode: {
      title: m["two_factor.backup_title"](),
      label: m["two_factor.backup_label"](),
      placeholder: m["two_factor.backup_placeholder"](),
      description: m["two_factor.backup_description"](),
      nextText: m["two_factor.backup_next_text"](),
      nextTitle: m["two_factor.backup_next_title"](),
      nextTo: "/two-factor/app",
    },
  }) as const;

export const TwoFactorForm = ({ method }: { method: VerifyMethod }) => {
  const { form, redirectTo, onSubmitDefault } = useTwoFactor({ method });
  const textCopy = getTextCopyBasedMethod()[method];

  return (
    <FormLayout
      onSubmit={onSubmitDefault}
      subtitle={textCopy.description}
      title={textCopy.title}
    >
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
        <form.SubmitField
          idleText={m["two_factor.submit_idle"]()}
          pendingText={m["two_factor.submit_pending"]()}
        />
      </form.AppForm>
      <Field>
        <FieldDescription className="text-center">
          <span>{textCopy.nextText} </span>
          <Link
            search={{ redirect: redirectTo }}
            to={textCopy.nextTo}
            viewTransition
          >
            {textCopy.nextTitle}
          </Link>
        </FieldDescription>
      </Field>
      <FieldSeparator>{m["auth.or_separator"]()}</FieldSeparator>
      <Field>
        <Button asChild type="button" variant="outline">
          <Link
            replace
            search={{ redirect: redirectTo }}
            to="/login"
            viewTransition
          >
            <ArrowLeft />
            {m["two_factor.back_to_login"]()}
          </Link>
        </Button>
      </Field>
    </FormLayout>
  );
};
