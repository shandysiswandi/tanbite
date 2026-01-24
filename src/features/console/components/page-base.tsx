import type { ReactNode } from "react";

interface PageBaseProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function PageBase({ title, subtitle, children }: PageBaseProps) {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-semibold text-2xl tracking-tight">{title}</h1>
        <p className="text-muted-foreground text-sm">{subtitle}</p>
      </div>

      {children}
    </div>
  );
}
