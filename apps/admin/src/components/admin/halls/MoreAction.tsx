import { ViewButton } from "./ViewButton";
import { DeleteButton } from "./DeleteButton";
import MoreAction from "@/components/common/MoreActions";

export default function HallMoreAction({ hallId }: { hallId: string }) {
  // Define the actions for the reusable MoreAction component
  const actions = [
    {
      component: <ViewButton listingId={hallId} />,
    },
    // {
    //   component: <AddListingImagesButton listingId={listing_id} />,
    //   isSeparatorBefore: true,
    // },
    {
      component: <DeleteButton listingId={hallId} />,
      isSeparatorBefore: true,
    },
  ];

  return <MoreAction actions={actions} />;
}
