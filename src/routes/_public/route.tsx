import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SoftBackdrop } from "@/components/soft-backdrop";
import { RootFooter } from "@/features/public/components/root-footer";

export const Route = createFileRoute("/_public")({ component });

function component() {
  return (
    <div className="flex min-h-svh flex-col">
      <SoftBackdrop />
      <main className="flex-1">
        <Outlet />
      </main>
      <RootFooter />
    </div>
  );
}
