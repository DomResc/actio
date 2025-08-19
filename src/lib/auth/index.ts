import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { reactStartCookies } from "better-auth/react-start";
import "dotenv/config";

import { db } from "~/lib/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
  plugins: [reactStartCookies()],
  emailAndPassword: {
    enabled: true,
  },
  telemetry: { enabled: false },
});
