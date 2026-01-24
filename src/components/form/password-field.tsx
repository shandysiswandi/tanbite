import { useStore } from "@tanstack/react-form";
import { Eye, EyeOff } from "lucide-react";
import { type ComponentProps, useState } from "react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useFieldContext } from "./use-form";

type PasswordFieldProps = Omit<
  ComponentProps<"input">,
  "type" | "placeholder"
> & {
  label: string;
  description?: string;
  defaultVisible?: boolean;
  groupClassName?: string;
  showLabel?: string;
  hideLabel?: string;
};

export default function PasswordField({
  label,
  description,
  className,
  defaultVisible = false,
  disabled,
  groupClassName,
  hideLabel = "Hide password",
  showLabel = "Show password",
  ...props
}: PasswordFieldProps) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  const [isVisible, setIsVisible] = useState(defaultVisible);
  const toggleLabel = isVisible ? hideLabel : showLabel;

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <InputGroup
        className={groupClassName}
        data-disabled={disabled ? true : undefined}
      >
        <InputGroupInput
          aria-invalid={isInvalid}
          className={className}
          disabled={disabled}
          id={field.name}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          placeholder="●●●●●"
          type={isVisible ? "text" : "password"}
          value={field.state.value}
          {...props}
        />

        <InputGroupAddon align="inline-end" className="pr-2">
          <InputGroupButton
            aria-pressed={isVisible}
            disabled={disabled}
            onClick={() => setIsVisible((value) => !value)}
            size="sm"
            type="button"
          >
            {isVisible ? <Eye /> : <EyeOff />}
            <span className="sr-only">{toggleLabel}</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      {isInvalid && <FieldError className="text-xs" errors={errors} />}
      {description && (
        <FieldDescription className="text-xs">{description}</FieldDescription>
      )}
    </Field>
  );
}
