import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";

export const getCookieSession = createServerFn({ method: "GET" })
  .validator((data: string) => data)
  .handler((ctx) => {
    return getCookie(ctx.data);
  });

export const setCookieSession = createServerFn({
  method: "POST",
})
  .validator((data: { key: string; value: string }) => data)
  .handler(async (ctx) => {
    const { key, value } = ctx.data;
    if (!key || !value) {
      return { success: false, error: "Key and value are required." };
    }

    await setCookie(key, value);

    return { success: true };
  });
