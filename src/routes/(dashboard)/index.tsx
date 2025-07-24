import { createFileRoute } from "@tanstack/react-router";

import { AppSidebar } from "~/components/app-sidebar";
import { NavActions } from "~/components/nav-actions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";

export const Route = createFileRoute("/(dashboard)/")({
  component: Home,
});

function Home() {
  return (
    <SidebarProvider>
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
        <div className="flex h-full items-center justify-center">
          Page content
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
