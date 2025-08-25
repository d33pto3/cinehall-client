import { useState } from "react";
import { MdViewList } from "react-icons/md";
import { HallownerDialog } from "./HallownerDialog";
import ViewHallownerForm from "./view-hallowner-form";
// import ViewListingForm from "@/components/more-actions-forms/view-listing-form";
// import { ListingDialog } from "./ListingDialog";

export function ViewButton({ hallownerId }: { hallownerId: string }) {
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
      <HallownerDialog
        isOpen={isViewOpen}
        setIsOpen={setIsViewOpen}
        // title={t("ViewListingTitle")}
        title="View & Edit Hallowner"
        // description={t("ViewListingDescription")}
        description="Click to view the Hallowner description"
      >
        <ViewHallownerForm
          hallownerId={hallownerId}
          setIsOpen={setIsViewOpen}
        />
      </HallownerDialog>
    </>
  );
}
