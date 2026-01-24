import type { ComponentProps, ReactNode } from "react";
import { FieldGroup } from "@/components/ui/field";

interface FormLayoutProps extends Omit<ComponentProps<"form">, "noValidate"> {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function FormLayout({
  title,
  subtitle,
  children,
  ...props
}: FormLayoutProps) {
  return (
    <form noValidate {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="font-bold text-2xl">{title}</h1>
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        </div>

        {children}
      </FieldGroup>
    </form>
  );
}
