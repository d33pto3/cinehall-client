import { useState } from "react";
import { MdViewList } from "react-icons/md";
import { ShowDialog } from "./ShowDialog";
import ViewShowForm from "./view-show-form";

// import ViewListingForm from "@/components/more-actions-forms/view-listing-form";
// import { ListingDialog } from "./ListingDialog";

export function ViewButton({ showId }: { showId: string }) {
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
      <ShowDialog
        isOpen={isViewOpen}
        setIsOpen={setIsViewOpen}
        // title={t("ViewListingTitle")}
        title="View & Edit Show"
        // description={t("ViewListingDescription")}
        description="Click to view the show description"
      >
        <ViewShowForm showId={showId} setIsOpen={setIsViewOpen} />
      </ShowDialog>
    </>
  );
}
