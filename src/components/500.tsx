import { Link } from "@tanstack/react-router";
import { SoftBackdrop } from "@/components/soft-backdrop";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { m } from "@/libraries/paraglide/messages";
import { QuickLinks } from "./quick-links";

export function ErrorComponent() {
  return (
    <>
      <SoftBackdrop />
      <main className="flex min-h-svh items-center overflow-hidden text-foreground">
        <div className="mx-auto flex min-h-full max-w-9xl flex-col gap-12 px-6 py-16 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <Badge
              className="px-2 text-xs uppercase tracking-widest"
              variant="outline"
            >
              <span className="size-2 rounded-full bg-destructive" />
              {m["error_500.badge"]()}
            </Badge>

            <div className="space-y-4">
              <p className="bg-[linear-gradient(120deg,var(--foreground)_0%,var(--muted-foreground)_100%)] bg-clip-text font-semibold text-4xl text-transparent leading-tight md:text-5xl">
                {m["error_500.title"]()}
              </p>
              <h1 className="font-semibold text-2xl tracking-tight md:text-3xl">
                {m["error_500.subtitle"]()}
              </h1>
              <p className="text-base text-muted-foreground md:text-lg">
                {m["error_500.description"]()}
              </p>
            </div>

            <Button asChild>
              <Link to="/" viewTransition>
                {m["error_500.back_home"]()}
              </Link>
            </Button>
          </div>

          <QuickLinks />
        </div>
      </main>
    </>
  );
}
