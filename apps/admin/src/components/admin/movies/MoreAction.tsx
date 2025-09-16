import MoreAction from "@/components/common/MoreActions";
import { ViewButton } from "./ViewButton";
import { DeleteButton } from "./DeleteMovieButton";

export default function MovieMoreAction({
  movieId,
  onDeleted,
}: {
  movieId: string;
  onDeleted?: () => void;
}) {
  // Define the actions for the reusable MoreAction component
  const actions = [
    {
      component: <ViewButton movieId={movieId} />,
    },
    {
      component: <DeleteButton movieId={movieId} onDeleted={onDeleted} />,
      isSeparatorBefore: true,
    },
  ];

  return <MoreAction actions={actions} />;
}
