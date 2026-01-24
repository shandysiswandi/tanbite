import type { ReactNode } from "react";
import { FieldGroup } from "@/components/ui/field";

interface FormLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function FormLayout({ title, description, children }: FormLayoutProps) {
  return (
    <div className="flex flex-col gap-6">
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="font-bold text-2xl">{title}</h1>
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
        </div>
        {children}
      </FieldGroup>
    </div>
  );
}
