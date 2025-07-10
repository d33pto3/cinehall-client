import AdminSectionCards from "@/components/admin/AdminSectionCards";
import { useAuth } from "@/context/AuthContext";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import data from "../constants/data.json";

function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="flex flex-1 flex-col">
      <AdminSectionCards user={user} />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </div>
  );
}

export default AdminDashboard;
