import AddNewShowForm from "@/components/admin/shows/add-new-show/AddNewShowForm";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function AddShow() {
  useDocumentTitle("Add Show");
  return (
    <>
      <div className="space-y-5 w-full overflow-y-auto px-3">
        <div className="flex justify-center gap-2">
          <AddNewShowForm />
        </div>
      </div>
    </>
  );
}
