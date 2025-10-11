/// <reference types="vite/client" />
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as React from "react";

import { DefaultCatchBoundary } from "~/components/default-catch-boundary";
import { NotFound } from "~/components/not-found";
import { ThemeProvider, type Theme } from "~/components/theme-provider";
import { getUserSession } from "~/lib/auth/functions/getUserSession";
import { getCookieSession } from "~/lib/cookie";
import { seo } from "~/lib/seo";
import appCss from "~/styles/app.css?url";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  beforeLoad: async () => {
    const userSession = await getUserSession();
    const sidebarState = await getCookieSession({
      data: {
        key: "actio_sidebar_state",
        refresh: true,
      },
    });
    const sidebarWidth = await getCookieSession({
      data: {
        key: "actio_sidebar_width",
        refresh: true,
      },
    });
    const appTheme = await getCookieSession({
      data: {
        key: "actio_app_theme",
        refresh: true,
      },
    });

    return {
      userSession,
      cookieSession: {
        sidebarState,
        sidebarWidth,
        appTheme,
      },
    };
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "Actio",
        description: `Your processes, your rules.`,
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  // Inline script to apply the theme BEFORE hydration
  const { cookieSession } = Route.useRouteContext();

  // Determine the theme class to apply on the server

  const defaultTheme = (cookieSession?.appTheme as Theme) ?? "system";
  let themeClass = "";

  if (defaultTheme === "dark") {
    themeClass = "dark";
  } else if (defaultTheme === "light") {
    themeClass = "light";
  } else {
    // For "system", apply "dark" as the default during SSR
    // The client script will update if necessary
    themeClass = "dark";
  }

  return (
    <html className={themeClass}>
      <head>
        <HeadContent />
        <script />
      </head>
      <body>
        <ThemeProvider defaultTheme={defaultTheme}>{children}</ThemeProvider>
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
