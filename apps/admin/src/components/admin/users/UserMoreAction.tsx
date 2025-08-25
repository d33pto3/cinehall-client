import MoreAction from "@/components/common/MoreActions";
import { ViewButton } from "../users/UserViewButton";
import { DeleteButton } from "../users/UserDeleteButton";

export default function UserMoreAction({ userId }: { userId: string }) {
  // Define the actions for the reusable MoreAction component
  const actions = [
    {
      component: <ViewButton userId={userId} />,
    },
    // {
    //   component: <AddListingImagesButton listingId={listing_id} />,
    //   isSeparatorBefore: true,
    // },
    {
      component: <DeleteButton userId={userId} />,
      isSeparatorBefore: true,
    },
  ];

  return <MoreAction actions={actions} />;
}
