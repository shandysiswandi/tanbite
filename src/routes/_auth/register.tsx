import { createFileRoute, redirect } from "@tanstack/react-router";
import { getTokensServerFn } from "@/app/servers/cookies";
import { RegisterForm } from "@/features/auth/components/register-form";
import { m } from "@/libraries/paraglide/messages";
import { seo } from "@/libraries/utils/seo";

export const Route = createFileRoute("/_auth/register")({
  beforeLoad: async () => {
    const tokens = await getTokensServerFn();
    if (tokens.accessToken) {
      throw redirect({
        to: "/console",
        replace: true,
      });
    }
  },
  head: () => ({
    meta: seo({
      path: "/register",
      title: m["register.title"](),
      description: m["register.description"](),
    }),
  }),
  component: () => <RegisterForm />,
});
