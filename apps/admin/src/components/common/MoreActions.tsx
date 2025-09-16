import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { IoMdMore } from "react-icons/io";

interface ActionItem {
  label?: string;
  component?: React.ReactNode;
  onClick?: () => void;
  isSeparatorBefore?: boolean;
  dialogContent?: React.ReactNode;
  dialogTitle?: string;
  dialogDescription?: string;
}

interface MoreActionProps {
  actions: ActionItem[];
}

export default function MoreAction({ actions }: MoreActionProps) {
  const [activeDialog, setActiveDialog] = useState<number | null>(null);

  const handleDialogClose = () => {
    setActiveDialog(null);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <IoMdMore className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px] z-50">
          {actions.map((action, index) => (
            <React.Fragment key={index}>
              {action.isSeparatorBefore && <DropdownMenuSeparator />}
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault(); // Prevent default dropdown menu behavior
                  if (action.onClick) action.onClick();
                  if (action.dialogContent) setActiveDialog(index);
                }}
              >
                {action.component ? action.component : action.label}
              </DropdownMenuItem>
            </React.Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Render dialogs for actions with dialogContent */}
      {actions.map(
        (action, index) =>
          action.dialogContent && (
            <Dialog
              key={index}
              open={activeDialog === index}
              onOpenChange={(open) => {
                if (!open) handleDialogClose();
              }}
            >
              <DialogContent>
                <DialogHeader>
                  {action.dialogTitle && (
                    <DialogTitle>{action.dialogTitle}</DialogTitle>
                  )}
                  {action.dialogDescription && (
                    <DialogDescription>
                      {action.dialogDescription}
                    </DialogDescription>
                  )}
                </DialogHeader>
                {action.dialogContent}
              </DialogContent>
            </Dialog>
          )
      )}
    </>
  );
}
