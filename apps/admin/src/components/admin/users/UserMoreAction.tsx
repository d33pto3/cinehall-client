import MoreAction from "@/components/common/MoreActions";
import { ViewButton } from "../halls/ViewButton";
import { DeleteButton } from "../halls/DeleteHallButton";

export default function UserMoreAction({ userId }: { userId: string }) {
  // Define the actions for the reusable MoreAction component
  const actions = [
    {
      component: <ViewButton listingId={userId} />,
    },
    // {
    //   component: <AddListingImagesButton listingId={listing_id} />,
    //   isSeparatorBefore: true,
    // },
    {
      component: <DeleteButton listingId={userId} />,
      isSeparatorBefore: true,
    },
  ];

  return <MoreAction actions={actions} />;
}
