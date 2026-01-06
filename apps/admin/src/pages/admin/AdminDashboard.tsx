import { lazy, Suspense, useEffect, useState } from "react";
import AdminSectionCards from "@/components/admin/AdminSectionCards";
import { useAuth } from "@/context/AuthContext";
import {
  ChartSkeleton,
  TableSkeleton,
} from "@/components/admin/DashboardSkeletons";

const ChartAreaInteractive = lazy(() =>
  import("@/components/chart-area-interactive").then((m) => ({
    default: m.ChartAreaInteractive,
  }))
);
const DataTable = lazy(() =>
  import("@/components/data-table").then((m) => ({ default: m.DataTable }))
);

function AdminDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate server-side data fetching
    const fetchData = async () => {
      try {
        const jsonData = await import("@/constants/data.json");
        setData(jsonData.default);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-8">
      <AdminSectionCards user={user} />

      <Suspense fallback={<ChartSkeleton />}>
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive />
        </div>
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        {loading ? <TableSkeleton /> : <DataTable data={data} />}
      </Suspense>
    </div>
  );
}

export default AdminDashboard;
