import AddNewHallForm from "@/components/admin/halls/add-new-hall/AddNewHallForm";

export default function AddNewHall() {
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
