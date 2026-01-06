import AddNewScreenForm from "@/components/admin/screens/add-new-screen/AddNewScreenForm";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function AddScreen() {
  useDocumentTitle("Add Screen");
  return (
    <>
      <div className="space-y-5 w-full overflow-y-auto px-3">
        <div className="flex justify-center gap-2">
          <AddNewScreenForm />
        </div>
      </div>
    </>
  );
}
