import MoreAction from "@/components/common/MoreActions";
import { ViewButton } from "./ViewButton";
import { DeleteButton } from "./DeleteScreenButton";

export default function HallMoreAction({
  screenId,
  onDeleted,
}: {
  screenId: string;
  onDeleted?: () => void;
}) {
  // Define the actions for the reusable MoreAction component
  const actions = [
    {
      component: <ViewButton screenId={screenId} />,
    },
    {
      component: <DeleteButton screenId={screenId} onDeleted={onDeleted} />,
      isSeparatorBefore: true,
    },
  ];

  return <MoreAction actions={actions} />;
}
