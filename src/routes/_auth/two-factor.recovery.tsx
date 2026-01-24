import { createFileRoute, redirect } from "@tanstack/react-router";
import { getMfaChallengeServerFn } from "@/app/servers/cookies";
import { TwoFactorForm } from "@/features/auth/components/two-factor-form";
import { safeRedirectConsole } from "@/libraries/utils/redirect";
import { seo } from "@/libraries/utils/seo";

export const Route = createFileRoute("/_auth/two-factor/recovery")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: safeRedirectConsole(
      typeof search.redirect === "string" ? search.redirect : undefined
    ),
  }),
  beforeLoad: async ({ search }) => {
    const mfaToken = await getMfaChallengeServerFn();
    if (!mfaToken) {
      throw redirect({
        to: "/login",
        search: { redirect: safeRedirectConsole(search.redirect) },
        replace: true,
        viewTransition: true,
      });
    }
  },
  head: () => ({
    meta: seo({
      path: "/two-factor/recovery",
      title: "Two-Factor recovery",
      description: "Enter your recovery code to access your account.",
    }),
  }),
  component: () => <TwoFactorForm method="BackupCode" />,
});
