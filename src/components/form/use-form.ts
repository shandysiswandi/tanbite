import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { lazy } from "react";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const TextField = lazy(() => import("./text-field.tsx"));
const PasswordField = lazy(() => import("./password-field.tsx"));
const CheckboxField = lazy(() => import("./checkbox-field.tsx"));
const TurnstileField = lazy(() => import("./turnstile-field.tsx"));
const SubmitField = lazy(() => import("./submit-field.tsx"));

export const { useAppForm } = createFormHook({
  fieldComponents: { TextField, CheckboxField, PasswordField, TurnstileField },
  formComponents: { SubmitField },
  fieldContext,
  formContext,
});
