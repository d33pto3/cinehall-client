import HallownerAddShowForm from "@/components/hallowner/shows/add-new-show/AddNewShowForm";

export default function HallownerAddShow() {
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
