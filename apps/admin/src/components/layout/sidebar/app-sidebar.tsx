import {
  LayoutDashboard,
  Users,
  Building2,
  Monitor,
  CalendarDays,
  Ticket,
  Film,
  BarChart3,
} from "lucide-react";
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
            icon: LayoutDashboard,
          },
          {
            title: "Users",
            url: "/admin/users",
            icon: Users,
          },
          {
            title: "Halls",
            url: "/admin/halls",
            icon: Building2,
          },
          {
            title: "Screens",
            url: "/admin/screens",
            icon: Monitor,
          },
          {
            title: "Movies",
            url: "/admin/movies",
            icon: Film,
          },
          {
            title: "Shows",
            url: "/admin/shows",
            icon: CalendarDays,
          },
          {
            title: "Tickets",
            url: "/admin/tickets",
            icon: Ticket,
          },
        ]
      : [
          {
            title: "Dashboard",
            url: "/hallowner",
            icon: LayoutDashboard,
          },
          {
            title: "My Halls",
            url: "/hallowner/halls",
            icon: Building2,
          },
          {
            title: "My Screens",
            url: "/hallowner/screens",
            icon: BarChart3,
          },
          {
            title: "My Shows",
            url: "/hallowner/shows",
            icon: CalendarDays,
          },
          {
            title: "Staff",
            url: "#",
            icon: Users,
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
                <Film className="!size-5" strokeWidth={1} />
                <span className="text-base font-semibold tracking-tighter">
                  CINEHALL
                </span>
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
