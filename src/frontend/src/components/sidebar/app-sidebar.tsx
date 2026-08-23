import type * as React from "react";

import { NavMain } from "#/components/sidebar/nav-main";
import { NavUser } from "#/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  CommandIcon,
  FolderIcon,
  LayoutDashboardIcon,
} from "lucide-react";
import type { UserDto } from "#/lib/api/user";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: UserDto }) {
  const { t } = useTranslation("common");
  const navMain = [
    {
      title: t("navigation.dashboard"),
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: t("navigation.invoices"),
      url: "/invoices",
      icon: <FolderIcon />,
    },
  ];

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<Link to="/" aria-label={t("navigation.home")} />}
            >
              <CommandIcon className="size-5!" />
              <span className="text-base font-semibold">{t("appName")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
