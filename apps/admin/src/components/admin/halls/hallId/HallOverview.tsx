// import { Activity, Contact, Listing, User } from "@/lib/supabase/types";
import EditHallForm from "./EditHallForm";
// import { useTranslations } from "next-intl";

export type HallProps = {
  _id: string;
  name: string;
  address: string;
  ownerId: string;
  createdAt: string;
};

export default function HallOverview({
  hallInfo,
}: {
  hallInfo: HallProps | null;
}) {
  //   const users: User[] = usersList;
  //   const assigned_user: User = assignedUser;
  //   const assigned_contact: Contact = assignedContact;
  //   const assigned_listing: Listing = assignedListing;
  //   const contactsList: Contact[] = contacts;
  //   const listingsList: Listing[] = listings;

  //   const t = useTranslations("ActivityOverview");

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Hall Overview</h1>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden">
          <EditHallForm hallInfo={hallInfo} />
        </div>
      </div>
    </>
  );
}
