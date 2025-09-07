import AddNewScreenForm from "@/components/admin/screens/add-new-screen/AddNewScreenForm";

export default function AddScreen() {
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
