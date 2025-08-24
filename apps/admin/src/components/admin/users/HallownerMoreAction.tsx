import MoreAction from "@/components/common/MoreActions";
import { ViewButton } from "../halls/ViewButton";
import { DeleteButton } from "../halls/DeleteHallButton";

export default function HallownerMoreAction({
  hallownerId,
}: {
  hallownerId: string;
}) {
  // Define the actions for the reusable MoreAction component
  const actions = [
    {
      component: <ViewButton listingId={hallownerId} />,
    },
    // {
    //   component: <AddListingImagesButton listingId={listing_id} />,
    //   isSeparatorBefore: true,
    // },
    {
      component: <DeleteButton listingId={hallownerId} />,
      isSeparatorBefore: true,
    },
  ];

  return <MoreAction actions={actions} />;
}
