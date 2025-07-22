import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (!context.userSession) {
      throw redirect({ to: "/signin" });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
