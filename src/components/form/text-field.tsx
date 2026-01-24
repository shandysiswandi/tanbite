import { useStore } from "@tanstack/react-form";
import type { ComponentProps } from "react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFieldContext } from "./use-form";

interface TextFieldProps extends ComponentProps<"input"> {
  label: string;
  description?: string;
}

export default function TextField({
  label,
  placeholder,
  autoComplete,
  description,
  ...props
}: TextFieldProps) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        aria-invalid={isInvalid}
        autoComplete={autoComplete}
        id={field.name}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder}
        value={field.state.value}
        {...props}
      />
      {isInvalid && <FieldError className="text-xs" errors={errors} />}
      {description && (
        <FieldDescription className="text-xs">{description}</FieldDescription>
      )}
    </Field>
  );
}
