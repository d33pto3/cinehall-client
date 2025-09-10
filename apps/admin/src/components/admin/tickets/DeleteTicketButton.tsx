import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TicketDialog } from "./TicketDialog";
import DeleteTicketForm from "./delete-ticket-form";

export function DeleteButton({
  ticketId,
  onDeleted,
}: {
  ticketId: string;
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
      <TicketDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        // title={t("DeleteListingTitle")}
        title={"Delete Hall"}
        // description={t("DeleteListingDescription")}
        description="Delete Hall"
      >
        <DeleteTicketForm
          ticketId={ticketId}
          setIsOpen={setIsDeleteOpen}
          onDeleted={onDeleted}
        />
      </TicketDialog>
    </>
  );
}
