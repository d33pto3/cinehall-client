// import { DeleteButton } from "./DeleteScreenButton";
// import { ViewButton } from "./ViewButton";
import MoreAction from "@/components/common/MoreActions";
import { ViewButton } from "./ViewButton";
import { DeleteButton } from "./DeleteButton";

export default function ShowMoreAction({
  showId,
  onDeleted,
}: {
  showId: string;
  onDeleted?: () => void;
}) {
  // Define the actions for the reusable MoreAction component
  const actions = [
    {
      component: <ViewButton showId={showId} />,
    },
    {
      component: <DeleteButton showId={showId} onDeleted={onDeleted} />,
      isSeparatorBefore: true,
    },
  ];

  return <MoreAction actions={actions} />;
}
