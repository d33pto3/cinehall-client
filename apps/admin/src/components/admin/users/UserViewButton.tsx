import { useState } from "react";
import { MdViewList } from "react-icons/md";
import { UserDialog } from "./UserDialog";
import ViewUserForm from "./view-user-form";
// import ViewListingForm from "@/components/more-actions-forms/view-listing-form";
// import { ListingDialog } from "./ListingDialog";

export function ViewButton({ userId }: { userId: string }) {
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
      <UserDialog
        isOpen={isViewOpen}
        setIsOpen={setIsViewOpen}
        // title={t("ViewListingTitle")}
        title="View & Edit User"
        // description={t("ViewListingDescription")}
        description="Click to view the user description"
      >
        <ViewUserForm userId={userId} setIsOpen={setIsViewOpen} />
      </UserDialog>
    </>
  );
}
