import { createFileRoute } from "@tanstack/react-router";
import { PageBase } from "@/features/console/components/page-base";
import { seo } from "@/libraries/utils/seo";

export const Route = createFileRoute("/console/feature2/page1")({
  head: () => ({
    meta: seo({
      path: "/console/feature2/page1",
      title: "Feature 2 - Page 1",
      description: "View Feature 2 Page 1 in your console workspace.",
    }),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageBase
      subtitle="View Feature 2 Page 1 in your console workspace."
      title="Feature 2 - Page 1"
    >
      <div>Hello "/console/feature2/page1"!</div>
    </PageBase>
  );
}
