import { createFileRoute, redirect } from "@tanstack/react-router";
import { authClient } from "~/lib/auth/authClients";

export const Route = createFileRoute("/")({
  component: Home,
  beforeLoad: async ({ context }) => {
    if (!context.userSession) {
      throw redirect({ to: "/signin" });
    }
  },
});

function Home() {
  const { userSession } = Route.useRouteContext();
  const navigate = Route.useNavigate();

  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
      {userSession && (
        <div>
          <p>Logged in as: {userSession.email}</p>
          <button
            onClick={() => {
              console.log("Logging out user");
              authClient.signOut();

              navigate({ to: "/signup" });
            }}
            className="rounded bg-emerald-500 px-2 py-1 text-sm font-black text-white uppercase"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
