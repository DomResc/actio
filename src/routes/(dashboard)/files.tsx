import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/files")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(dashboard)/files"!</div>;
}
