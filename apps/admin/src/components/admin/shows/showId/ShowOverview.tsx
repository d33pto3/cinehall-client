import EditShowForm from "./EditShowForm";

export type ShowProps = {
  _id: string;
  hallId?: string;
  movieId: string;
  screenId: string;
  startTime: string;
  endTime: string;
  basePrice: number;
};

export default function ShowOverview({
  showInfo,
}: {
  showInfo: ShowProps | null;
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
          <EditShowForm showInfo={showInfo} />
        </div>
      </div>
    </>
  );
}
