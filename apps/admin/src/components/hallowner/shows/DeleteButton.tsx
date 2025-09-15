import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ShowDialog } from "./ShowDialog";
import DeleteShowForm from "@/components/admin/shows/delete-show-form";

export function DeleteButton({
  showId,
  onDeleted,
}: {
  showId: string;
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
      <ShowDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        // title={t("DeleteListingTitle")}
        title={"Delete Screen"}
        // description={t("DeleteListingDescription")}
        description="Delete Screen"
      >
        <DeleteShowForm
          showId={showId}
          setIsOpen={setIsDeleteOpen}
          onDeleted={onDeleted}
        />
      </ShowDialog>
    </>
  );
}
