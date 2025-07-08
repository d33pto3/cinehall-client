import { useState } from "react";
import { MdViewList } from "react-icons/md";
// import ViewListingForm from "@/components/more-actions-forms/view-listing-form";
// import { ListingDialog } from "./ListingDialog";

export function ViewButton({ listingId }: { listingId: string }) {
  const [isViewOpen, setIsViewOpen] = useState(false);

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsViewOpen(true);
        }}
        className="w-full text-left flex items-center gap-2"
      >
        <MdViewList />
        <span>View</span>
      </button>
      {/* <ListingDialog
        isOpen={isViewOpen}
        setIsOpen={setIsViewOpen}
        title={t("ViewListingTitle")}
        description={t("ViewListingDescription")}
      >
        <ViewListingForm listingId={listingId} setIsOpen={setIsViewOpen} />
      </ListingDialog> */}
    </>
  );
}
