import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";

function isValidCookieKey(key: string): boolean {
  return typeof key === "string" && key.trim() !== "" && !key.includes(" ");
}

export const getCookieSession = createServerFn({ method: "GET" })
  .validator((data: { key: string; refresh?: boolean; expires?: Date }) => data)
  .handler((ctx) => {
    const { key, refresh } = ctx.data;
    let expires = ctx.data.expires;
    const value = getCookie(key);

    if (refresh && value) {
      if (!(expires instanceof Date) || isNaN(expires.getTime())) {
        expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      }
      setCookie(key, value, { expires });
    }
    return value;
  });

export const setCookieSession = createServerFn({
  method: "POST",
})
  .validator((data: { key: string; value: string; expires?: Date }) => data)
  .handler(async (ctx) => {
    const { key, value } = ctx.data;
    let { expires } = ctx.data;
    if (!isValidCookieKey(key) || !value) {
      return {
        success: false,
        error: "Valid key and value are required (no spaces, not empty).",
      };
    }

    if (!(expires instanceof Date) || isNaN(expires.getTime())) {
      expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    }

    setCookie(key, value, { expires });
    return {
      success: true,
      key,
      value,
      expires,
    };
  });
