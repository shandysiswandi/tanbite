import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/debug-500")({
  beforeLoad: () => {
    if (!import.meta.env.DEV) {
      throw redirect({
        to: "/",
        replace: true,
        viewTransition: true,
      });
    }
  },
  component: () => {
    throw new Error("Debug 500 page");
  },
});
