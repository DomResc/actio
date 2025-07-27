import {
  FolderKanban,
  GalleryVerticalEnd,
  Layers2,
  NotebookText,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { NavMain } from "~/components/nav-main";
import { SearchForm } from "~/components/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar";
import { WorkspaceSwitcher } from "~/components/workspace-switcher";

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
      icon: NotebookText,
    },
    {
      title: "Projects",
      icon: FolderKanban,
    },
    {
      title: "Files",
      icon: Layers2,
    },
    {
      title: "Trash",
      icon: Trash2,
    },
  ],
  navFavorites: [
    {
      name: "Project Management & Task Tracking",
    },
  ],
  navFolder: [
    {
      name: "Personal Life Management",
      pages: [
        {
          name: "Daily Journal & Reflection",
        },
        {
          name: "Health & Wellness Tracker",
        },
        {
          name: "Personal Growth & Learning Goals",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
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

        {/*         <NavFavorites items={data.navFavorites} />
         */}
        {/*  <NavFolders items={data.navFolder} /> */}
      </SidebarContent>
      <SidebarFooter>
        {/*         <NavSecondary items={data.navSecondary} className="mt-auto" />
         */}{" "}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
