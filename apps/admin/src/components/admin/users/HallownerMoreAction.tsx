import MoreAction from "@/components/common/MoreActions";
import { ViewButton } from "./HallownerViewButton";
import { DeleteButton } from "./HallownerDeleteButton";

export default function HallownerMoreAction({
  hallownerId,
}: {
  hallownerId: string;
}) {
  // Define the actions for the reusable MoreAction component
  const actions = [
    {
      component: <ViewButton hallownerId={hallownerId} />,
    },
    {
      component: <DeleteButton hallownerId={hallownerId} />,
      isSeparatorBefore: true,
    },
  ];

  return <MoreAction actions={actions} />;
}
