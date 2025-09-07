import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MovieDialog } from "./MovieDialog";
import DeleteMovieForm from "./delete-movie-form";
// import DeleteListingForm from "@/components/more-actions-forms/delete-listing-form";
// import { useTranslations } from "next-intl";

export function DeleteButton({
  movieId,
  onDeleted,
}: {
  movieId: string;
  onDeleted?: () => void;
}) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  // const t = useTranslations("ListingsPage");

  return (
    <>
      <button
        onClick={() => {
          setIsDeleteOpen(true);
        }}
        className="w-full text-left flex items-center gap-2 text-red-500 cursor-pointer"
      >
        <RiDeleteBin6Line />
        <span>Delete</span>
      </button>
      <MovieDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        // title={t("DeleteListingTitle")}
        title={"Delete Movie"}
        // description={t("DeleteListingDescription")}
        description="Delete Movie"
      >
        <DeleteMovieForm
          movieId={movieId}
          setIsOpen={setIsDeleteOpen}
          onDeleted={onDeleted}
        />
      </MovieDialog>
    </>
  );
}
