import {
  IconChartBar,
  IconDashboard,
  IconInnerShadowTop,
  IconListDetails,
  IconUsers,
  IconCrop169,
  IconTheater,
  IconTicket,
} from "@tabler/icons-react";
import { NavMain } from "@/components/layout/sidebar/nav-main";
import { NavUser } from "@/components/layout/sidebar/nav-user";
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
            url: "/admin",
            icon: IconDashboard,
          },
          {
            title: "Users",
            url: "/admin/users",
            icon: IconUsers,
          },
          {
            title: "Halls",
            url: "/admin/halls",
            icon: IconListDetails,
          },
          {
            title: "Screens",
            url: "/admin/screens",
            icon: IconCrop169,
          },
          {
            title: "Movies",
            url: "/admin/movies",
            icon: IconTheater,
          },
          {
            title: "Shows",
            url: "/admin/shows",
            icon: IconCrop169,
          },
          {
            title: "Tickets",
            url: "/admin/tickets",
            icon: IconTicket,
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
            icon: IconTheater,
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
              <a href="/">
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
