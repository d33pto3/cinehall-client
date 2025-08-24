import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HallDialog } from "./HallDialog";
import DeleteHallForm from "./delete-hall-form";
// import { HallDialog } from "./HallDialog";
// import DeleteListingForm from "@/components/more-actions-forms/delete-listing-form";
// import { useTranslations } from "next-intl";

export function DeleteButton({
  hallId,
  onDeleted,
}: {
  hallId: string;
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
      <HallDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        // title={t("DeleteListingTitle")}
        title={"Delete Hall"}
        // description={t("DeleteListingDescription")}
        description="Delete Hall"
      >
        <DeleteHallForm
          hallId={hallId}
          setIsOpen={setIsDeleteOpen}
          onDeleted={onDeleted}
        />
      </HallDialog>
    </>
  );
}
