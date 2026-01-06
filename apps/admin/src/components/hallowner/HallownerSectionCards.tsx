import { useEffect, useState } from "react";
import { User } from "@/context/AuthContext";
import { ICardData, SectionCards } from "../section-cards";
import { getHallOwnerStats } from "@/services/dashboard";
import { DashboardHeaderSkeleton } from "@/components/admin/DashboardSkeletons";

function HallownerSectionCards({ user }: { user: User | null }) {
  const [cardData, setCardData] = useState<ICardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getHallOwnerStats();
        if (res.success) {
          const formattedData: ICardData[] = [
            {
              description: "Total Revenue",
              title: `৳${res.data.revenue.value.toLocaleString()}`,
              trend: res.data.revenue.trend,
              trendDirection: res.data.revenue.trendDirection,
              subtext: "Total from ticket sales",
            },
            {
              description: "Tickets Sold",
              title: res.data.tickets.value.toString(),
              trend: res.data.tickets.trend,
              trendDirection: res.data.tickets.trendDirection,
              subtext: "Total tickets processed",
            },
            {
              description: "Upcoming Shows",
              title: res.data.upcomingShows.value.toString(),
              trend: res.data.upcomingShows.trend,
              trendDirection: res.data.upcomingShows.trendDirection,
              subtext: "Scheduled for next 7 days",
            },
            {
              description: "Show Occupancy",
              title: res.data.occupancy.value,
              trend: res.data.occupancy.trend,
              trendDirection: res.data.occupancy.trendDirection,
              subtext: "Avg. seats filled",
            },
          ];
          setCardData(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch hallowner stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <DashboardHeaderSkeleton />;

  return <SectionCards user={user} cardData={cardData} />;
}

export default HallownerSectionCards;
