import { useState } from "react";
import { MdViewList } from "react-icons/md";
import { TicketDialog } from "./TicketDialog";
import ViewTicketForm from "./view-ticket-form";

// import ViewListingForm from "@/components/more-actions-forms/view-listing-form";
// import { ListingDialog } from "./ListingDialog";

export function ViewButton({ ticketId }: { ticketId: string }) {
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
      <TicketDialog
        isOpen={isViewOpen}
        setIsOpen={setIsViewOpen}
        // title={t("ViewListingTitle")}
        title="View & Edit Show"
        // description={t("ViewListingDescription")}
        description="Click to view the show description"
      >
        <ViewTicketForm ticketId={ticketId} setIsOpen={setIsViewOpen} />
      </TicketDialog>
    </>
  );
}
