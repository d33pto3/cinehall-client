import axios from "@/lib/axios";

import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HallDialog } from "./HallDialog";
// import DeleteListingForm from "@/components/more-actions-forms/delete-listing-form";
// import { useTranslations } from "next-intl";

export function DeleteButton({ listingId }: { listingId: string }) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  // const t = useTranslations("ListingsPage");

  const deleteHall = async () => {};

  return (
    <>
      <button
        onClick={() => {
          setIsDeleteOpen(true);
        }}
        className="w-full text-left flex items-center gap-2 text-red-500"
      >
        <RiDeleteBin6Line />
        <span>Delete</span>
      </button>
      <HallDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        // title={t("DeleteListingTitle")}
        // description={t("DeleteListingDescription")}
      >
        {/* <DeleteHallForm listingId={listingId} setIsOpen={setIsDeleteOpen} /> */}
      </HallDialog>
    </>
  );
}
