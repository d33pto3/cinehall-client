import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLocation, useNavigate } from "react-router-dom";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu className="mt-2">
          {items.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <SidebarMenuItem key={item.title} className="mb-1">
                <SidebarMenuButton
                  tooltip={item.title}
                  onClick={() => navigate(item.url)}
                  className={`transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground opacity-100 shadow-sm"
                      : "hover:bg-accent/50 opacity-70 hover:opacity-100"
                  }`}
                >
                  {item.icon && (
                    <item.icon
                      className="size-4"
                      strokeWidth={isActive ? 2 : 1}
                    />
                  )}
                  <span
                    className={`text-xs uppercase tracking-widest font-medium ${
                      isActive ? "opacity-100" : "opacity-80"
                    }`}
                  >
                    {item.title}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
