import { useStore } from "@tanstack/react-form";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { useFormContext } from "./use-form";

interface SubmitFieldProps extends Omit<ComponentProps<"button">, "type"> {
  idleText: string;
  pendingText: string;
}

export default function SubmitButton({
  idleText,
  pendingText,
}: SubmitFieldProps) {
  const form = useFormContext();
  const [isSubmitting] = useStore(form.store, (state) => [state.isSubmitting]);

  return (
    <Field>
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? pendingText : idleText}
      </Button>
    </Field>
  );
}
