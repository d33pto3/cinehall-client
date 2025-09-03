import { useState } from "react";
import { MdViewList } from "react-icons/md";

import { ScreenDialog } from "./ScreenDialog";
import ViewScreenForm from "./view-screen-form";
// import ViewListingForm from "@/components/more-actions-forms/view-listing-form";
// import { ListingDialog } from "./ListingDialog";

export function ViewButton({ screenId }: { screenId: string }) {
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
      <ScreenDialog
        isOpen={isViewOpen}
        setIsOpen={setIsViewOpen}
        title="View & Edit Screen"
        description="Click to view the Screen description"
      >
        <ViewScreenForm screenId={screenId} setIsOpen={setIsViewOpen} />
      </ScreenDialog>
    </>
  );
}
