import { createFileRoute, redirect } from "@tanstack/react-router";
import { getTokensServerFn } from "@/app/servers/cookies";
import { LoginForm } from "@/features/auth/components/login-form";
import { m } from "@/libraries/paraglide/messages";
import { safeRedirectConsole } from "@/libraries/utils/redirect";
import { seo } from "@/libraries/utils/seo";

export const Route = createFileRoute("/_auth/login")({
  beforeLoad: async ({ search }) => {
    const tokens = await getTokensServerFn();
    if (tokens.accessToken) {
      const r = search as Record<string, unknown>;
      throw redirect({
        to: safeRedirectConsole(r.redirect),
        replace: true,
      });
    }
  },
  head: () => {
    return {
      meta: seo({
        path: "/login",
        title: m["login.title"](),
        description: m["login.description"](),
      }),
    };
  },
  component: () => <LoginForm />,
});
