import { createFileRoute, redirect } from "@tanstack/react-router";
import { VerifyEmailForm } from "@/features/auth/components/verify-email-form";
import { seo } from "@/libraries/utils/seo";

const TOKEN_LENGTH = 64;
export const Route = createFileRoute("/_auth/verify-email")({
  validateSearch: (search: Record<string, unknown>) => ({
    token: typeof search.token === "string" ? search.token : "",
  }),
  beforeLoad: ({ search }) => {
    if (!search.token || search.token.length !== TOKEN_LENGTH) {
      throw redirect({
        to: "/register",
        replace: true,
      });
    }
  },
  head: () => ({
    meta: seo({
      path: "/verify-email",
      title: "Verification account",
      description: "Verify your account to complete registration.",
    }),
  }),
  component: () => {
    const { token } = Route.useSearch();
    return <VerifyEmailForm token={token} />;
  },
});
