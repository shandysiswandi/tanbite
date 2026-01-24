import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function AppNotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-4 py-8 text-center">
      <Badge
        className="px-2 text-xs uppercase tracking-widest"
        variant="secondary"
      >
        Error 404
      </Badge>
      <h3 className="font-semibold text-3xl">Page not found</h3>
      <p className="mb-6 max-w-md text-muted-foreground">
        The page you are looking for is not available. Go back to the dashboard
        or try a different section.
      </p>
      <Button asChild className="rounded-lg text-base">
        <Link to="/console" viewTransition>
          Back to dashboard
        </Link>
      </Button>
    </div>
  );
}
