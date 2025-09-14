import HallownerScreensTable from "@/components/hallowner/screens/HallownerScreensTable";

function HallownerScreens() {
  return (
    <div>
      <div className="space-y-5 w-full overflow-y-auto px-3">
        <div className="flex gap-2">
          <HallownerScreensTable
          //  query={query}
          />
        </div>
      </div>
    </div>
  );
}

export default HallownerScreens;
