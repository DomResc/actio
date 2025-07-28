import {
  type LucideIcon,
  FolderKanban,
  Layers2,
  NotebookText,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";

export type NavItem = {
  title: string;
  icon: LucideIcon;
  to: string;
};

export const navMain: NavItem[] = [
  { title: "Notes", icon: NotebookText, to: "/notes" },
  { title: "Projects", icon: FolderKanban, to: "/projects" },
  { title: "Files", icon: Layers2, to: "/files" },
  { title: "Trash", icon: Trash2, to: "/trash" },
];

export const navSecondary: NavItem[] = [
  { title: "Settings", icon: SlidersHorizontal, to: "/settings" },
];
