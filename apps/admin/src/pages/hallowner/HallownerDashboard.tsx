import { lazy, Suspense, useEffect, useState } from "react";
import HallownerSectionCards from "@/components/hallowner/HallownerSectionCards";
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

import {
  getHallOwnerRecentBookings,
  getHallOwnerChartData,
} from "@/services/dashboard";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";

function HallownerDashboard() {
  useDocumentTitle("Dashboard");
  const { user } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getHallOwnerRecentBookings();
        if (res.success) {
          setData(res.data);
        }
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
      <HallownerSectionCards user={user} />

      <Suspense fallback={<ChartSkeleton />}>
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive fetchData={getHallOwnerChartData} />
        </div>
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        {loading ? <TableSkeleton /> : <DataTable data={data} />}
      </Suspense>
    </div>
  );
}

export default HallownerDashboard;
