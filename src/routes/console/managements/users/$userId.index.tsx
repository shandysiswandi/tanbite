import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/console/managements/users/$userId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/console/managements/users/$userId"!</div>;
}
