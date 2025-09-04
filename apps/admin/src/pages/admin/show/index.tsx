import ShowsTable from "@/components/admin/shows/ShowsTable";

// import ListingsTable from "./components/ListingsTable";
function Shows() {
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
          <ShowsTable
          //  query={query}
          />
        </div>
      </div>
    </div>
  );
}

export default Shows;
