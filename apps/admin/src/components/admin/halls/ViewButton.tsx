import { useState } from "react";
import { MdViewList } from "react-icons/md";
import { HallDialog } from "./HallDialog";
import ViewHallForm from "./view-hall-form";
// import ViewListingForm from "@/components/more-actions-forms/view-listing-form";
// import { ListingDialog } from "./ListingDialog";

export function ViewButton({ hallId }: { hallId: string }) {
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
      <HallDialog
        isOpen={isViewOpen}
        setIsOpen={setIsViewOpen}
        // title={t("ViewListingTitle")}
        title="View & Edit Hall"
        // description={t("ViewListingDescription")}
        description="Click to view the hall description"
      >
        <ViewHallForm hallId={hallId} setIsOpen={setIsViewOpen} />
      </HallDialog>
    </>
  );
}
