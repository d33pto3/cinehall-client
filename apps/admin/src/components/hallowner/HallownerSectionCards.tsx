import { User } from "@/context/AuthContext";
import { ICardData, SectionCards } from "../section-cards";

export const hallOwnerCardData: ICardData[] = [
  {
    description: "This Month’s Revenue",
    title: "$4,250.00",
    trend: "+12.1%",
    trendDirection: "up",
    subtext: "Total from ticket sales",
  },
  {
    description: "Tickets Sold",
    title: "1,238",
    trend: "-3.2%",
    trendDirection: "down",
    subtext: "Compared to last month",
  },
  {
    description: "Upcoming Shows",
    title: "12",
    trend: "+8.0%",
    trendDirection: "up",
    subtext: "Scheduled for next 7 days",
  },
  {
    description: "Show Occupancy Rate",
    title: "78%",
    trend: "+5.4%",
    trendDirection: "up",
    subtext: "Avg. seats filled",
  },
];

function HallownerSectionCards({ user }: { user: User | null }) {
  return <SectionCards user={user} cardData={hallOwnerCardData} />;
}

export default HallownerSectionCards;
