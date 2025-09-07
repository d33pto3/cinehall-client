import { DeleteButton } from "./DeleteScreenButton";
import { ViewButton } from "./ViewButton";
import MoreAction from "@/components/common/MoreActions";

export default function ScreenMoreAction({
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
