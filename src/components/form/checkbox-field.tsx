import { useStore } from "@tanstack/react-form";
import type { Checkbox as CheckboxPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useFieldContext } from "./use-form";

interface CheckboxProps extends ComponentProps<typeof CheckboxPrimitive.Root> {
  label: string;
}

export default function CheckboxField({ label, ...props }: CheckboxProps) {
  const field = useFieldContext<unknown>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const isChecked =
    field.state.value === true || String(field.state.value) === "true";

  return (
    <Field data-invalid={isInvalid} orientation="horizontal">
      <Checkbox
        aria-invalid={isInvalid}
        checked={isChecked}
        id={field.name}
        name={field.name}
        onBlur={field.handleBlur}
        onCheckedChange={(checked) => field.handleChange(checked === true)}
        {...props}
      />
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      {isInvalid && <FieldError className="text-xs" errors={errors} />}
    </Field>
  );
}
