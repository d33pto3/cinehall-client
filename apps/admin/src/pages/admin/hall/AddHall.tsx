import AddNewHallForm from "@/components/admin/halls/add-new-hall/AddNewHallForm";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function AddNewHall() {
  useDocumentTitle("Add Hall");
  return (
    <>
      <div className="space-y-5 w-full overflow-y-auto px-3">
        <div className="flex justify-center gap-2">
          <AddNewHallForm />
        </div>
      </div>
    </>
  );
}
