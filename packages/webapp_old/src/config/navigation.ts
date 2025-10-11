import {
  type LucideIcon,
  FolderKanban,
  Layers2,
  Lock,
  NotebookText,
  Paintbrush,
  Trash2,
} from "lucide-react";

export type NavItem = {
  title: string;
  icon: LucideIcon;
  to: string;
};

export type NavItemSetting = {
  title: string;
  icon: LucideIcon;
};

export const navMain: NavItem[] = [
  { title: "Notes", icon: NotebookText, to: "/notes" },
  { title: "Projects", icon: FolderKanban, to: "/projects" },
  { title: "Files", icon: Layers2, to: "/files" },
  { title: "Trash", icon: Trash2, to: "/trash" },
];

export const navSettings: NavItemSetting[] = [
  { title: "Appearance", icon: Paintbrush },
  { title: "Account", icon: Lock },
];
