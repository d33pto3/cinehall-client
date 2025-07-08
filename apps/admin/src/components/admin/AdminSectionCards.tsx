import { User } from "@/context/AuthContext";
import { ICardData, SectionCards } from "../section-cards";

const adminCardData: ICardData[] = [
  {
    description: "Total Earnings",
    title: "$1,250.00",
    trend: "+15.2%",
    trendDirection: "up",
    subtext: "Across all halls this month",
  },
  {
    description: "New Users Registered",
    title: "842",
    trend: "+9.8%",
    trendDirection: "down",
    subtext: "In the last 30 days",
  },
  {
    description: "Active Halls",
    title: "56",
    trend: "+4.1%",
    trendDirection: "up",
    subtext: "Currently hosting shows",
  },
  {
    description: "Hall Booking Growth",
    title: "6.3%",
    trend: "+2.4%",
    trendDirection: "up",
    subtext: "Compared to last month",
  },
];

function AdminSectionCards({ user }: { user: User | null }) {
  return <SectionCards user={user} cardData={adminCardData} />;
}

export default AdminSectionCards;
