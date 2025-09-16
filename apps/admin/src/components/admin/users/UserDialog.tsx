import * as React from "react";
import { ResponsiveDialog as SharedResponsiveDialog } from "@/components/common/ResponsiveDialogForm";

interface ListingDialogProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description?: string;
}

export function UserDialog({
  children,
  isOpen,
  setIsOpen,
  title,
  description,
}: ListingDialogProps) {
  return (
    <SharedResponsiveDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={title}
      description={description}
    >
      {children}
    </SharedResponsiveDialog>
  );
}
