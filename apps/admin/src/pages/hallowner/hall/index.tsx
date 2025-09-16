import HallsTable from "@/components/hallowner/halls/HallsTable";

// import ListingsTable from "./components/ListingsTable";
function HallownerHalls() {
  //   {
  //   searchParams,
  // }: {
  //   searchParams?: {
  //     query?: string;
  //     page?: string;
  //   };
  // }
  // const query = searchParams?.query || "";

  return (
    <div>
      <div className="space-y-5 w-full overflow-y-auto px-3">
        <div className="flex gap-2">
          <HallsTable
          //  query={query}
          />
        </div>
      </div>
    </div>
  );
}

export default HallownerHalls;
