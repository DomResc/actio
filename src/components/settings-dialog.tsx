import { useNavigate } from "@tanstack/react-router";
import { Moon, SlidersHorizontal, Sun, SunMoon } from "lucide-react";
import * as React from "react";

import { useTheme } from "~/components/theme-provider";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Separator } from "~/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { navSettings } from "~/config/navigation";
import { authClient } from "~/lib/auth/authClients";

export function SettingsDialog() {
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState("Appearance");

  function AppearanceSettings() {
    const { setTheme, theme } = useTheme();

    function getThemeDisplay() {
      switch (theme) {
        case "light":
          return (
            <>
              <Sun className="mr-2" />
              Light
            </>
          );
        case "dark":
          return (
            <>
              <Moon className="mr-2" />
              Dark
            </>
          );
        default:
          return (
            <>
              <SunMoon className="mr-2" />
              System
            </>
          );
      }
    }

    return (
      <div className="flex flex-col gap-6">
        {/* Dropdown Theme */}
        <div>
          <label className="mb-2 block text-sm font-medium">Themes</label>
          <p className="text-muted-foreground mb-2 text-xs">
            Choose the interface theme: light, dark, or automatic based on your
            system.
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {getThemeDisplay()}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <SunMoon className="mr-2" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  }

  function AccountSettings() {
    const navigate = useNavigate();

    return (
      <div className="flex flex-col gap-6">
        {/* Dropdown Theme */}
        <div>
          <label className="mb-2 block text-sm font-medium">Sign out</label>
          <p className="text-muted-foreground mb-2 text-xs">
            You can sign out of your account. This will remove your session and
            you will need to log in again.
          </p>
          <Button
            variant="destructive"
            onClick={() => {
              authClient.signOut().then(() => {
                navigate({ to: "/" });
              });
            }}
          >
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  function renderPage() {
    switch (page) {
      case "Appearance":
        return <AppearanceSettings />;
      case "Account":
        return <AccountSettings />;
      default:
        return null;
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarMenuButton>
          <SlidersHorizontal />
          <span>Settings</span>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your settings here.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {navSettings.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={page === item.title}
                        >
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              setPage(item.title);
                            }}
                          >
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbItem>
                  <BreadcrumbPage>{page}</BreadcrumbPage>
                </BreadcrumbItem>
              </Breadcrumb>
            </header>
            <SidebarContent className="p-4">
              <div className="flex flex-col gap-4">{renderPage()}</div>
            </SidebarContent>
          </SidebarInset>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}
