import { useState } from "react";
import { MdViewList } from "react-icons/md";
import { MovieDialog } from "./MovieDialog";
import ViewMovieForm from "./view-movie-form";
// import ViewListingForm from "@/components/more-actions-forms/view-listing-form";
// import { ListingDialog } from "./ListingDialog";

export function ViewButton({ movieId }: { movieId: string }) {
  const [isViewOpen, setIsViewOpen] = useState(false);

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsViewOpen(true);
        }}
        className="w-full text-left flex items-center gap-2 cursor-pointer"
      >
        <MdViewList />
        <span>View</span>
      </button>
      <MovieDialog
        isOpen={isViewOpen}
        setIsOpen={setIsViewOpen}
        // title={t("ViewListingTitle")}
        title="View & Edit Movie"
        // description={t("ViewListingDescription")}
        description="Click to view the movie description"
      >
        <ViewMovieForm movieId={movieId} setIsOpen={setIsViewOpen} />
      </MovieDialog>
    </>
  );
}
