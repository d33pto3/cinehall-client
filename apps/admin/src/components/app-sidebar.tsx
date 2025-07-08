import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconInnerShadowTop,
  IconListDetails,
  IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { User } from "@/context/AuthContext";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User | null;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const navItems =
    user?.role === "admin"
      ? [
          {
            title: "Dashboard",
            url: "#",
            icon: IconDashboard,
          },
          {
            title: "All Halls",
            url: "/admin/halls",
            icon: IconListDetails,
          },
          {
            title: "Manage Users",
            url: "#",
            icon: IconChartBar,
          },
          {
            title: "Movie Library",
            url: "#",
            icon: IconFolder,
          },
          {
            title: "Showtimes",
            url: "#",
            icon: IconUsers,
          },
        ]
      : [
          {
            title: "Dashboard",
            url: "#",
            icon: IconDashboard,
          },
          {
            title: "My Showtimes",
            url: "#",
            icon: IconListDetails,
          },
          {
            title: "Bookings",
            url: "#",
            icon: IconChartBar,
          },
          {
            title: "My movies",
            url: "#",
            icon: IconFolder,
          },
          {
            title: "Staff",
            url: "#",
            icon: IconUsers,
          },
        ];

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">CineHall</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
