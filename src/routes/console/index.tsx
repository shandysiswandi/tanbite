import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/features/console/components/dashboard";
import { seo } from "@/libraries/utils/seo";

export const Route = createFileRoute("/console/")({
  head: () => ({
    meta: seo({
      path: "/console/",
      title: "Dashboard Console",
      description:
        "Please sign in and pick up right where your journey paused.",
    }),
  }),
  component: () => <Dashboard />,
});
