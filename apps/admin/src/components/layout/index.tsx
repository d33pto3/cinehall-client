import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./sidebar/app-sidebar";
import { useAuth } from "@/context/AuthContext";
import { SiteHeader } from "./site-header";

function Layout() {
  const { user } = useAuth();
  return (
    <div className="flex min-h-screen w-full">
      <SidebarProvider
      // style={
      //   {
      //     "--sidebar-width": "calc(var(--spacing) * 72)",
      //     "--header-height": "calc(var(--spacing) * 12)",
      //   } as React.CSSProperties
      // }
      >
        <AppSidebar variant="floating" user={user} />
        <main className="flex-1 p-6 bg-muted/40 overflow-auto">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <SiteHeader />
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <Outlet />
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}

export default Layout;
