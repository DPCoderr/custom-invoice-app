import type * as React from "react";

import { NavDocuments } from "#/components/sidebar/nav-documents";
import { NavMain } from "#/components/sidebar/nav-main";
import { NavSecondary } from "#/components/sidebar/nav-secondary";
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
  LayoutDashboardIcon,
  FolderIcon,
  UsersIcon,
  CameraIcon,
  FileTextIcon,
  Settings2Icon,
  CircleHelpIcon,
  SearchIcon,
  DatabaseIcon,
  FileChartColumnIcon,
  FileIcon,
  CommandIcon,
} from "lucide-react";
import type { UserDto } from "#/lib/api/user";
import { Link } from "@tanstack/react-router";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Invoices",
      url: "/invoices",
      icon: <FolderIcon />,
    },
    {
      title: "Clients",
      url: null,
      icon: <UsersIcon />,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: <CameraIcon />,
      isActive: true,
      url: null,
      items: [
        {
          title: "Active Proposals",
          url: null,
        },
        {
          title: "Archived",
          url: null,
        },
      ],
    },
    {
      title: "Proposal",
      icon: <FileTextIcon />,
      url: null,
      items: [
        {
          title: "Active Proposals",
          url: null,
        },
        {
          title: "Archived",
          url: null,
        },
      ],
    },
    {
      title: "Prompts",
      icon: <FileTextIcon />,
      url: null,
      items: [
        {
          title: "Active Proposals",
          url: null,
        },
        {
          title: "Archived",
          url: null,
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: null,
      icon: <Settings2Icon />,
    },
    {
      title: "Get Help",
      url: null,
      icon: <CircleHelpIcon />,
    },
    {
      title: "Search",
      url: null,
      icon: <SearchIcon />,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: null,
      icon: <DatabaseIcon />,
    },
    {
      name: "Reports",
      url: null,
      icon: <FileChartColumnIcon />,
    },
    {
      name: "Word Assistant",
      url: null,
      icon: <FileIcon />,
    },
  ],
};
export function AppSidebar({ user, ...props }: React.ComponentProps<typeof Sidebar> & {user: UserDto}) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<Link to="/" aria-label="Home" />}
            >
              <CommandIcon className="size-5!" />
              <span className="text-base font-semibold">Acme Inc.</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
