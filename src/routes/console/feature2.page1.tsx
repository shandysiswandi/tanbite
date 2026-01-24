import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/console/feature2/page1")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/console/feature2/page1"!</div>;
}
