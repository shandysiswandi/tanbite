import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/console/feature1/page2")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/console/feature1/page2"!</div>;
}
