import * as React from "react";

import {
  Files,
  FolderKanban,
  GalleryVerticalEnd,
  Layers2,
  NotebookText,
  Trash2,
} from "lucide-react";
import { SearchForm } from "~/components/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar";

import { WorkspaceSwitcher } from "~/components/workspace-switcher";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";

// This is sample data.
const data = {
  workspaces: [
    {
      name: "Workspace 1",
      logo: GalleryVerticalEnd,
    },
  ],
  navMain: [
    {
      title: "Notes",
      url: "#",
      icon: NotebookText,
      isActive: true,
    },
    {
      title: "Projects",
      url: "#",
      icon: FolderKanban,
    },
    {
      title: "Files",
      url: "#",
      icon: Files,
    },
    {
      title: "Uncategorized",
      url: "#",
      icon: Layers2,
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
    },
  ],
  navFavorites: [
    {
      title: "Notes",
      url: "#",
      icon: NotebookText,
      isActive: true,
    },
    {
      title: "Projects",
      url: "#",
      icon: FolderKanban,
    },
    {
      title: "Files",
      url: "#",
      icon: Files,
    },
    {
      title: "Uncategorized",
      url: "#",
      icon: Layers2,
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: Trash2,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Trash2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher workspace={data.workspaces} />
        <SearchForm />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavFavorites favorites={data.navFavorites} />
        <NavWorkspaces workspaces={data.navFavorites} /> */}

        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
