import { GalleryVerticalEnd } from "lucide-react";
import { NavFavorites } from "~/components/nav-favorites";
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
import { navMain, navSecondary } from "~/config/navigation";
import { NavSecondary } from "./nav-secondary";

const data = {
  workspaces: [
    {
      name: "Workspace 1",
      logo: GalleryVerticalEnd,
    },
  ],
  navFavorites: [
    {
      name: "Lorem Ipsum",
      to: "/",
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
};

export function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <WorkspaceSwitcher workspace={data.workspaces} />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavFavorites items={data.navFavorites} />

        {/*  <NavFolders items={data.navFolder} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavSecondary items={navSecondary} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
