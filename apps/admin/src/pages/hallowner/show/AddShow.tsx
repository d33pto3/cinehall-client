import HallownerAddShowForm from "@/components/hallowner/shows/add-new-show/AddNewShowForm";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function HallownerAddShow() {
  useDocumentTitle("Add Show");
  return (
    <>
      <div className="space-y-5 w-full overflow-y-auto px-3">
        <div className="flex justify-center gap-2">
          <HallownerAddShowForm />
        </div>
      </div>
    </>
  );
}
