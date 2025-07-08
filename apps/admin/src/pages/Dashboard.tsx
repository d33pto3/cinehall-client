import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import data from "../constants/data.json";
import { useAuth } from "@/context/AuthContext";
import AdminSectionCards from "@/components/admin/AdminSectionCards";

function Dashboard() {
  const { user } = useAuth();

  return (
    <SidebarProvider
    // style={
    //   {
    //     "--sidebar-width": "calc(var(--spacing) * 72)",
    //     "--header-height": "calc(var(--spacing) * 12)",
    //   } as React.CSSProperties
    // }
    >
      <AppSidebar variant="floating" user={user} />
      <div className="flex flex-1 flex-col">
        {/* <SiteHeader />
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <AdminSectionCards user={user} />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
          </div>
        </div> */}
      </div>
    </SidebarProvider>
  );
}

export default Dashboard;
