import { createFileRoute, redirect } from "@tanstack/react-router";
import { getMfaChallengeServerFn } from "@/app/servers/cookies";
import type { RedirectSearch } from "@/libraries/types/redirect";
import { safeRedirectConsole } from "@/libraries/utils/redirect";

export const Route = createFileRoute("/_auth/two-factor/")({
  validateSearch: (search: Record<string, unknown>): RedirectSearch => ({
    redirect: safeRedirectConsole(
      typeof search.redirect === "string" ? search.redirect : undefined
    ),
  }),
  beforeLoad: async ({ search }) => {
    const mfaToken = await getMfaChallengeServerFn();
    const redirectTo = safeRedirectConsole(search.redirect);

    if (!mfaToken) {
      throw redirect({
        to: "/login",
        search: { redirect: redirectTo },
        replace: true,
        viewTransition: true,
      });
    }

    throw redirect({
      to: "/two-factor/app",
      search: { redirect: redirectTo },
      replace: true,
      viewTransition: true,
    });
  },
});
