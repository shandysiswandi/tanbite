import { createFileRoute } from "@tanstack/react-router";
import { PageBase } from "@/features/console/components/page-base";
import { seo } from "@/libraries/utils/seo";

export const Route = createFileRoute("/console/feature2/page2")({
  head: () => ({
    meta: seo({
      path: "/console/feature2/page2",
      title: "Feature 2 - Page 2",
      description: "View Feature 2 Page 2 in your console workspace.",
    }),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageBase
      subtitle="View Feature 2 Page 2 in your console workspace."
      title="Feature 2 - Page 2"
    >
      <div>Hello "/console/feature2/page2"!</div>
    </PageBase>
  );
}
