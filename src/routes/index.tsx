import { createFileRoute, redirect } from "@tanstack/react-router";
import { getUserSession } from "~/lib/auth/functions/getUser";

export const Route = createFileRoute("/")({
  component: Home,
  beforeLoad: async () => {
    const userSession = await getUserSession();

    if (!userSession) {
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
