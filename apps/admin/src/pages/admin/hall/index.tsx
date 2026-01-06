import HallsTable from "@/components/admin/halls/HallsTable";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";

// import ListingsTable from "./components/ListingsTable";
function Halls() {
  useDocumentTitle("Halls");
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

export default Halls;
