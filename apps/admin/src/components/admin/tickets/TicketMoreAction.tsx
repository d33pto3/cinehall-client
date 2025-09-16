import MoreAction from "@/components/common/MoreActions";
import { ViewButton } from "./ViewButton";
import { DeleteButton } from "./DeleteTicketButton";

export default function TicketMoreAction({
  ticketId,
  onDeleted,
}: {
  ticketId: string;
  onDeleted?: () => void;
}) {
  // Define the actions for the reusable MoreAction component
  const actions = [
    {
      component: <ViewButton ticketId={ticketId} />,
    },
    {
      component: <DeleteButton ticketId={ticketId} onDeleted={onDeleted} />,
      isSeparatorBefore: true,
    },
  ];

  return <MoreAction actions={actions} />;
}
