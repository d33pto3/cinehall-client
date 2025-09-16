import MoreAction from "@/components/common/MoreActions";
import { ViewButton } from "./ViewButton";
import { DeleteButton } from "./DeleteHallButton";

export default function HallMoreAction({
  hallId,
  onDeleted,
}: {
  hallId: string;
  onDeleted?: () => void;
}) {
  // Define the actions for the reusable MoreAction component
  const actions = [
    {
      component: <ViewButton hallId={hallId} />,
    },
    {
      component: <DeleteButton hallId={hallId} onDeleted={onDeleted} />,
      isSeparatorBefore: true,
    },
  ];

  return <MoreAction actions={actions} />;
}
