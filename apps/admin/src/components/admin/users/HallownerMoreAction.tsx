import MoreAction from "@/components/common/MoreActions";
import { ViewButton } from "./HallownerViewButton";
import { DeleteButton } from "./HallownerDeleteButton";

export default function HallownerMoreAction({
  hallownerId,
  onDeleted,
}: {
  hallownerId: string;
  onDeleted?: () => void;
}) {
  // Define the actions for the reusable MoreAction component
  const actions = [
    {
      component: <ViewButton hallownerId={hallownerId} />,
    },
    {
      component: (
        <DeleteButton hallownerId={hallownerId} onDeleted={onDeleted} />
      ),
      isSeparatorBefore: true,
    },
  ];

  return <MoreAction actions={actions} />;
}
