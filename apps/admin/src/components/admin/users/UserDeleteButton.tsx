import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { UserDialog } from "./UserDialog";
import DeleteUserForm from "./delete-user-form";
// import { HallDialog } from "./HallDialog";
// import DeleteListingForm from "@/components/more-actions-forms/delete-listing-form";
// import { useTranslations } from "next-intl";

export function DeleteButton({
  userId,
  onDeleted,
}: {
  userId: string;
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
      <UserDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        // title={t("DeleteListingTitle")}
        title={"Delete User"}
        // description={t("DeleteListingDescription")}
        description="Delete User"
      >
        <DeleteUserForm
          userId={userId}
          setIsOpen={setIsDeleteOpen}
          onDeleted={onDeleted}
        />
      </UserDialog>
    </>
  );
}
