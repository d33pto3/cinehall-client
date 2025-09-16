import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ScreenDialog } from "./ScreenDialog";
import DeleteScreenForm from "./delete-screen-form";

export function DeleteButton({
  screenId,
  onDeleted,
}: {
  screenId: string;
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
      <ScreenDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        // title={t("DeleteListingTitle")}
        title={"Delete Hall"}
        // description={t("DeleteListingDescription")}
        description="Delete Hall"
      >
        <DeleteScreenForm
          screenId={screenId}
          setIsOpen={setIsDeleteOpen}
          onDeleted={onDeleted}
        />
      </ScreenDialog>
    </>
  );
}
