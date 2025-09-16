import HallownerShowsTable from "@/components/hallowner/shows/HallownerShowsTable";

function HallownerShows() {
  return (
    <div>
      <div className="space-y-5 w-full overflow-y-auto px-3">
        <div className="flex gap-2">
          <HallownerShowsTable
          //  query={query}
          />
        </div>
      </div>
    </div>
  );
}

export default HallownerShows;
