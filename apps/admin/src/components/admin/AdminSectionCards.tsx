import { useEffect, useState } from "react";
import { User } from "@/context/AuthContext";
import { ICardData, SectionCards } from "../section-cards";
import { getAdminStats } from "@/services/dashboard";

import { DashboardHeaderSkeleton } from "@/components/admin/DashboardSkeletons";

function AdminSectionCards({ user }: { user: User | null }) {
  const [cardData, setCardData] = useState<ICardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getAdminStats();
        if (res.success) {
          const formattedData: ICardData[] = [
            {
              description: "Total Earnings",
              title: `৳${res.data.totalEarnings.value.toLocaleString()}`,
              trend: res.data.totalEarnings.trend,
              trendDirection: res.data.totalEarnings.trendDirection,
              subtext: "Across all halls this month",
            },
            {
              description: "Total Users",
              title: res.data.newUsers.value.toString(),
              trend: res.data.newUsers.trend,
              trendDirection: res.data.newUsers.trendDirection,
              subtext: "Active users in the system",
            },
            {
              description: "Active Halls",
              title: res.data.activeHalls.value.toString(),
              trend: res.data.activeHalls.trend,
              trendDirection: res.data.activeHalls.trendDirection,
              subtext: "Currently hosting shows",
            },
            {
              description: "Hall Booking Growth",
              title: res.data.bookingGrowth.value,
              trend: res.data.bookingGrowth.trend,
              trendDirection: res.data.bookingGrowth.trendDirection,
              subtext: "Compared to last month",
            },
          ];
          setCardData(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch admin stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <DashboardHeaderSkeleton />;

  return <SectionCards user={user} cardData={cardData} />;
}

export default AdminSectionCards;
