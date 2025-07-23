import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/")({
  component: Home,
});

function Home() {
  return <div>Hello</div>;
}
