import { SlidersHorizontal } from "lucide-react";
import * as React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
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
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "~/components/ui/sidebar";
import { Slider } from "~/components/ui/slider";
import { navSettings } from "~/config/navigation";
import { Separator } from "./ui/separator";

export function SettingsDialog() {
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState("Appearance");

  function AppearanceSettings() {
    const [theme, setTheme] = React.useState("System");
    const [sidebarWidth, setSidebarWidth] = React.useState(240);

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
              <Button variant="outline" className="w-40 justify-between">
                {theme}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onSelect={() => setTheme("Light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setTheme("Dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setTheme("System")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Separator />

        {/* Slider Sidebar */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Sidebar Width ({sidebarWidth}px)
          </label>
          <p className="text-muted-foreground mb-2 text-xs">
            Adjust the sidebar width to fit your preferences.
          </p>
          <Slider
            min={180}
            max={768}
            step={1}
            value={[sidebarWidth]}
            onValueChange={([val]) => setSidebarWidth(val)}
            className="w-64"
          />
        </div>
      </div>
    );
  }

  function AccountSettings() {
    return <div>Impostazioni Account</div>;
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
        <Button variant="link">
          <SlidersHorizontal />
          <span>Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your settings here.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex">
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
                            href="#"
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
          <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{page}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
              {renderPage()}
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}
