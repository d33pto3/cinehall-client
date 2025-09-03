import ScreensTable from "@/components/admin/screens/ScreensTable";

function Screens() {
  return (
    <div>
      <div className="space-y-5 w-full overflow-y-auto px-3">
        <div className="flex gap-2">
          <ScreensTable
          //  query={query}
          />
        </div>
      </div>
    </div>
  );
}

export default Screens;
