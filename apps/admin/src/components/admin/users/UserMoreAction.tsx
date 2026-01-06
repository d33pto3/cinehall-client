import MoreAction from "@/components/common/MoreActions";
import { ViewButton } from "../users/UserViewButton";
import { DeleteButton } from "../users/UserDeleteButton";

export default function UserMoreAction({
  userId,
  onDeleted,
}: {
  userId: string;
  onDeleted?: () => void;
}) {
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
      component: <DeleteButton userId={userId} onDeleted={onDeleted} />,
      isSeparatorBefore: true,
    },
  ];

  return <MoreAction actions={actions} />;
}
