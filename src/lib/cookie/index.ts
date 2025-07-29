import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

export const getCookieSession = createServerFn({ method: "GET" })
  .validator((data: string) => data)
  .handler((ctx) => {
    return getCookie(ctx.data);
  });
