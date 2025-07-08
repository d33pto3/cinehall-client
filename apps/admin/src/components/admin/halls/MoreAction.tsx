import { ViewButton } from "./ViewButton";
import { DeleteButton } from "./DeleteButton";
import MoreAction from "@/components/common/MoreActions";

export default function ListingMoreAction({
  listing_id,
}: {
  listing_id: string;
}) {
  // Define the actions for the reusable MoreAction component
  const actions = [
    {
      component: <ViewButton listingId={listing_id} />,
    },
    // {
    //   component: <AddListingImagesButton listingId={listing_id} />,
    //   isSeparatorBefore: true,
    // },
    {
      component: <DeleteButton listingId={listing_id} />,
      isSeparatorBefore: true,
    },
  ];

  return <MoreAction actions={actions} />;
}
