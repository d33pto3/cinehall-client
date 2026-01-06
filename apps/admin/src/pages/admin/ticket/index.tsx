import TicketsTable from "@/components/admin/tickets/TicketsTable";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";

// import ListingsTable from "./components/ListingsTable";
function Tickets() {
  useDocumentTitle("Tickets");
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
          <TicketsTable
          //  query={query}
          />
        </div>
      </div>
    </div>
  );
}

export default Tickets;
