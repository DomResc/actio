import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "~/components/app-sidebar";
import { NavActions } from "~/components/nav-actions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import {
  SidebarContent,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";

export const Route = createFileRoute("/(dashboard)")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (!context.userSession) {
      throw redirect({ to: "/signin" });
    }
  },
});

function RouteComponent() {
  const { cookieSession } = Route.useRouteContext();

  return (
    <SidebarProvider
      defaultOpen={cookieSession.sidebarState === "true"}
      defaultWidth={cookieSession.sidebarWidth || "24rem"}
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbPage>Page title</BreadcrumbPage>
            </BreadcrumbItem>
          </Breadcrumb>
          <div className="ml-auto px-3">
            <NavActions />
          </div>
        </header>
        <SidebarContent className="p-4">
          <Outlet />
        </SidebarContent>
      </SidebarInset>
    </SidebarProvider>
  );
}
