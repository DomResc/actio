import { Link, useRouterState } from "@tanstack/react-router";
import { type LucideIcon } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

export function NavSecondary({
  items,
}: {
  items: {
    title: string;
    to: string;
    icon: LucideIcon;
  }[];
}) {
  const currentPath = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={currentPath === item.to}>
            <Link to={item.to}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
