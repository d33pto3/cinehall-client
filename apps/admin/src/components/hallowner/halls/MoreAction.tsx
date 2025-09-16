import MoreAction from "@/components/common/MoreActions";
import { Link } from "react-router-dom";
import { ViewButton } from "./ViewButton";

export default function HallMoreAction({ hallId }: { hallId: string }) {
  // Define the actions for the reusable MoreAction component
  const actions = [
    {
      component: <ViewButton hallId={hallId} />,
    },
    {
      component: (
        <Link
          to={`/hallowner/screens/add-screen`}
          className="flex items-center w-full"
          state={{ hallId }}
        >
          Add Screen
        </Link>
      ),
      isSeparatorBefore: true,
    },
  ];

  return <MoreAction actions={actions} />;
}
