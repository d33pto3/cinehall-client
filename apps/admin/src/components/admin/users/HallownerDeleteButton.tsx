import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteUserForm from "./delete-user-form";
import { HallownerDialog } from "./HallownerDialog";
// import DeleteListingForm from "@/components/more-actions-forms/delete-listing-form";
// import { useTranslations } from "next-intl";

export function DeleteButton({
  hallownerId,
  onDeleted,
}: {
  hallownerId: string;
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
      <HallownerDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        // title={t("DeleteListingTitle")}
        title={"Delete Hallowner"}
        // description={t("DeleteListingDescription")}
        description="Delete Hallowner"
      >
        <DeleteUserForm
          userId={hallownerId}
          setIsOpen={setIsDeleteOpen}
          onDeleted={onDeleted}
        />
      </HallownerDialog>
    </>
  );
}
