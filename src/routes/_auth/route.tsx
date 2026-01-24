import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { APP } from "@/libraries/constants/app";

export const Route = createFileRoute("/_auth")({
  loader: () => ({
    currentYear: new Date().getFullYear(),
  }),
  component: AuthLayout,
});

function AuthLayout() {
  const { currentYear } = Route.useLoaderData();

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-10 md:gap-4">
        <div className="flex justify-center gap-2 border-b p-4 md:p-6">
          <Link
            className="flex items-center gap-2 font-medium"
            to="/"
            viewTransition
          >
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <img alt="logo" height="32" src="/favicon-32x32.png" width="32" />
            </div>
            {APP.siteName}
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <main className="w-full max-w-sm px-4 will-change-[transform,opacity] [view-transition-name:auth-content] md:px-0">
            <Outlet />
          </main>
        </div>

        <p className="p-4 text-center text-muted-foreground text-sm md:p-6">
          © {currentYear} TanBite. All rights reserved.
        </p>
      </div>

      <div className="relative hidden bg-muted lg:block">
        <img
          alt="Background darkest medium"
          className="absolute inset-0 h-full w-full object-cover"
          height="930"
          src="/bg-darkest-medium.webp"
          width="1011"
        />
      </div>
    </div>
  );
}
