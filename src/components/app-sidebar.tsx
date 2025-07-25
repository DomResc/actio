import {
  Files,
  FolderKanban,
  GalleryVerticalEnd,
  Layers2,
  NotebookText,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { SearchForm } from "~/components/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar";

import { WorkspaceSwitcher } from "~/components/workspace-switcher";
import { NavFavorites } from "./nav-favorites";
import { NavFolders } from "./nav-folders";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";

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
      name: "Project Management & Task Tracking",
      url: "#",
      emoji: "📊",
    },
  ],
  navFolder: [
    {
      name: "Personal Life Management",
      emoji: "🏠",
      pages: [
        {
          name: "Daily Journal & Reflection",
          url: "#",
          emoji: "📔",
        },
        {
          name: "Health & Wellness Tracker",
          url: "#",
          emoji: "🍏",
        },
        {
          name: "Personal Growth & Learning Goals",
          url: "#",
          emoji: "🌟",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: SlidersHorizontal,
    },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <WorkspaceSwitcher workspace={data.workspaces} />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavFavorites items={data.navFavorites} />
        <NavFolders items={data.navFolder} />
      </SidebarContent>
      <SidebarFooter>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
