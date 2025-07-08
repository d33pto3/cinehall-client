"use client";

import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
// import { ListingDialog } from "./ListingDialog";
// import DeleteListingForm from "@/components/more-actions-forms/delete-listing-form";
// import { useTranslations } from "next-intl";

export function DeleteButton({ listingId }: { listingId: string }) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  // const t = useTranslations("ListingsPage");

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
      {/* <ListingDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title={t("DeleteListingTitle")}
        description={t("DeleteListingDescription")}
      >
        <DeleteListingForm listingId={listingId} setIsOpen={setIsDeleteOpen} />
      </ListingDialog> */}
    </>
  );
}
