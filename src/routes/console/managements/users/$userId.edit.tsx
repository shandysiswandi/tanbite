import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/console/managements/users/$userId/edit")(
  {
    component: RouteComponent,
  }
);

function RouteComponent() {
  return <div>Hello "/console/managements/users/$userId/edit"!</div>;
}
