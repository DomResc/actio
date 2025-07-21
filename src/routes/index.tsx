import { createFileRoute, redirect } from "@tanstack/react-router";
import { authClient } from "~/lib/auth/auth-clients";

export const Route = createFileRoute("/")({
  component: Home,
  beforeLoad: async () => {
    const userSession = await authClient.getSession();

    if (!userSession.data) {
      throw redirect({ to: "/signin" });
    }
  },
});

function Home() {
  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
    </div>
  );
}
